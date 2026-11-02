export interface ProjectMetric {
  label: string;
  value: string;
  trend: string;
}

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
  accentColor: string;
  description: string;
  stats?: string;
}

export interface TerminalCommand {
  command: string;
  label: string;
  output: string[];
}

export interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  langColor: string;
  url: string;
  tag: string;
}

export const PROFILE_DATA = {
  name: "Akbarjon Egamberdiyev",
  title: "Senior AI Engineer & Autonomous Systems Architect",
  tagline: "Architecting next-generation LLM agents, neural pipelines, and high-compute spatial intelligence.",
  location: "Tashkent, Uzbekistan (Global Remote)",
  status: {
    active: true,
    text: "Available for Enterprise AI & High-Impact Ventures",
    badge: "Neural Core Active",
  },
  contact: {
    email: "akbarjon.ai@gmail.com",
    telegram: "https://t.me/egamberdiyev_ai",
    instagram: "https://instagram.com/egamberdiyev_ai",
    phone: "+998 90 000 00 00",
    phoneUrl: "tel:+998900000000",
    github: "https://github.com/Aiagent1113",
    githubRepos: "https://github.com/Aiagent1113?tab=repositories",
    linkedin: "https://linkedin.com/in/akbarjon-egamberdiyev",
    twitter: "https://x.com/akbarjon_ai",
    huggingface: "https://huggingface.co/Akbarjon",
    calendar: "https://t.me/egamberdiyev_ai", // Direct consultation telegram CTA
  },
  flagship: {
    badge: "PRODUCTION v2.6",
    title: "Autonomous Multi-Agent AI Framework & LLM Orchestrator",
    subtitle: "High-Throughput Distributed Reasoning Engine",
    description: "Enterprise-grade distributed neural runtime featuring deterministic DAG execution, sub-40ms speculative token decoding, and sovereign agent memory synchronization.",
    tags: ["PyTorch", "LangGraph", "CUDA", "Next.js", "Vector DB", "vLLM", "Triton"],
    metrics: [
      { label: "Uptime SLA", value: "99.98%", trend: "ONLINE" },
      { label: "Inference Speed", value: "142 tok/s", trend: "FP8 vLLM" },
      { label: "Fine-Tuned Models", value: "14+", trend: "Cluster" },
      { label: "Cluster Latency", value: "32ms", trend: "p99 Bound" },
    ],
    liveDemoUrl: "https://github.com/Aiagent1113",
  },
  repositories: [
    {
      name: "neural-agent-orchestrator",
      description: "Distributed autonomous agent harness with real-time vector memory & DAG consensus.",
      stars: 482,
      forks: 67,
      language: "Python / CUDA",
      langColor: "#818CF8",
      url: "https://github.com/Aiagent1113",
      tag: "v2.6 Stable",
    },
    {
      name: "spatial-llm-engine",
      description: "High-compute multi-modal reasoning pipeline for 3D Gaussian splatting & scene cognition.",
      stars: 319,
      forks: 41,
      language: "C++ / PyTorch",
      langColor: "#6366F1",
      url: "https://github.com/Aiagent1113",
      tag: "Research",
    },
    {
      name: "speculative-cuda-decoder",
      description: "Custom Flash-Attention & speculative decoding kernels achieving 3.4x throughput gain.",
      stars: 245,
      forks: 28,
      language: "CUDA",
      langColor: "#10B981",
      url: "https://github.com/Aiagent1113",
      tag: "Kernel",
    },
  ],
  socials: [
    {
      id: "telegram",
      name: "Telegram",
      handle: "@egamberdiyev_ai",
      url: "https://t.me/egamberdiyev_ai",
      icon: "Send",
      accentColor: "#229ED9", // Official Telegram Blue / Cyan
      description: "Direct Encrypted Comm Link",
      stats: "Active Online",
    },
    {
      id: "instagram",
      name: "Instagram",
      handle: "@egamberdiyev_ai",
      url: "https://instagram.com/egamberdiyev_ai",
      icon: "Instagram",
      accentColor: "#E1306C", // Official Instagram Rose / Magenta
      description: "AI Visuals & Daily Updates",
      stats: "Stories & Posts",
    },
    {
      id: "phone",
      name: "Direct Call",
      handle: "+998 90 000 00 00",
      url: "tel:+998900000000",
      icon: "Phone",
      accentColor: "#10B981", // Emerald Voice Line
      description: "Immediate Voice Line",
      stats: "Available Now",
    },
    {
      id: "github",
      name: "GitHub",
      handle: "Aiagent1113",
      url: "https://github.com/Aiagent1113",
      icon: "Github",
      accentColor: "#A78BFA", // Quantum Violet
      description: "Autonomous Kernels & Repos",
      stats: "1.2k+ Stars",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "in/akbarjon-egamberdiyev",
      url: "https://linkedin.com/in/akbarjon-egamberdiyev",
      icon: "Linkedin",
      accentColor: "#0A66C2", // Official LinkedIn Blue
      description: "Executive AI Network & Advisory",
      stats: "5,000+ Followers",
    },
    {
      id: "huggingface",
      name: "Hugging Face / X",
      handle: "@Akbarjon",
      url: "https://huggingface.co/Akbarjon",
      icon: "Cpu",
      accentColor: "#F59E0B", // Hugging Face Amber / Gold
      description: "Model Weights & Research Papers",
      stats: "14 Models",
    },
  ],
  terminal: {
    initialCommand: "whoami",
    commands: [
      {
        command: "whoami",
        label: "whoami",
        output: [
          "[IDENTITY]: Akbarjon Egamberdiyev — Senior AI Engineer & Autonomous Systems Architect.",
          "[LOCATION]: Tashkent, Uzbekistan (Global Remote).",
          "[MISSION] : Architecting sovereign LLM agent networks, high-compute neural pipelines & speculative inference.",
          "[STATUS]  : Available for Enterprise AI Advisory & Venture Engineering.",
        ],
      },
      {
        command: "nvidia-smi --cluster",
        label: "nvidia-smi --cluster",
        output: [
          "+-----------------------------------------------------------------------------+",
          "| NVIDIA-SMI 550.54.14              Driver Version: 550.54.14   CUDA: 12.4    |",
          "| GPU  Name        Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |",
          "|   0  H100 80GB HBM3        On  | 00000000:06:00.0 Off |                    0 |",
          "| 64%   72C    P0   420W / 700W |  52410MiB / 81559MiB |      98%      Default|",
          "+-----------------------------------------------------------------------------+",
          "| Latency: p99 31.8ms | Throughput: 142.4 tok/s | Uptime: 99.98% Healthy     |",
        ],
      },
      {
        command: "cat stack.json",
        label: "cat stack.json",
        output: [
          "{",
          '  "ai_ml": ["PyTorch", "vLLM", "TensorRT-LLM", "DeepSpeed", "Triton"],',
          '  "agentic": ["LangGraph", "DAG Consensus", "Autonomous Tool Calling"],',
          '  "infrastructure": ["NVIDIA H100 SXM5", "CUDA C++", "Ray Serve", "Slurm"],',
          '  "spatial_frontend": ["Next.js", "Three.js", "TailwindCSS", "Framer Motion"]',
          "}",
        ],
      },
    ],
  },
  consultation: {
    title: "Book a 1-on-1 AI Architecture & Strategy Session",
    badge: "EXECUTIVE ADVISORY",
    description: "Direct technical deep-dive into LLM pipeline architecture, custom agent orchestration, GPU inference optimization, or venture advisory.",
    duration: "45-Minute Strategic Deep-Dive",
    availability: "Available for Q4/Q1 Consultations",
  },
};
