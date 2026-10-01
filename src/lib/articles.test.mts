import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { runSync } from "@mdx-js/mdx";
// With ".ts", because Node doesn't add extensions or know "@/"
import { compileArticle, getArticle, getArticleSlugs } from "./articles.ts";

/** A post's HTML, rendered the way ArticleContent renders it */
function renderPost(code: string): string {
  const { default: Content } = runSync(code, runtime);
  return renderToStaticMarkup(createElement(Content));
}

function count(html: string, pattern: RegExp): number {
  return html.match(new RegExp(pattern, "g"))?.length ?? 0;
}

describe("posts", () => {
  it("compiles every post without errors or warnings", async () => {
    for (const slug of getArticleSlugs()) {
      await assert.doesNotReject(getArticle(slug), `articles/${slug}.mdx`);
    }
  });

  it("renders part 1's text elements", async () => {
    const article = await getArticle("mb-blog-article-one");
    assert.deepEqual(
      article.headings.map((heading) => heading.text),
      [
        "Paragraphs and line breaks",
        "Headings",
        "Emphasis and inline code",
        "Links",
        "Lists, from quick bullets to step-by-step instructions",
        "Blockquotes",
        "Footnotes",
        "Horizontal rules",
        "Wrapping up",
      ],
    );

    const html = renderPost(article.code);
    for (const tag of ["<del>", "<kbd>", "<mark>", "<abbr"]) {
      assert.ok(html.includes(tag), tag);
    }
    assert.match(html, /<input type="checkbox"/);
    assert.match(html, /class="footnotes"/);
    assert.equal(count(html, /<figure class="quote">/), 1);
  });

  it("renders part 2's code, tables, and images", async () => {
    const article = await getArticle("mb-blog-article-two");
    assert.deepEqual(
      article.headings.map((heading) => heading.text),
      [
        "Code blocks",
        "Tables",
        "Images and figures",
        "HTML inside a post",
        "Special characters & escapes",
        "Wrapping up",
      ],
    );

    const html = renderPost(article.code);
    assert.equal(count(html, /<div class="table-scroll"><table>/), 3);
    assert.match(html, /<span class="hljs-/);
    // Guards tableCellAlignToStyle: false, which the table styles depend on
    assert.match(html, /<td align="right">/);
    assert.doesNotMatch(html, /<p>(?:(?!<\/p>)[\s\S])*<img/);
  });
});

describe("bad posts stop the build", () => {
  it("rejects a # heading, naming the file and line", async () => {
    await assert.rejects(
      compileArticle("articles/test.mdx", "Intro\n\n# Title\n"),
      /articles\/test\.mdx:3:1.*page's h1/,
    );
  });

  it("rejects a code fence in an unknown language", async () => {
    await assert.rejects(
      compileArticle("articles/test.mdx", "Intro\n\n```tsxx\nconst a = 1;\n```\n"),
      /articles\/test\.mdx:3:1.*tsxx/,
    );
  });

  it("rejects MDX syntax errors", async () => {
    await assert.rejects(
      compileArticle("articles/test.mdx", "Intro\n\n<!-- comment -->\n"),
      /articles\/test\.mdx:3:/,
    );
  });
});

describe("loose checklists", () => {
  it("puts each checkbox first in the item's first paragraph", async () => {
    const { code } = await compileArticle(
      "articles/test.mdx",
      "- [x] Done\n\n- [ ] Not done\n",
    );
    const html = renderPost(code);
    assert.equal(
      count(html, /<li class="task-list-item">\s*<p><input type="checkbox"/),
      2,
    );
  });
});
