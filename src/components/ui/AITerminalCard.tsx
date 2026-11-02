'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, RotateCcw, Copy, Check, Sparkles, CornerDownLeft } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profileData';

interface MessageLine {
  id: string;
  type: 'cmd' | 'output' | 'system' | 'json';
  text: string;
}

export function AITerminalCard() {
  const [history, setHistory] = useState<MessageLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Neural Antigravity Core [v2.6.4] connected to Tashkent Cluster-01.',
    },
    {
      id: 'init-2',
      type: 'cmd',
      text: 'akbarjon@neural-cluster:~# whoami',
    },
    {
      id: 'init-3',
      type: 'output',
      text: '[IDENTITY]: Akbarjon Egamberdiyev — Senior AI Engineer & Autonomous Systems Architect.',
    },
    {
      id: 'init-4',
      type: 'output',
      text: '[STATUS]  : Available for Enterprise AI Advisory & Venture Engineering.',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [activeCommand, setActiveCommand] = useState<string>('whoami');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isStreaming]);

  // Execute terminal command with streaming lines
  const executeCommand = async (cmdPrompt: string) => {
    if (isStreaming) return;

    setActiveCommand(cmdPrompt);
    setIsStreaming(true);

    const cmdId = Date.now().toString();
    setHistory((prev) => [
      ...prev,
      { id: `${cmdId}-cmd`, type: 'cmd', text: `akbarjon@neural-cluster:~# ${cmdPrompt}` },
    ]);

    const targetCmd = PROFILE_DATA.terminal.commands.find(
      (c) => c.command.toLowerCase() === cmdPrompt.trim().toLowerCase()
    );

    let outputLines: { text: string; type: 'output' | 'system' | 'json' }[] = [];

    if (targetCmd) {
      outputLines = targetCmd.output.map((line) => ({
        text: line,
        type: targetCmd.command === 'cat stack.json' ? 'json' : 'output',
      }));
    } else if (cmdPrompt.trim() === 'clear') {
      setHistory([
        {
          id: 'cleared',
          type: 'system',
          text: 'Terminal session cleared. Ready for next query.',
        },
      ]);
      setIsStreaming(false);
      return;
    } else if (cmdPrompt.trim() === 'help') {
      outputLines = [
        { text: 'Available commands:', type: 'system' },
        { text: '  - whoami              : Bio, role & core focus', type: 'output' },
        { text: '  - nvidia-smi --cluster: Real-time H100 GPU telemetry', type: 'output' },
        { text: '  - cat stack.json      : Core AI ML architecture matrix', type: 'output' },
        { text: '  - clear               : Clear output window', type: 'output' },
      ];
    } else {
      outputLines = [
        { text: `zsh: command not found: ${cmdPrompt}`, type: 'system' },
        { text: 'Try clicking: whoami, nvidia-smi --cluster, or cat stack.json', type: 'system' },
      ];
    }

    // Stream lines sequentially for realistic terminal output
    for (const lineObj of outputLines) {
      await new Promise((resolve) => setTimeout(resolve, 90));
      setHistory((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, type: lineObj.type, text: lineObj.text },
      ]);
    }

    setIsStreaming(false);
  };

  const handleClear = () => {
    setHistory([
      {
        id: 'reset',
        type: 'system',
        text: 'Session cleared. Select a query below to inspect telemetry.',
      },
    ]);
  };

  const handleCopyHistory = async () => {
    const rawText = history.map((h) => h.text).join('\n');
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isStreaming) return;
    const prompt = inputVal.trim();
    setInputVal('');
    executeCommand(prompt);
  };

  return (
    <div className="flex flex-col h-full justify-between select-none">
      {/* Terminal Title Bar */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            {/* Minimalist macOS/Raycast dots */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 hover:bg-red-500/70 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 hover:bg-amber-500/70 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/80 hover:bg-emerald-500/70 transition-colors" />
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px] font-mono text-zinc-300 font-medium">
                akbarjon@neural-cluster:~
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopyHistory}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition-colors"
              title="Copy terminal buffer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleClear}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] transition-colors"
              title="Clear terminal"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Terminal Output Window */}
        <div className="h-44 sm:h-48 overflow-y-auto space-y-1 font-mono text-[11px] text-zinc-300 pr-1 select-text scrollbar-thin scrollbar-thumb-zinc-800">
          {history.map((item) => (
            <div key={item.id} className="leading-relaxed break-words">
              {item.type === 'cmd' ? (
                <span className="text-indigo-400 font-semibold">{item.text}</span>
              ) : item.type === 'system' ? (
                <span className="text-zinc-500 italic">{item.text}</span>
              ) : item.type === 'json' ? (
                <span className="text-emerald-300 font-mono">{item.text}</span>
              ) : (
                <span className="text-zinc-200">{item.text}</span>
              )}
            </div>
          ))}

          {/* Streaming token cursor */}
          {isStreaming && (
            <div className="flex items-center gap-1.5 text-indigo-400">
              <span className="inline-block w-1.5 h-3.5 bg-indigo-400 animate-pulse" />
              <span className="text-[10px] text-indigo-300/70 font-mono">executing telemetry query...</span>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* 3 Clickable Command Pills (Required by Spec) & Manual Command Input */}
      <div className="mt-3 pt-3 border-t border-white/[0.08]">
        {/* The 3 Clickable Command Pills */}
        <div className="grid grid-cols-3 gap-1.5 mb-2.5">
          {PROFILE_DATA.terminal.commands.map((cmd) => (
            <button
              key={cmd.command}
              type="button"
              disabled={isStreaming}
              onClick={() => executeCommand(cmd.command)}
              className={`px-2 py-1.5 rounded-lg border text-[10px] font-mono text-center transition-all truncate active:scale-95 flex items-center justify-center gap-1 ${
                activeCommand === cmd.command
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                  : 'bg-zinc-900/60 hover:bg-zinc-800/80 border-white/[0.08] hover:border-white/20 text-zinc-400 hover:text-zinc-200'
              } disabled:opacity-40 disabled:pointer-events-none`}
              title={`Execute ${cmd.command}`}
            >
              <span className="text-indigo-400 font-bold">$</span>
              <span className="truncate">{cmd.command}</span>
            </button>
          ))}
        </div>

        {/* Input Bar with Enter prompt */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <span className="absolute left-2.5 text-indigo-400 font-mono text-xs select-none">
            $
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isStreaming}
            placeholder="Type whoami, nvidia-smi --cluster, or cat stack.json..."
            className="w-full pl-6 pr-8 py-1.5 rounded-lg bg-black/60 border border-white/[0.08] focus:border-indigo-500/50 text-[11px] font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isStreaming || !inputVal.trim()}
            className="absolute right-1.5 p-1 rounded-md text-zinc-400 hover:text-indigo-300 hover:bg-white/[0.08] transition-colors disabled:opacity-30"
            title="Execute"
          >
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
