import type { StaticImageData } from "next/image";
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

export interface ProjectLinks {
  /** A live version of the project. Shown as an external-link icon. */
  demo?: `https://${string}`;
  /** The project's repository. Shown as a GitHub icon. */
  github?: `https://github.com/${string}`;
  /** The project's showcase page on this site. Shown as a "Showcase" link. */
  showcase?: `/projects/${string}`;
}

export interface Project {
  /** The HTML id of the project's row or card, e.g. "netgraph" for /#netgraph. */
  id: string;
  name: string;
  description: string;
  /** The "Technologies" icons, in display order. */
  skills: Skill[];
  links: ProjectLinks;
}

/** One screenshot, taken in the light and in the dark theme. */
export interface Screenshot {
  light: StaticImageData;
  dark: StaticImageData;
  /** What the screenshot shows. Used for both versions. */
  alt: string;
}

/** A project under "What I'm Working On", which is shown with a screenshot. */
export interface CurrentProject extends Project {
  screenshot: Screenshot;
}

export interface Projects {
  /** "What I'm Working On", in display order. */
  current: CurrentProject[];
  /** "Past Projects", in display order. */
  past: Project[];
}

/** The front matter every file in /articles must have. */
export interface ArticleFrontMatter {
  title: string;
  /** Release date, "YYYY-MM-DD". */
  date: string;
  /** One or two sentences. Shown under the title on /writing. */
  description: string;
  /** Whole minutes. Shown as "8 minute read". */
  minutesToRead: number;
}

/** What /writing needs for each post. */
export interface ArticleSummary extends ArticleFrontMatter {
  /** The file name without ".mdx". The post's URL is /writing/<slug>. */
  slug: string;
}

/** One entry in a post's Contents. */
export interface ArticleHeading {
  /** The heading's id, added by rehype-slug. Contents links go to #<id>. */
  id: string;
  text: string;
}

export interface Article extends ArticleSummary {
  /** The post's body, compiled by MDX. Render it with <ArticleContent />. */
  code: string;
  /** The post's "##" headings, in order. */
  headings: ArticleHeading[];
}
