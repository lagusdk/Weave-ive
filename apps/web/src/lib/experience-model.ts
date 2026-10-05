export const EXPERIENCE_SELECT = `
  id,
  title,
  slug,
  summary,
  status,
  started_on,
  ended_on,
  created_at,
  updated_at,
  experience_interests (
    interests (name)
  ),
  experience_blocks (
    id,
    block_type,
    content,
    position
  )
`;

export type ExperienceStatus = "idea" | "doing" | "done" | "paused";

export type ExperienceRecord = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  status: ExperienceStatus;
  startedOn: string | null;
  endedOn: string | null;
  createdAt: string;
  updatedAt: string;
  interests: string[];
  reflection: string;
};

type RelationRow = {
  interests: { name: string } | { name: string }[] | null;
};

type BlockRow = {
  id: string;
  block_type: string;
  content: unknown;
  position: number;
};

export type ExperienceQueryRow = {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  status: ExperienceStatus;
  started_on: string | null;
  ended_on: string | null;
  created_at: string;
  updated_at: string;
  experience_interests?: RelationRow[] | null;
  experience_blocks?: BlockRow[] | null;
};

function getInterestName(relation: RelationRow) {
  if (Array.isArray(relation.interests)) return relation.interests[0]?.name;
  return relation.interests?.name;
}

function getBlockText(content: unknown) {
  if (!content || typeof content !== "object" || !("text" in content)) return "";
  const text = (content as { text?: unknown }).text;
  return typeof text === "string" ? text : "";
}

export function toExperienceRecord(row: ExperienceQueryRow): ExperienceRecord {
  const reflection = row.experience_blocks
    ?.filter((block) => block.block_type === "reflection")
    .sort((a, b) => a.position - b.position)
    .map((block) => getBlockText(block.content))
    .find(Boolean) ?? "";

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary ?? "",
    status: row.status,
    startedOn: row.started_on,
    endedOn: row.ended_on,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    interests: row.experience_interests?.map(getInterestName).filter((name): name is string => Boolean(name)) ?? [],
    reflection,
  };
}

export function formatExperiencePeriod(experience: Pick<ExperienceRecord, "startedOn" | "endedOn">) {
  if (!experience.startedOn && !experience.endedOn) return "기간 미정";
  const format = (value: string) => value.replaceAll("-", ".");
  if (!experience.startedOn) return `— ${format(experience.endedOn!)}`;
  if (!experience.endedOn) return `${format(experience.startedOn)} — 현재`;
  return `${format(experience.startedOn)} — ${format(experience.endedOn)}`;
}

export const statusLabel: Record<ExperienceStatus, string> = {
  idea: "Idea",
  doing: "Doing",
  done: "Done",
  paused: "Paused",
};
