import fs from "fs";
import path from "path";
import matter from "gray-matter";
/* ------------------ Markdown ------------------ */
import { unified, type Plugin } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";
/* ------------------ Types ------------------ */
import type { Root } from "hast";
import type {
  Article,
  ArticleFrontMatter,
  ArticleHeading,
  ArticleSummary,
} from "@/data/types";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "articles");
const ARTICLE_EXTENSION = ".mdx";

/** The headings listed in Contents. "##" in Markdown renders as <h2>. */
const CONTENTS_HEADING_TAG = "h2";

const isoDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

/** The file names in /articles without ".mdx". Other files are ignored. */
export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(ARTICLES_DIRECTORY)
    .filter((fileName) => fileName.endsWith(ARTICLE_EXTENSION))
    .map((fileName) => fileName.slice(0, -ARTICLE_EXTENSION.length));
}

function readArticleFile(slug: string) {
  const fullPath = path.join(ARTICLES_DIRECTORY, `${slug}${ARTICLE_EXTENSION}`);
  return matter(fs.readFileSync(fullPath, "utf8"));
}

/** True for "YYYY-MM-DD" strings that name a real day, so "2025-02-30" is false. */
function isIsoDate(value: string): boolean {
  const match = isoDatePattern.exec(value);
  if (!match) {
    return false;
  }
  const [, year, month, day] = match.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/**
 * Checks a post's front matter and returns it typed. Throws an error that names
 * the file and the field, so a bad post stops `next build`.
 */
export function parseFrontMatter(
  slug: string,
  data: Record<string, unknown>,
): ArticleFrontMatter {
  const fail = (field: keyof ArticleFrontMatter, problem: string): never => {
    throw new Error(
      `articles/${slug}${ARTICLE_EXTENSION}: "${field}" ${problem}`,
    );
  };

  const readText = (field: "title" | "description") => {
    const value = data[field];
    if (typeof value !== "string" || value.trim() === "") {
      return fail(field, "must be a non-empty string");
    }
    return value;
  };

  // Unquoted, YAML turns the date into a Date, which isn't JSON-serializable.
  const rawDate = data.date;
  const date =
    rawDate instanceof Date && !Number.isNaN(rawDate.getTime())
      ? rawDate.toISOString().slice(0, 10)
      : rawDate;
  if (typeof date !== "string" || !isIsoDate(date)) {
    return fail("date", 'must be a real date written as "YYYY-MM-DD"');
  }

  const { minutesToRead } = data;
  if (
    typeof minutesToRead !== "number" ||
    !Number.isInteger(minutesToRead) ||
    minutesToRead < 1
  ) {
    return fail("minutesToRead", "must be a positive whole number");
  }

  return {
    title: readText("title"),
    date,
    description: readText("description"),
    minutesToRead,
  };
}

function getArticleSummary(slug: string): ArticleSummary {
  const { data } = readArticleFile(slug);
  return { slug, ...parseFrontMatter(slug, data) };
}

/** Every post, newest first. Posts released the same day are sorted by title. */
export function getArticleSummaries(): ArticleSummary[] {
  return getArticleSlugs()
    .map(getArticleSummary)
    .sort((a, b) => {
      if (a.date !== b.date) {
        return a.date < b.date ? 1 : -1;
      }
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    });
}

/** Groups posts by release year, newest year first. Keeps the posts' order. */
export function groupByYear(
  summaries: ArticleSummary[],
): { year: number; articles: ArticleSummary[] }[] {
  const groups: { year: number; articles: ArticleSummary[] }[] = [];
  summaries.forEach((summary) => {
    // From the string, not a Date: new Date("2026-01-01") is in 2025 west of UTC.
    const year = Number(summary.date.slice(0, 4));
    const group = groups.find((existing) => existing.year === year);
    if (group) {
      group.articles.push(summary);
    } else {
      groups.push({ year, articles: [summary] });
    }
  });
  return groups.sort((a, b) => b.year - a.year);
}

/**
 * Sets file.data.headings to the id and text of each CONTENTS_HEADING_TAG, in
 * order. Runs after rehype-slug, so the ids are the ones in the rendered HTML.
 */
const rehypeCollectHeadings: Plugin<[], Root> = () => (tree, file) => {
  const headings: ArticleHeading[] = [];
  visit(tree, "element", (node) => {
    if (node.tagName !== CONTENTS_HEADING_TAG) {
      return;
    }
    const id = node.properties.id;
    const text = toString(node).trim();
    if (typeof id === "string" && id !== "" && text !== "") {
      headings.push({ id, text });
    }
  });
  file.data.headings = headings;
};

/** One post: its front matter, its body as HTML, and its Contents headings. */
export async function getArticle(slug: string): Promise<Article> {
  const { data, content } = readArticleFile(slug);
  const frontMatter = parseFrontMatter(slug, data);

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeCollectHeadings)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    ...frontMatter,
    contentHtml: String(file),
    headings: file.data.headings as ArticleHeading[],
  };
}
