# Implementation plan: Writing section

**Status:** Decisions confirmed, ready to implement · **Date:** 2026-09-28, updated 2026-09-29 after review ·
**Branch:** `blog`

## Design source

> **Every change in this plan is based on the mock-up in `.mock/`.** It is the reference for layout, spacing, type
> sizes, colors, and behavior. If this plan and the mock disagree, check with Erik before choosing between them.

Files used from the mock:

| Mock file                                           | What it shows                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `.mock/writing.html`                                | The Writing index: intro, then posts grouped by year                                                                |
| `.mock/writing/tuning-force-directed-layouts.html`  | A post: "All writing" link, title, release date, read length, Contents sidebar (desktop) and Contents section (mobile) |
| `.mock/styles.css`                                  | The "Writing: index" and "Writing: article" sections, plus the color tokens                                         |
| `.mock/site.js`                                     | "Article: highlight the current section in the contents" (tracks the section being read)                            |

`.mock/` is in `.gitignore`, so it isn't in the repository. The values this plan depends on are copied into
[Appendix: mock measurements](#appendix-mock-measurements), so the plan still works without the mock.

The mock is a temporary design for this piece of work only. Use it as the reference while implementing, but don't
link to it or mention it in code, code comments, or other project files.

## Summary

1. Rename the **Blog** nav item to **Writing**.
2. Rebuild the Writing index page to look and behave like the mock. Each post's **release date**, **short
   description**, and **minutes to read** come from its front matter.
3. Give each post the mock's **header** ("All writing" link, title, release date, read length) and **Contents** (a
   sticky sidebar on desktop and a collapsible section on mobile). Contents items are the post's own sub-headings,
   and clicking one scrolls to that heading.
4. Leave article content and its styling **out of scope**. They are the next piece of work.

## Out of scope

**Article content and its styling. These are follow-on work.** This plan does not:

- change the post body's typography, spacing, width, code blocks, blockquotes, lists, tables, or images (the mock's
  `.article-body` rules in `styles.css`)
- change heading levels inside post content
- edit the text of any existing post, other than adding front matter fields

The post body keeps rendering exactly as it does today, through a `dangerouslySetInnerHTML` div. The only new rule
that reaches into it is `scroll-margin-top` on the elements that Contents links jump to (Step 7e). It sets where the
page stops scrolling and doesn't change how anything looks.

The mock also shows these, but they aren't in this plan:

- "Older post" / "Newer post" links at the end of a post (`.post-nav`)
- the home page's "Latest post" section
- a "Writing" link in the footer site map
- marking the current page in the header nav (`aria-current="page"`)
- comment coloring inside code blocks (`.code-comment`)

They're listed again under [Follow-on work](#follow-on-work).

## Current state

- **Routes (Pages Router).** `src/pages/blog/index.tsx` lists the posts, and `src/pages/blog/articles/[id].tsx`
  renders one.
- **Loader.** `src/lib/articles.js` (untyped) reads `articles/*.mdx` with `gray-matter` and renders markdown with
  `remark-parse → remark-rehype → rehype-slug → rehype-stringify`. `rehype-slug` already gives every heading an `id`.
- **Front matter.** The only post, `articles/mb-blog-article-one.mdx`, has `title`, `date`, and `description`.
  `description` isn't shown anywhere yet.
- **Index page.** A "Brainstorms & Deep Dives" intro, then a flat list of titles, each with its raw date string.
- **Post page.** The title and the raw date. It has no `<title>`, no back link, and no Contents.
- **Nav.** `src/components/header/index.tsx:231` is `<NavigationLink href="/blog">Blog</NavigationLink>`. CSS
  (`text-transform`) makes it uppercase, so only the label needs to change to "Writing". On `main` this line is
  commented out, which hides the blog. This branch un-comments it and keeps it visible (D7).
- **Theme.** Colors are CSS variables generated from `src/theme/light-theme.ts` and `dark-theme.ts` (see
  `src/theme/css-vars.ts`). The theme has no muted text color yet. The mock uses one for dates, read length, years,
  and Contents links.

## Decisions

Erik confirmed D1–D6 on 2026-09-28: D1 and D4 as proposed, and D6 changed so the page takes the mock's heading but
keeps its current introduction. After a review on 2026-09-29, D1 was changed to drop the redirects, and D7–D9 were
added.

| #   | Decision                                | Default                                                                                                                  | Why                                                                                                                                                                                                   |
| --- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1  | URLs                                    | Move to `/writing` and `/writing/<slug>`. No redirects: `/blog` and `/blog/articles/<slug>` return 404.                  | Matches the mock's URLs and the new nav label. `/blog` was never linked from the site or shared, so there are no old links to keep working, and a permanent (308) redirect can't be taken back.       |
| D2  | Front matter field names                | Keep `date` (release date) and `description` (short description). Add `minutesToRead`.                                   | `date` and `description` already exist and hold the right values, so existing posts need only one new field.                                                                                          |
| D3  | Minutes to read                         | Written by hand in front matter, not calculated                                                                          | As requested. The build checks that it's present and is a positive whole number.                                                                                                                       |
| D4  | Which headings appear in Contents       | Only `##` headings (rendered as `<h2>`)                                                                                  | The mock's Contents has one level. This first pass leaves out `###` and deeper. A later iteration may add more levels (see [Follow-on work](#follow-on-work)). |
| D5  | How Contents switches between desktop and mobile | A CSS media query at 900px                                                                                      | 900px is the mock's breakpoint. Both versions are in the prerendered HTML and CSS shows one, so nothing flashes after hydration. `useWindowResize` reports a width of 0 until the page mounts, so it would flash. |
| D6  | Index page wording                      | The heading changes from "Brainstorms & Deep Dives" to "Writing". The current introduction paragraph ("Welcome to my blog! …") stays word for word. | Erik's choice. The page gets the mock's heading but keeps its own introduction. The mock's intro sentence isn't used.                                                                                  |
| D7  | Nav link                                | Visible on this branch (un-commented)                                                                                    | The first real article will be written on this branch before it merges, so the test post won't be the only post when the link goes live. This branch will also get more work than this plan covers. |
| D8  | Differences from the mock               | (a) The Contents sidebar is a `<nav>`, not an `<aside>`. (b) When the page is scrolled to the bottom, the last heading is the current one. (c) The sidebar's height is capped at the window, and it scrolls. | (a) A table of contents is page navigation, so it belongs in a navigation landmark. It looks the same. (b) Otherwise a short last section is never highlighted, even right after clicking it. (c) A sticky sidebar taller than the window can't show its last items until the page ends. |
| D9  | `/writing` meta description             | "Erik Carlson's thoughts, ideas, and lessons learned, from web development to creative projects."                        | The mock's index page has one. Drafted from the current intro (D6 keeps the intro, which is too long for this). Erik can reword it.                                                                  |

## Implementation steps

The steps are in dependency order. Each one ends with a check that confirms it's done.

Per `AGENTS.md`, the Next.js APIs used here were checked against the docs in `node_modules/next/dist/docs/`:
`02-pages/04-api-reference/03-functions/get-static-props.md` and `get-static-paths.md`.

### Step 1. Front matter schema and a typed article loader

**Front matter.** Every file in `articles/` must have these fields:

```yaml
---
title: "Tuning force-directed layouts in Netgraph"
date: "2026-09-12" # Release date, YYYY-MM-DD. Keep the quotes.
description: "How Netgraph picks its default forces and lays out large graphs without animating them."
minutesToRead: 8 # Whole minutes. Shown as "8 minute read".
---
```

- **Quote `date`.** Without quotes, gray-matter's YAML parser turns it into a JavaScript `Date`. `getStaticProps`
  props must be JSON-serializable, so the build would fail. The loader converts a `Date` back to `YYYY-MM-DD` anyway,
  so a missing pair of quotes won't break the build.
- **`description`** is one or two sentences. It appears under the title on `/writing` and becomes the post's
  `<meta name="description">`.
- **`minutesToRead`**: divide the word count by about 225 and round up.

Add `minutesToRead` to `articles/mb-blog-article-one.mdx`. About 2 minutes is right for that post. Nothing else in the
file changes.

**Types.** Add these to `src/data/types.ts`, next to the resume and project types, with doc comments in the same
style:

```ts
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
  contentHtml: string;
  /** The post's "##" headings, in order. */
  headings: ArticleHeading[];
}
```

**Loader.** Replace `src/lib/articles.js` with `src/lib/articles.ts`, which exports:

- `getArticleSlugs(): string[]`. It reads only `*.mdx` files, so a stray file like `.DS_Store` doesn't become a page.
- `getArticleSummaries(): ArticleSummary[]`, newest first. It sorts by comparing the `YYYY-MM-DD` strings and breaks
  ties by title so the order doesn't change between builds.
- `getArticle(slug): Promise<Article>`. This is the summary plus `contentHtml` and `headings` (see Step 2).
- `groupByYear(summaries): { year: number; articles: ArticleSummary[] }[]`, newest year first. The index page uses it.
  Take the year from the string with `Number(date.slice(0, 4))`, not from a `Date`: `new Date("2026-01-01")
  .getFullYear()` returns 2025 on a machine west of UTC, so a local build and the production build would disagree.
- `parseFrontMatter(slug, data): ArticleFrontMatter`. It checks every field and throws an error that names the file
  and the field, for example `articles/foo.mdx: "minutesToRead" must be a positive whole number`. A missing field then
  stops `next build` instead of rendering "undefined minute read". `date` must match `YYYY-MM-DD` and be a real date,
  so `2025-02-30` fails.

**Done when:** `npm run build` passes, and deleting `minutesToRead` from the post makes the build fail with the error
above.

### Step 2. Build the Contents from the rendered headings

Add a small rehype plugin to `src/lib/articles.ts`. It runs right after `rehype-slug`, records the `id` and text of
each Contents heading, and stores the list on the file as `file.data.headings`:

```ts
/** The headings listed in Contents. "##" in Markdown renders as <h2>. */
const CONTENTS_HEADING_TAG = "h2";

const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeCollectHeadings) // sets file.data.headings to { id, text } for each CONTENTS_HEADING_TAG
  .use(rehypeStringify)
  .process(content);

const contentHtml = String(file);
const headings = file.data.headings as ArticleHeading[];
```

- Passing data out on `file.data` is the usual way for unified plugins, and it works the same way if posts move to
  MDX (see [Follow-on work](#follow-on-work)).
- The plugin reads ids from the same tree `rehype-slug` wrote them into, so every Contents link matches its heading.
  That includes repeated heading text, which `rehype-slug` gives ids like `…-1` and `…-2`.
- `CONTENTS_HEADING_TAG` is the only place that sets which heading level Contents lists. If content headings move
  down a level (see [Follow-on work](#follow-on-work)), only this constant changes.
- Get the text with `hast-util-to-string`, so a heading that contains inline code or emphasis becomes plain text. Walk
  the tree with `unist-util-visit`. Both packages are already installed because `rehype-slug` depends on them. Add
  them to `dependencies` at the installed versions (`^3.0.1` and `^5.0.0`), since the loader will now import them
  directly. The plugin's types come from `hast`, so also add `@types/hast` at its installed version (`^3.0.4`) to
  `devDependencies`. Using the installed versions keeps npm from installing second copies.
- Skip headings that have no `id` or no text.

**Done when:** `getArticle("mb-blog-article-one")` returns one heading for each `##` in the file, in order, and every
`id` appears as `id="…"` in `contentHtml`.

### Step 3. Theme colors

The mock needs two colors the theme doesn't have yet. It also uses `text`, `link.text`, and `borderLine`, which already
exist.

| New key in `Theme["colors"]` | Light                      | Dark                       | Used for                                     | Mock token  |
| ---------------------------- | -------------------------- | -------------------------- | -------------------------------------------- | ----------- |
| `mutedText`                  | `grays.shade700` (#52555F) | `grays.shade500` (#A9AEB7) | Dates, read length, years, Contents links    | `--muted`   |
| `contents.background`        | `grays.shade200` (#EFF2F4) | `grays.shade800` (#343740) | The mobile Contents box                      | `--surface` |

Add the keys to `src/theme/types.ts`, `light-theme.ts`, and `dark-theme.ts`. `css-vars.ts` generates the variables
(`--color-muted-text` and `--color-contents-background`) automatically.

**Done when:** the new variables appear in both the `:root` and the `:root[data-theme="Dark"]` blocks of the page's
CSS.

### Step 4. Shared date and read-length line

Add `src/components/writing/post-meta.tsx`. Both the index and the post header use it.

```tsx
<PostMeta date="2026-09-12" minutesToRead={8} />          // "September 12, 2026"  "8 minute read"
<PostMeta date="2026-09-12" minutesToRead={8} hideYear /> // "September 12"  "8 minute read"  (under a year heading)
```

- It renders a `<p>` containing a `<time dateTime="2026-09-12">` and a `<span>` with the read length. The `<p>` is a
  wrapping flex row with `gap: 0.25rem 1rem`, `1rem` text, and the `mutedText` color. As in the mock, there's no
  separator character. The gap separates the two parts.
- Format the date with `Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: …, timeZone: "UTC" })`.
  **`timeZone: "UTC"` is required.** `"2025-05-24"` parses as midnight UTC. Without the option, anyone west of UTC
  sees May 23, and the server and the browser can render different dates during hydration.
- The read length is `` `${minutesToRead} minute read` ``, worded as in the mock.

**Done when:** a build run with `TZ=America/Los_Angeles` still shows May 24, 2025 for the existing post.

### Step 5. Routes and the nav label

1. Move `src/pages/blog/index.tsx` to `src/pages/writing/index.tsx`.
2. Move `src/pages/blog/articles/[id].tsx` to `src/pages/writing/[slug].tsx`. `getStaticPaths` returns
   `{ params: { slug } }` for each post, with `fallback: false`. Type both data functions with
   `satisfies GetStaticPaths` and `satisfies GetStaticProps<…>`, as the docs show, instead of `any`.
3. Delete `src/pages/blog/`. There are no redirects (D1), so the old URLs return 404.
4. Change `src/components/header/index.tsx:231` to `<NavigationLink href="/writing">Writing</NavigationLink>`.
   Every internal link must point to `/writing`. To find any left over, run `grep -rn '"/blog' src`.

**Done when:** the nav shows WRITING and goes to `/writing`, and `src/pages/blog/` no longer exists.

### Step 6. The Writing index page

`src/pages/writing/index.tsx`, following `.mock/writing.html`:

```
<Head>  "Writing | Erik Carlson", plus <meta name="description"> (D9)
<section aria-labelledby="writing-heading">               flex column, gap 1rem
  <Heading id="writing-heading">Writing</Heading>        h2, the existing component
  <Lede>Welcome to my blog! This is a space …</Lede>      the current intro paragraph, unchanged (D6)
                                                          styled like the mock's lede: 1.25rem, max-width 62ch
<section aria-label="Posts by year">                      flex column, gap 1rem between years
  for each year, newest first:
    <YearGroup>                                           grid 6rem | 1fr, border-top, padding-top 1.25rem
      <YearHeading>2026</YearHeading>                     h3, extends Subheading: 1.25rem, line-height 1.25,
                                                          mutedText
      <ol>  for each post, newest first:
        <li>
          <PostTitle><PostTitleLink href="/writing/<slug>">title</PostTitleLink></PostTitle>
                                                          h4: heading font, 1.375rem, line-height 1.25
                                                          link: text color, no underline
                                                          hover: link color and underline
          <PostMeta hideYear … />
          <p>description</p>                              1.1875rem, max-width 62ch
```

- `getStaticProps` returns `groupByYear(getArticleSummaries())`. Type the props with the types from Step 1 instead of
  `any`.
- Add an optional `description` argument to `getPageMetadata` in `src/lib/metadata.tsx` that adds a
  `<meta name="description">`. Pass it D9's sentence. The post page uses the same argument (Step 7a).
- The site has no global heading styles. Only `Heading` and `Subheading` set the heading font. Every heading this plan
  adds sets the heading font and a line height of 1.25 (1.2 for the post title), as the mock's base heading rule does.
  Without that, headings render in the body font with the body's 1.5 line height.
- The space between the two sections is `MainContent`'s existing 2rem, the same as on the site's other pages. The
  mock uses 3.5rem on every page, so changing it is a site-wide decision and not part of this plan.
- Copy the current introduction paragraph from `src/pages/blog/index.tsx` exactly. Only its styling changes: it now
  follows the mock's lede in place of the current `Introduction` styles (which used a 2rem line height and 1rem
  bottom padding).
- Remove the current "Articles" subheading. The mock has none, because the year headings mark where the list begins.
- The heading levels match the mock and the rest of the site: the site name in the header is `h1`, then the page
  heading is `h2`, each year `h3`, and each post `h4`.
- At 650px and below (the site's mobile breakpoint), `YearGroup` becomes a single column, with the year above its posts
  and `row-gap: 1rem`.
- Put the list in `src/components/writing/post-list.tsx` so the page file stays short, the way the home page uses
  `ProjectList`.

**Link colors.** `Layout`'s container sets `& a, & a:visited { color: link.text }`. That selector is a class plus an
element, so it beats a styled component's single class, and a styled link's own `color` is ignored. The header works
around this with `!important`. For the post title links here and the Contents links in Step 7, double the class with
`&&` and include `:visited`:

```ts
const PostTitleLink = styled(Link)`
  &&,
  &&:visited {
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }
  &&:hover {
    color: ${(props) => props.theme.colors.link.text};
    text-decoration: underline;
  }
`;
```

**Done when:** `/writing` matches `.mock/writing.html` in both themes at desktop and phone widths, and shows the real
post's front matter.

### Step 7. The post page: header, Contents, and layout

`src/pages/writing/[slug].tsx`, following `.mock/writing/tuning-force-directed-layouts.html`:

```
<Head>  "<title> | Erik Carlson", plus <meta name="description" content={description}>
<ArticleLayout>                                  grid minmax(0, 1fr) | 14rem, gap 3rem, align-items: start
  <article>
    <ArticleHeader>                              flex column, gap 0.75rem, margin-bottom 2rem
      <Link href="/writing">All writing</Link>   bold, 1rem
      <ArticleTitle>{title}</ArticleTitle>       h2, extends Heading: clamp(1.875rem, 1.2rem + 2vw, 2.5rem),
                                                 line-height 1.2, max-width 24ch, text-wrap: balance
      <PostMeta date minutesToRead />            "May 24, 2025"  "2 minute read"
    <ContentsSection headings />                 mobile only
    <ArticleBody dangerouslySetInnerHTML={contentHtml} />
                                                 unchanged (out of scope), except scroll-margin-top (7e)
  <ContentsSidebar headings />                   desktop only
```

**7a. Page metadata.** The post page has no `<title>` today. Call `getPageMetadata` with the post's title and its
`description` (Step 6 adds the argument).

**7b. Header.** Create `src/components/writing/article-header.tsx`. The "All writing" link uses the existing `Link` from
`@/components/styled` (a styled `next/link`, underlined).

**7c. Contents sidebar (desktop).** Create `src/components/writing/contents.tsx` and export `ContentsSidebar` from it:

- A `<nav aria-labelledby="contents-heading">` containing `<h3 id="contents-heading">Contents</h3>` (1rem, heading
  font, line-height 1.25) and an `<ol>` of links. The mock uses `<aside>`. `<nav>` is a deliberate difference (D8).
- `position: sticky; top: 1.5rem`. The sidebar only sticks because the grid has `align-items: start`. Without it, the
  sidebar stretches to the article's full height and has no room to move.
- `max-height: calc(100vh - 3rem); overflow-y: auto` (D8), so a sidebar taller than the window scrolls on its own.
  It looks the same when it fits.
- The list has a 2px `borderLine` rule down its left side. Each link has `display: block`, `mutedText` color, 0.9375rem
  text, line-height 1.4, no underline, and `padding: 0.375rem 0 0.375rem 0.875rem`. Each link also has its own
  transparent 2px left border, pulled over the list's rule with `margin-left: -2px`. On hover, links use the link
  color.
- The link for the current section gets `aria-current="true"`, which shows a link-colored left border, text color, and
  bold (see 7e). Write this rule as `&&[aria-current="true"]`, after the `&&:hover` rule. A clicked `#<id>` link counts
  as visited, so with a single `&` the rule loses to `Layout`'s `a:visited` rule and to the link's own `&&:visited`
  rule. Putting it after `&&:hover` keeps the current item in the text color on hover, as in the mock.
- The sidebar is hidden at 900px and below.

**7d. Contents section (mobile).** Export `ContentsSection` from the same file:

- A `<details>` containing a bold `<summary>Contents</summary>` and a numbered `<ol>` with `padding-left: 1.25rem`
  and 0.375rem between items. It's closed by default and needs no JavaScript.
- The items are ordinary links: link color and underlined, with `text-underline-offset: 6px`. They aren't muted like
  the sidebar links.
- `contents.background` background, 4px radius, `padding: 0.75rem 1rem`, and `margin-bottom: 2rem`. It sits between
  the header and the post body.
- The section is shown only at 900px and below.

**7e. Jumping to a heading and highlighting the current one.**

- Contents items are plain `<a href="#<id>">` links, not `next/link`. The browser handles the jump and updates the URL
  hash, so the back button and shared links work. The ids are already in the prerendered HTML, so
  `/writing/<slug>#<id>` also works on first load.
- Smooth scrolling comes from the existing `html:focus-within { scroll-behavior: smooth }` in
  `src/components/layout/styles.ts`. It only applies while something on the page has focus, so the jump is smooth in
  browsers that focus a link when it's clicked, such as Chrome. Safari doesn't, so the jump is instant there, which is
  accepted. Smooth scrolling also turns off when the visitor has `prefers-reduced-motion` set.
- To keep the heading from landing flush against the top of the window, `ArticleBody` (the post body's div) sets
  `& [id] { scroll-margin-top: 1.5rem; }`, the mock's value. It matches every link target at any heading level, so it
  doesn't change if content headings move down a level. This is the only rule that reaches into the post body. It
  changes where scrolling stops, not how anything looks.
- Add `src/hooks/useActiveHeading.ts` next to `useWindowResize.ts`, based on the "Article" block of `.mock/site.js`.
  `useActiveHeading(ids: string[]): string | undefined` returns the id of the current heading:
  - The current heading is the last one whose top is above 30% of the window height, or the first heading if none
    is. When the page is scrolled to the bottom
    (`window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1`), it's the last heading
    instead (D8). Without that, a short last section is never highlighted, even right after clicking it.
  - It updates once on mount, so a page opened at `#<id>` highlights the right item. It updates again on `scroll`
    (passive, throttled with `requestAnimationFrame`) and on `resize`, because the 30% line depends on the window
    height.
  - The effect depends on `ids.join()`, not on the `ids` array, so a new array on each render doesn't remove and
    re-add the listeners.
  - On the server it returns `undefined`, so the prerendered HTML has no highlight, and the highlight appears right
    after hydration.
  - Only the sidebar uses the hook. The mock doesn't highlight in the mobile section.

**7f. Posts without `##` headings.** Render neither Contents version, and switch the grid to a single column so an
empty sidebar column doesn't narrow the article.

**7g. Breakpoint.** At 900px and below, `ArticleLayout` becomes a single column (`minmax(0, 1fr)`), the sidebar is
hidden, and the mobile section is shown.

**Done when:**

- On desktop, the sidebar stays in view while scrolling and highlights the section being read. At the bottom of the
  page, it highlights the last section.
- In a phone-width window, the Contents box opens and closes.
- At both sizes, clicking an item scrolls to its heading with a small gap above it and updates the URL hash.
- "All writing" goes back to `/writing`.
- The browser tab shows the post's title.

## Verification

Run these after all the steps:

- [ ] `npm run build` succeeds (it includes type checking). The build output lists `/writing` and
      `/writing/mb-blog-article-one` as static pages and no `/blog` pages.
- [ ] `grep -rn '"/blog' src` finds nothing.
- [ ] Removing a front matter field makes the build fail with a message that names the file and the field. Put the
      field back afterward.
- [ ] `TZ=America/Los_Angeles npm run build` still shows May 24, 2025.
- [ ] The header nav reads WRITING at desktop width and in the mobile menu.
- [ ] `/writing` and a post page match the mock in the light and dark themes at about 1200px, 800px, and 375px wide.
- [ ] Contents works from the keyboard: Tab reaches every item, Enter jumps to its heading, and Enter or Space opens
      the mobile `<summary>`.
- [ ] With reduced motion turned on in the OS, Contents jumps happen instantly.
- [ ] Opening `/writing/mb-blog-article-one#<a heading id>` directly scrolls to that heading.

## Files

| File                                                                  | Change                                                                            |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `articles/mb-blog-article-one.mdx`                                    | Add `minutesToRead` to the front matter                                           |
| `src/data/types.ts`                                                   | Add `ArticleFrontMatter`, `ArticleSummary`, `ArticleHeading`, and `Article`       |
| `src/lib/articles.js` → `src/lib/articles.ts`                         | Typed loader with front matter checks, heading collection, and `groupByYear`      |
| `package.json`                                                        | Add `hast-util-to-string` and `unist-util-visit` to `dependencies`, and `@types/hast` to `devDependencies` |
| `src/theme/types.ts`, `light-theme.ts`, `dark-theme.ts`               | Add `mutedText` and `contents.background`                                         |
| `src/lib/metadata.tsx`                                                | Add an optional `description` argument                                            |
| `src/components/writing/post-meta.tsx`                                | New: release date and read length                                                 |
| `src/components/writing/post-list.tsx`                                | New: posts grouped by year                                                        |
| `src/components/writing/article-header.tsx`                           | New: "All writing" link, title, and meta line                                     |
| `src/components/writing/contents.tsx`                                 | New: `ContentsSidebar` and `ContentsSection`                                      |
| `src/hooks/useActiveHeading.ts`                                       | New: tracks the section being read                                                |
| `src/pages/blog/index.tsx` → `src/pages/writing/index.tsx`            | Rebuilt to match the mock                                                         |
| `src/pages/blog/articles/[id].tsx` → `src/pages/writing/[slug].tsx`   | Header, Contents, grid layout, and metadata                                       |
| `src/components/header/index.tsx`                                     | Nav item becomes "Writing", linking to `/writing`                                 |

## Follow-on work

**Article content and styling (the next piece of work):**

- **Body styling.** Style the post body following the mock's `.article-body` rules: 68ch width; 1.1875rem text with
  1.7 line height (1.125rem on phones); spacing between blocks; section headings; lists; inline code; code blocks with
  a left accent bar; and blockquotes.
- **Heading levels.** Markdown `##` renders as `<h2>`, the same level as the post title. The mock uses `<h3>` for
  sections under an `<h2>` title. Moving every content heading down one level would fix the page outline. If that
  happens, change `CONTENTS_HEADING_TAG` from Step 2 to `"h3"`. The `scroll-margin-top` rule from Step 7e already
  matches any heading.
- **Markdown or MDX (decide before styling the body).** Posts are `.mdx` files, but `src/lib/articles.ts` treats them
  as plain Markdown and renders an HTML string for `dangerouslySetInnerHTML`. That causes two problems:
  - Posts can't embed React components, such as a live Netgraph or GneissEditor demo.
  - The files aren't valid MDX. The test post's `<https://example.com>` and `<mailto:…>` autolinks and its
    `<div style="…">` block are all rejected by MDX. Editors and Prettier treat `.mdx` files as MDX, and a later move
    to real MDX would break posts written for the current pipeline.

  The choice decides how the body gets styled: CSS for the elements inside the HTML string, or MDX mapping Markdown
  elements to React components. The Contents plugin works either way, because MDX accepts rehype plugins and the
  plugin passes headings out on `file.data`. If the decision is to stay with plain Markdown, rename posts to `.md`
  and change the loader's `*.mdx` filter. Don't rename them before deciding, so the extension doesn't change twice.
- **Markdown features.** `remark-rehype` drops raw HTML by default, so the test post's `<img>` and `<div>` blocks
  don't render. Tables, task lists, and strikethrough need `remark-gfm`, which isn't installed, so they render as
  plain text. Decide whether to add `remark-gfm`, and whether to allow raw HTML (`allowDangerousHtml` plus
  `rehype-raw`). This depends on the Markdown or MDX decision.
- **The test post's content.** `mb-blog-article-one.mdx` has its own hand-written "## Table of Contents" section, which
  will show up as an item in the new Contents. So will its "## Headers" demo section and the sample `##` heading inside
  it. Clean these up when that post is revised or replaced.

**Deeper Contents levels (from D4):** a later iteration may add `###` headings as nested items under their `##`
heading. To do that, collect `<h3>` elements in the Step 2 plugin with a `depth` field on `ArticleHeading`, then
indent those items in both Contents versions.

**Parts of the mock not covered by this plan:** "Older post" / "Newer post" links, the home page's "Latest post"
section, a "Writing" link in the footer, `aria-current="page"` on the active nav item, and comment coloring in code
blocks.

## Appendix: mock measurements

Values from `.mock/styles.css`, recorded here because `.mock/` isn't committed.

**Base**

| Element                        | Values                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Headings (`h1`–`h4`)           | Heading font, line-height 1.25                                                                                          |
| Space between sections (`main`) | 3.5rem. Not used: the plan keeps the site's 2rem (Step 6)                                                              |

**Writing index**

| Element                        | Values                                                                                                                  |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Page heading                   | h2, 2rem, heading font                                                                                                  |
| Intro section (`.page-intro`)  | Flex column, gap 1rem                                                                                                   |
| Intro (`.lede`)                | 1.25rem, max-width 62ch                                                                                                 |
| Posts section (`.section`)     | Flex column, gap 1rem between year groups                                                                               |
| Year group (`.post-year`)      | Grid `6rem 1fr`, column-gap 1.5rem, padding-top 1.25rem, 1px border-top in the line color. At 650px and below: one column, row-gap 1rem |
| Year (`h3`)                    | 1.25rem, muted                                                                                                          |
| Post list (`.posts`)           | No bullets, gap 2rem                                                                                                    |
| Post (`.post`)                 | Flex column, gap 0.375rem                                                                                               |
| Post title (`h4 a`)            | 1.375rem, text color, no underline. Hover: link color and underline                                                     |
| Meta line (`.post-meta`)       | Wrapping flex row, gap 0.25rem 1rem, 1rem, muted                                                                        |
| Description                    | 1.1875rem, max-width 62ch                                                                                               |

**Post page**

| Element                                  | Values                                                                                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout (`.article-layout`)               | Grid `minmax(0,1fr) 14rem`, gap 3rem, align-items start. At 900px and below: one column                                                                             |
| Header (`.article-header`)               | Flex column, gap 0.75rem, margin-bottom 2rem                                                                                                                        |
| "All writing" link                       | Bold, 1rem                                                                                                                                                          |
| Title                                    | clamp(1.875rem, 1.2rem + 2vw, 2.5rem), line-height 1.2, max-width 24ch, text-wrap balance                                                                           |
| Sidebar (`.toc`)                         | Sticky, top 1.5rem. Flex column, gap 0.5rem, padding-top 0.5rem. Hidden at 900px and below                                                                         |
| Sidebar heading                          | 1rem                                                                                                                                                                |
| Sidebar list                             | No bullets, 2px border-left in the line color                                                                                                                       |
| Sidebar link                             | Block, margin-left -2px, padding 0.375rem 0 0.375rem 0.875rem, 2px transparent border-left, muted, 0.9375rem, line-height 1.4, no underline. Hover: link color      |
| Current sidebar link                     | Link-colored border-left, text color, bold                                                                                                                          |
| Mobile section (`.toc-mobile`)           | Hidden above 900px. margin-bottom 2rem, padding 0.75rem 1rem, surface background, 4px radius. Bold summary. List: margin 0.75rem 0 0.25rem, padding-left 1.25rem, 0.375rem between items. Links: link color, underlined, underline offset 6px |
| Heading jump offset                      | scroll-margin-top 1.5rem                                                                                                                                            |
| Current-section rule (`site.js`)         | The last heading whose top is above 30% of the window height, otherwise the first heading                                                                          |
