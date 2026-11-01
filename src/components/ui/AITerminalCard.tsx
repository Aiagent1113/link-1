'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Play, RotateCcw, Sparkles } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profileData';

interface MessageLine {
  id: string;
  type: 'cmd' | 'output' | 'system';
  text: string;
}

export function AITerminalCard() {
  const [history, setHistory] = useState<MessageLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Neural Antigravity Core [v2.6.4-prod] online.',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Connected to GPU cluster @ Tashkent-01. Click a query below to execute.',
    },
    {
      id: 'init-3',
      type: 'cmd',
      text: 'akbarjon@neural-core:~# whoami',
    },
    {
      id: 'init-4',
      type: 'output',
      text: 'Akbarjon Egamberdiyev — Senior AI Engineer & Autonomous Systems Architect.',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history, isStreaming]);

  // Simulate token streaming effect
  const executeCommand = async (cmdPrompt: string) => {
    if (isStreaming) return;

    // Add command to history
    const cmdId = Date.now().toString();
    setHistory((prev) => [
      ...prev,
      { id: `${cmdId}-cmd`, type: 'cmd', text: `akbarjon@neural-core:~# ${cmdPrompt}` },
    ]);

    setIsStreaming(true);

    const found = PROFILE_DATA.terminal.commands.find(
      (c) => c.command.toLowerCase() === cmdPrompt.toLowerCase()
    );

    const outputLines = found
      ? found.output
      : [
          `Command not recognized: "${cmdPrompt}"`,
          'Available prompts: "Who is Akbarjon?", "Tech Stack", "Latest AI Models", "System Telemetry"',
        ];

    // Stream lines sequentially with typewriter effect
    for (const line of outputLines) {
      await new Promise((resolve) => setTimeout(resolve, 140));
      setHistory((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, type: 'output', text: line },
      ]);
    }

    setIsStreaming(false);
  };

  const handleClear = () => {
    setHistory([
      {
        id: 'reset',
        type: 'system',
        text: 'Terminal session cleared. System ready for inference.',
      },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isStreaming) return;
    const prompt = inputVal.trim();
    setInputVal('');
    executeCommand(prompt);
  };

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Terminal Title Bar */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            {/* Custom glowing terminal window controls */}
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#E2B86B]/80 shadow-[0_0_8px_rgba(226,184,107,0.5)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00F5D4]/80 shadow-[0_0_8px_rgba(0,245,212,0.5)]" />
            </div>
            <div className="flex items-center gap-1.5 ml-2">
              <Terminal className="w-3.5 h-3.5 text-[#00F5D4]" />
              <span className="text-[11px] font-mono font-medium text-white/80">
                neural-terminal: telemetry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00F5D4]/10 text-[10px] font-mono text-[#00F5D4] border border-[#00F5D4]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse" />
              142 tok/s
            </span>
            <button
              onClick={handleClear}
              className="p-1 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors"
              title="Clear terminal"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Live Terminal Output Window */}
        <div className="h-44 sm:h-48 overflow-y-auto space-y-1.5 font-mono text-[11px] text-white/80 pr-1 select-text scrollbar-thin scrollbar-thumb-white/10">
          {history.map((item) => (
            <div key={item.id} className="leading-relaxed break-words">
              {item.type === 'cmd' ? (
                <span className="text-[#00F5D4] font-medium">{item.text}</span>
              ) : item.type === 'system' ? (
                <span className="text-white/40 italic">{item.text}</span>
              ) : (
                <span className="text-white/90">{item.text}</span>
              )}
            </div>
          ))}

          {/* Streaming token cursor */}
          {isStreaming && (
            <div className="flex items-center gap-1 text-[#00F5D4]">
              <span className="inline-block w-2 h-3.5 bg-[#00F5D4] animate-pulse" />
              <span className="text-[10px] text-[#00F5D4]/70">streaming inference tokens...</span>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Quick Prompt Pills & Interactive Input */}
      <div className="mt-3 pt-3 border-t border-white/[0.08]">
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {PROFILE_DATA.terminal.commands.map((cmd) => (
            <button
              key={cmd.command}
              disabled={isStreaming}
              onClick={() => executeCommand(cmd.command)}
              className="px-2 py-1 rounded-lg bg-white/[0.03] hover:bg-[#00F5D4]/15 border border-white/[0.08] hover:border-[#00F5D4]/40 text-[10px] font-mono text-white/70 hover:text-[#00F5D4] transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1 active:scale-95"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#00F5D4]" />
              {cmd.command}
            </button>
          ))}
        </div>

        {/* Terminal Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <span className="absolute left-2.5 text-[#00F5D4] font-mono text-xs select-none">
            &gt;
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isStreaming}
            placeholder="Type query or click quick pills above..."
            className="w-full pl-6 pr-8 py-1.5 rounded-lg bg-black/40 border border-white/10 text-[11px] font-mono text-white placeholder:text-white/30 focus:outline-none focus:border-[#00F5D4]/50 transition-colors"
          />
          <button
            type="submit"
            disabled={isStreaming || !inputVal.trim()}
            className="absolute right-1.5 p-1 rounded-md text-[#00F5D4] hover:bg-white/10 transition-colors disabled:opacity-30"
          >
            <Play className="w-3 h-3 fill-current" />
          </button>
        </form>
      </div>
    </div>
  );
}
