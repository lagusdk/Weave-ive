export type PrototypeExperience = {
  id: string;
  title: string;
  summary: string;
  status: "Idea" | "Doing" | "Done" | "Paused";
  period: string;
  updatedAt: string;
  tags: string[];
  accent: string;
  note: string;
};

export const prototypeExperiences: PrototypeExperience[] = [
  {
    id: "folding-birding",
    title: "Folding Birding",
    summary: "공간 인터랙션과 웹 기술을 엮어 만든 XR 전시 경험",
    status: "Doing",
    period: "2026.03 — 현재",
    updatedAt: "오늘",
    tags: ["XR", "Three.js", "UX", "Exhibition"],
    accent: "from-violet-500 to-fuchsia-400",
    note: "Quest 연동 과정과 전시 피드백을 한곳에 기록하고 있다. 다음 기록에서는 관람객 동선을 중심으로 회고할 예정.",
  },
  {
    id: "weave-ive",
    title: "Weave:ive",
    summary: "여러 모습의 나를 하나의 경험 데이터베이스로 엮는 개인 아카이브",
    status: "Doing",
    period: "2026.10 — 현재",
    updatedAt: "어제",
    tags: ["Next.js", "Supabase", "Product", "Archive"],
    accent: "from-orange-400 to-rose-400",
    note: "기획과 개발을 분리하지 않고, 실제로 쓸 수 있는 작은 기록 흐름부터 완성하는 방향으로 진행 중이다.",
  },
  {
    id: "hri-notes",
    title: "HRI Research Notes",
    summary: "로봇과 사람의 상호작용에서 발견한 질문과 레퍼런스 모음",
    status: "Idea",
    period: "2026.09 —",
    updatedAt: "3일 전",
    tags: ["HRI", "Robotics", "Research"],
    accent: "from-cyan-500 to-emerald-400",
    note: "논문을 읽으며 떠오른 질문을 작은 단위로 쌓고, 이후 연구 주제와 연결하기 위한 공간.",
  },
];

export const prototypeGoals = [
  { interest: "Web", goal: "나만의 경험 아카이브 MVP 배포", progress: 42, color: "#7c5cff" },
  { interest: "XR / HCI", goal: "Folding Birding 전시 회고 완성", progress: 68, color: "#ff7066" },
  { interest: "Research", goal: "HRI 논문 노트 10개 쌓기", progress: 30, color: "#19a98c" },
];

export const prototypePresets = [
  { name: "Personal Home", description: "가장 자연스러운 나의 기본 홈", count: 3, published: true },
  { name: "Frontend", description: "제품 설계와 웹 구현 경험 중심", count: 2, published: false },
  { name: "XR / HCI", description: "공간 인터랙션과 연구 경험 중심", count: 2, published: false },
];
