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
    github: "https://github.com/Aiagent1113",
    linkedin: "https://linkedin.com/in/akbarjon-egamberdiyev",
    twitter: "https://x.com/akbarjon_ai",
    huggingface: "https://huggingface.co/Akbarjon",
    calendar: "https://cal.com/akbarjon-ai/architecture-session",
    phone: "+998 90 000 00 00",
  },
  flagship: {
    badge: "PRODUCTION v2.6",
    title: "Autonomous Multi-Agent AI Framework & LLM Orchestrator",
    subtitle: "High-Throughput Distributed Reasoning Engine",
    description: "Enterprise-grade distributed neural runtime featuring deterministic DAG execution, sub-40ms speculative token decoding, and sovereign agent memory synchronization.",
    tags: ["PyTorch", "LangGraph", "CUDA", "Next.js", "Vector DB", "vLLM", "Triton"],
    metrics: [
      { label: "Uptime SLA", value: "99.98%", trend: "Real-time" },
      { label: "Inference Speed", value: "142 tok/s", trend: "FP8 vLLM" },
      { label: "Fine-Tuned Models", value: "14+", trend: "Deployed" },
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
      langColor: "#3572A5",
      url: "https://github.com/Aiagent1113",
      tag: "v2.6 Stable",
    },
    {
      name: "spatial-llm-engine",
      description: "High-compute multi-modal reasoning pipeline for 3D Gaussian splatting & scene cognition.",
      stars: 319,
      forks: 41,
      language: "C++ / PyTorch",
      langColor: "#f34b7d",
      url: "https://github.com/Aiagent1113",
      tag: "Research",
    },
    {
      name: "speculative-cuda-decoder",
      description: "Custom Flash-Attention & speculative decoding kernels achieving 3.4x throughput gain.",
      stars: 245,
      forks: 28,
      language: "CUDA",
      langColor: "#76b900",
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
      accentColor: "#00F5D4", // Neural Cyan
      description: "Direct Encrypted Comm Link",
      stats: "Active Online",
    },
    {
      id: "github",
      name: "GitHub",
      handle: "Aiagent1113",
      url: "https://github.com/Aiagent1113",
      icon: "Github",
      accentColor: "#7B2CBF", // Quantum Violet
      description: "Autonomous Kernels & Repos",
      stats: "1.2k+ Stars",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      handle: "in/akbarjon-egamberdiyev",
      url: "https://linkedin.com/in/akbarjon-egamberdiyev",
      icon: "Linkedin",
      accentColor: "#38BDF8", // Electric Blue
      description: "Executive AI Network & Advisory",
      stats: "5,000+ Followers",
    },
    {
      id: "huggingface",
      name: "Hugging Face / X",
      handle: "@Akbarjon",
      url: "https://huggingface.co/Akbarjon",
      icon: "Cpu",
      accentColor: "#E2B86B", // Champagne Gold
      description: "Model Weights & Research Papers",
      stats: "14 Models",
    },
  ],
  terminal: {
    initialCommand: "whoami",
    commands: [
      {
        command: "Who is Akbarjon?",
        output: [
          "> Initializing neural identity protocol for Akbarjon Egamberdiyev...",
          "[ROLE]: Senior AI Engineer & Autonomous Systems Architect based in Tashkent, Uzbekistan.",
          "[CORE FOCUS]: Specializing in frontier LLM agent orchestration, high-compute neural inference, and low-latency spatial intelligence.",
          "[IMPACT]: Architected sovereign AI platforms processing millions of daily inference tokens across multi-GPU clusters.",
          "[STATUS]: Active. Ready for enterprise AI advisory, founding engineer roles, and cutting-edge collaborations."
        ],
      },
      {
        command: "Tech Stack",
        output: [
          "> Querying deep neural architecture & technology matrix...",
          "[AI / ML]       : PyTorch, vLLM, TensorRT-LLM, LangGraph, DeepSpeed, Triton, HuggingFace Transformers",
          "[SYSTEMS & GPU] : CUDA C++, Linux Kernel tuning, Slurm clusters, NVIDIA H100/A100 optimization",
          "[VECTOR / RAG]  : Qdrant, Milvus, pgvector, hybrid semantic re-ranking, graph RAG",
          "[FRONTEND & 3D] : Next.js 15, TypeScript, Three.js, WebGL, TailwindCSS, Framer Motion",
          "[DEPLOYMENT]    : Docker, Kubernetes, Ray Serve, FastAPI, AWS SageMaker, GCP Vertex AI"
        ],
      },
      {
        command: "Latest AI Models",
        output: [
          "> Inspecting deployed neural weights registry...",
          "● [Akbar-Reason-70B-FP8]   : Fine-tuned multi-step chain-of-thought mathematical reasoning model (MMLU 88.4%)",
          "● [SpatialAgent-V2]        : Vision-language agent for 3D spatial query resolution & robotic manipulation",
          "● [Speculative-Draft-Kernel]: Ultra-fast 1.2B draft model yielding 3.2x speedup on Llama-3-70B inference",
          "● [Neural-Consensus-DAG]   : Multi-agent coordination harness with zero hallucinatory drift"
        ],
      },
      {
        command: "System Telemetry",
        output: [
          "> Running real-time telemetry diagnostics...",
          "[GPU NODES]      : 8x NVIDIA H100 80GB SXM5 (Online, 99.98% Healthy)",
          "[VRAM UTIL]      : 64.2% / 640 GB Allocated across active shards",
          "[TOKEN THROUGHPUT: 142.6 tokens/sec (Average across all stream channels)",
          "[P99 LATENCY]    : 31.8 ms (First-Token-To-Stream)",
          "[AGENT STATE]    : 42 autonomous worker agents currently synchronized in memory"
        ],
      },
    ],
  },
  consultation: {
    title: "Book a 1-on-1 AI Architecture & Strategy Session",
    badge: "EXECUTIVE CONSULTING",
    description: "Confidential technical deep-dive into LLM pipeline architecture, custom agent orchestration, GPU inference optimization, or venture advisory.",
    duration: "45-Minute Strategic Session",
    availability: "Limited slots available for Q4/Q1",
  },
};
