import type { Skill } from "@/components/skill-list";

/** Whole years, as the page shows them: "2021 - 2024" or "2024 - Present". */
export interface YearRange {
  start: number;
  /** "present" for a job or degree that hasn't ended. */
  end: number | "present";
}

export interface Job {
  title: string;
  employer: string;
  /** "Remote" or a place, e.g. "Bedford, NH". The page adds the parentheses. */
  location: string;
  years: YearRange;
  /** One sentence each, shown as bullets. */
  highlights: string[];
  /** The "Tech stack" icons, in display order. Leave empty to hide the row. */
  skills: Skill[];
}

export interface Education {
  /** As shown, e.g. "B.S. in Computer Science". */
  degree: string;
  school: string;
  location: string;
  years: YearRange;
}

export interface Resume {
  /** Newest first. The page shows them in this order. */
  experience: Job[];
  education: Education[];
}
