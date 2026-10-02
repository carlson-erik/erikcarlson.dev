# Implementation plan: Article content styling

**Status:** Decisions confirmed, ready to implement · **Date:** 2026-09-29, updated 2026-09-30 for the move to MDX
and again on 2026-09-30 after a second review · **Branch:** `blog`

## For the implementer

- **Order of work.** Work in this order, which isn't the step numbers' order: 1 → 2 → 5 and 6 together → 9 → 3 → 4 →
  7 → 8. Step 5's code imports Step 6's plugins, so neither compiles alone. The step numbers stay as they are, because
  the rest of the plan refers to them (7a, 7k, and so on).
- **Commits.** You're cleared to commit, on the `blog` branch, without pushing. Make four commits, each once its group
  passes `npm run check`: Step 1, Step 2, the pipeline and its tests (Steps 5, 6, and 9), and the styles (Steps 3, 4,
  7, and 8). Don't commit this plan file.
- **The decisions are settled.** Don't revisit D1–D15 or the differences from the mocks. If the code contradicts the
  plan (an API behaves differently, a selector doesn't match, a claimed fact is wrong), stop and ask Erik. Don't
  improvise around it.
- **Checks you can run yourself:** `npm run check`, `npm run build`, and reading the built HTML in
  `.next/server/pages/writing/`. Many "Done when" items and most of the final [Checks](#checks) need a browser
  (layout, themes, keyboard, screen reader). If you have a browser tool, use it. If you don't, or a check needs a
  device you can't use (an iPhone, Windows), don't mark it done. List it as unverified in your final report.
- **1e depends on a browser check.** Apply the header fallback only if you saw the site name wrap at 320px. If you
  couldn't check, leave it out and say so in your report.
- **7k's hook is an unverified sketch.** See the note there.

## Design source

> **Every change in this plan is based on the two mock-ups below.** They are the reference for layout, spacing, type
> sizes, colors, and behavior. If this plan and a mock disagree, check with Erik before choosing between them.

| Mock                                                                              | What it shows                                                                 |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [Style Test, Part 1](https://claude.ai/artifact/Fon8ECeNAE7QKiz9DFUnXU)          | `mb-blog-article-one.mdx`: paragraphs, headings, inline text, links, lists, checklists, quotes, footnotes, rules |
| [Style Test, Part 2](https://claude.ai/artifact/VTJb37GDqNkwMpj3j6n7Hk)          | `mb-blog-article-two.mdx`: code blocks, syntax highlighting, diffs, tables, images, figures, `<details>` |

Both mocks are private artifacts rendered from the real posts through Step 5's plugins. They were rendered before
posts moved to MDX, through `unified` with `rehype-raw`, but MDX produces the same elements and classes, so their HTML
is still what the site will produce. The exception is Markdown images, which Step 5 now unwraps (see (c) under
Differences from the mocks). The values this plan depends on are copied into
[Appendix: mock measurements](#appendix-mock-measurements), so the plan still works without the mocks.

The mocks are a temporary design for this piece of work only. Use them as the reference while implementing, but don't
link to them or mention them in code, code comments, or other project files.

These parts of the mocks aren't part of the design:

- **The review bar** (Width, Light/Dark, Notes) in the bottom-right corner is tooling for reviewing the mock.
- **The site header and footer** are simplified copies of the current ones. Only the post body is new, plus the
  heading-level change in D1, which doesn't change how the page looks.
- **Container queries.** The mocks use `@container` so the review bar can preview widths. The site uses `@media`
  queries at the same widths.
- **Placeholder images.** Artifacts can't load images from other sites, so the mocks draw the `placehold.co` images as
  inline SVGs of the same size.

## Summary

1. Finish rendering the test posts. Since the move to MDX, GitHub Flavored Markdown (tables, strikethrough,
   checklists, bare links, footnotes) and the posts' HTML (`<kbd>`, `<sup>`, `<figure>`, `<details>`, sized `<img>`)
   already render. Add build-time syntax highlighting, unwrap Markdown images, and keep the footnotes out of the
   Contents.
2. Style every element a post can contain, following the mocks. The post body stays inside the site's existing type
   and colors: Raleway body text, Montserrat headings, the blue link color, and the gray scale. The one new element is
   the code listing, which uses Source Code Pro with a four-role highlighting scheme.
3. Fix the styling bugs that break posts at different widths, including the site-wide ones in the reset and the page
   gutter.
4. Make the post title the page's `h1` (D1).
5. Stop the build on a bad post, warnings included. Check automatically that every post compiles, that the two
   test posts render what Steps 5 and 6 promise, and that bad MDX stops the build (D11–D13).

## Out of scope

- **The MDX setup itself.** `getArticle` in `src/lib/articles.ts` compiles each post with `@mdx-js/mdx`, and
  `ArticleContent` (`src/components/writing/article-content.tsx`) renders it. This plan only adds plugins and one
  option to that compile step, and moves it into its own function so it can be tested (Step 5). It doesn't map elements to React components through `articleComponents` (D8), or embed
  components in posts.
- The post header, the Contents, and the Writing index page. They were built by `docs/writing-implementation-plan.md`
  and don't change, apart from the heading level of the post title and the Contents heading (D1) and lining figures in
  the date line (Step 7i).
- Editing the test posts' text.
- Anything the mocks don't show: copy buttons on code blocks, links on headings, "Older post" / "Newer post" links.

## Current state

**The MDX pipeline.** `getArticle` in `src/lib/articles.ts` compiles the whole post file with `@mdx-js/mdx`, using
`remark-frontmatter`, `remark-gfm`, `rehype-slug`, and `rehypeCollectHeadings`, into `Article.code`. `ArticleContent`
runs that code with `runSync`, on the server when the page is built and again in the browser. Tables, strikethrough,
checklists, bare links, footnotes, and the posts' HTML, which MDX reads as JSX, all render. An MDX syntax error stops
the build with the file and line. What's missing:

- There's no syntax highlighting.
- Markdown images sit inside a `<p>`, so they get paragraph spacing.
- `rehypeCollectHeadings` collects the footnotes' hidden "Footnotes" heading, so part 1's Contents has two "Footnotes"
  items, and the second is the one highlighted at the bottom of the page.
- Warnings from plugins are ignored.

**The post body has no styles.** `ArticleBody` in `src/pages/writing/[slug].tsx` only sets `scroll-margin-top`.

- The reset removes paragraph margins, so paragraphs run together with no space between them.
- Headings inside a post use the body font at browser default sizes. `h5` and `h6` aren't in the reset, so they keep
  browser margins, and `h6` renders at 0.67em, smaller than the body text.
- Code blocks have no background, no scrolling, and use the browser's default monospace font.

**Bugs that depend on the window width.**

| Where                     | Bug                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Phones                    | A long code line (`<pre>`) overflows its column, so the whole page scrolls sideways.                                                  |
| Phones                    | Long words and long URLs in inline code can't wrap, so they also widen the page.                                                      |
| Phones                    | An `<img>` with `width` and `height` attributes is squashed. `max-width: 100%` shrinks its width, but the height attribute stays fixed. |
| Phones                    | No hyphenation is possible, because `<html>` has no `lang`.                                                                           |
| iOS, landscape            | Safari enlarges some text when the phone rotates. There's no `text-size-adjust` rule.                                                |
| 651–900px (one column)    | Post text spans the whole column, about 90 characters per line.                                                                      |
| 1001–1032px               | Content touches the window edges. The body only gets side padding at 1000px and below, and the column is 1000px wide.                |
| All widths                | The reset's `ol\n  dd` is missing a comma, so it matches `dd` inside `ol`. `ol` keeps the browser's 1em margins and `ul` doesn't.       |
| All widths                | The reset sets `text-rendering: optimizeSpeed` on `body`, which turns off kerning and ligatures in some browsers.                     |

## Decisions

Erik confirmed D1–D5 on 2026-09-29 after reviewing the mocks. D6–D9 follow from them or from checks made while
writing this plan. D10–D13 came out of a review of this plan, and Erik confirmed them on 2026-09-29 too. On
2026-09-29 Erik also chose MDX for posts, so D3, D8, D9, D11, D12, and D13 were updated on 2026-09-30 to match.
D14 and D15 came out of a second review, and Erik confirmed them on 2026-09-30. That review also changed D3, D8, D11,
and D13.

| #  | Decision                    | Choice                                                                                                                                              | Why                                                                                                                                                                                                                              |
| -- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 | Heading levels              | On post pages, the post title is the `h1` and the header's site name is a `<p>`. `##` stays `<h2>`, so `CONTENTS_HEADING_TAG` doesn't change. The Contents sidebar heading moves from `h3` to `h2`. Other pages keep the site name as their `h1`. | Erik's choice. The outline becomes h1 → h2 → … → h6 with no gap, and all six Markdown levels stay distinct. Shifting every post heading down one level instead would make `#####` and `######` both `h6`. It looks the same as today. |
| D2 | Page gutter                 | `body` has 1rem side padding at every width, so the 0.5rem side padding at 400px and below becomes 1rem. The Netgraph demo measures its container instead of computing its width from the window. | Erik's choice. It fixes the 1001–1032px bug and gives phones a 16px gutter. With one gutter value, full-width code and tables on phones need one negative margin.                                                              |
| D3 | Content pipeline            | Posts are MDX, compiled by `@mdx-js/mdx` with `remark-gfm`, which is already in place. Add `rehype-unwrap-images`, `rehype-highlight`, and the Step 6 plugins to its plugin lists, and set `tableCellAlignToStyle: false`. | Erik's choice, so posts can embed React components. GFM covers the test posts' tables, checklists, and footnotes, and MDX reads their HTML as JSX, so `rehype-raw` isn't needed. By default MDX turns table cells' `align` into an inline `style`, which the 7i selectors can't match. |
| D4 | Code font                   | Source Code Pro, from `@fontsource-variable/source-code-pro`                                                                                        | Erik's choice. It has open, distinct letterforms at small sizes, and a variable weight axis, so the semibold used for definitions is real.                                                                                          |
| D5 | New colors                  | Violet for numbers and constants in code, and yellow for `<mark>`. Every other new token uses an existing design-system value.                     | Erik's choice. Nothing in the current palette fits these two roles.                                                                                                                                                                |
| D6 | Box-drawing characters      | They come from the fallback monospace font.                                                                                                         | Neither the fontsource package nor Google Fonts serves Source Code Pro's box-drawing glyphs (U+2500–257F). The mocks have the same fallback. The stack puts Menlo and DejaVu Sans Mono first, because their characters are about 0.6em wide, close to Source Code Pro's, so part 2's file tree should line up on macOS and Linux. `ui-monospace` and `"SF Mono"` aren't in the stack, because Safari resolves `ui-monospace` to SF Mono, whose width hasn't been measured. On Windows, Consolas is about 0.05em narrower per character, so the tree can drift about 1–3px. Of the code fonts checked, Fira Code and Geist Mono are the only ones whose fontsource packages include these glyphs. |
| D7 | Numerals                    | The post body uses lining figures (`lnum`). Right-aligned table cells use Montserrat with tabular figures (`tnum`).                                 | Raleway's default figures are old-style, which read poorly in technical text such as `1.5rem`, `1994`, or `1,500`. Raleway has `lnum` but no `tnum`, and Montserrat has `tnum`. Both were checked in the Google Fonts files that the fontsource packages come from. GFM right-aligns numeric columns, so the digits line up there. |
| D8 | Where the styles live       | One component, `ArticleBody`, in `src/components/writing/article-body.tsx`, around `<ArticleContent>`. It's a styled `div` that styles the rendered elements with nested selectors, plus the D14 hook. | `articleComponents` only replaces elements made from Markdown syntax. HTML written in a post, such as `<kbd>` or `<img>`, renders as-is, so only nested selectors reach both kinds. The map is for components that posts embed. |
| D9 | Posts are trusted code      | A post's JSX and expressions compile to JavaScript that runs when the page is built and again in the browser. Nothing is sanitized.                | Erik writes every post, and pages are built ahead of time. MDX can't be sanitized, so posts from other people would need another format. `runSync` uses `new Function`, so a Content Security Policy would need `'unsafe-eval'`. |
| D10 | Image spacing              | `rehype-unwrap-images` removes the `<p>` around a paragraph that holds only an image, or only a linked image. Markdown images then become top-level blocks, like the raw-HTML ones. | Erik's choice. Without it, Markdown images get paragraph spacing, and only raw-HTML images get the image spacing in the appendix. This differs from the mocks (see (c) below). |
| D11 | Bad posts stop the build    | `compileArticle` throws on any warning from the compiler's plugins, naming the file and line, as it already does for MDX syntax errors. A `#` heading is one of those warnings. This applies in `next dev` too, where the error overlay replaces the page until the post is fixed. | Erik's choice, and the same convention as `parseFrontMatter`. Otherwise a code fence in a language `lowlight` doesn't know renders plain with no sign, and a `#` adds a second `h1` (D1). Failing in `next dev` too means a problem shows up while writing, and the dev page never differs from the built one. |
| D12 | Posts are valid MDX         | The build compiles every post, so a post that MDX rejects stops it. `npm run check` catches the same errors through the Step 9 tests.              | It follows from D3. HTML comments and `<https://…>` autolinks, which Markdown accepts, are MDX syntax errors, and the error names the line. A `style` string fails when the page renders. |
| D13 | Automated checks            | One test file checks the pipeline's output for the two test posts, and feeds inline MDX to `compileArticle` to check that bad posts stop the build. `node --test` runs it with Node 24's built-in TypeScript support. | Erik's choice. The exact checks in Steps 5 and 6 are easy to automate, and a change to the pipeline can break them without any visible sign. Inline MDX replaces checks that would otherwise mean editing a post and then undoing the edit. `tsx` can't load the test now that `articles.ts` imports `@mdx-js/mdx` (Step 9). |
| D14 | Focusable scroll boxes     | A code block or table wrapper can be focused with Tab only while its content overflows. A hook in `ArticleBody` sets `tabindex`, and on tables also `role="region"` and the label, and removes them when the box stops scrolling. | Erik's choice. If every box could be focused, part 2 would have 17 extra Tab stops, and most of those boxes don't scroll on a desktop. The page already hydrates, so the hook adds no new runtime. Chrome and Firefox make scrollable boxes focusable on their own, but Safari doesn't. |
| D15 | Quote rule color            | The quote's left rule uses a new `article.quoteRule` token, darker than `strongLine` in the light theme. | Erik's choice. Quotes keep upright text in the text color, so the rule is the only thing that marks them. `strongLine` is only 2.23:1 on white, below the 3:1 that WCAG 1.4.11 requires for graphics that carry meaning. |

**Differences from the mocks.** These are deliberate. These two don't change how the mocks look:

- (a) The mock marks finished checklist items with a class from a small plugin. This plan uses
  `li:has(> input:checked)` instead, so it needs no plugin.
- (b) Neither mock loads Source Code Pro's box-drawing glyphs either (D6), so the file tree already uses the fallback
  there.

These do change how the mocks look. They came out of a review of this plan, and Erik confirmed them on 2026-09-29:

- (c) Markdown images get the same spacing as the other blocks: 1rem below the line that introduces them, and 2rem
  after them (D10). The mocks give them paragraph spacing, 1.25rem on both sides.
- (d) In the light theme, links on a tint (the footnote highlights, `<mark>`, and `<details>`) use a darker blue,
  `article.linkOnTint`, so they reach 5:1 (Step 3).
- (e) The scrollbar thumb on code and tables is `mutedText` rather than `strongLine`, so it's easy to see on systems
  that always show scrollbars.
- (f) On phones, inline code, keys, code blocks, and links don't hyphenate.
- (g) On phones, the focus ring of an edge-to-edge code block or table is drawn inside its edges.

These came out of the second review, and Erik confirmed them on 2026-09-30:

- (h) In the mocks, every code block and table can be focused. Here only the ones that scroll can (D14). This doesn't
  change how the mocks look.
- (i) In the light theme, the quote's left rule is darker: `quoteRule` (#7C818B) rather than `strongLine` (D15).
- (j) Right-aligned table cells get Montserrat and tabular figures, as in the mocks. The mocks kept `align` because
  they went through `rehype-raw`. Under MDX, the same result needs `tableCellAlignToStyle: false` (D3).

## Implementation steps

Each step ends with a check that confirms it's done. Work through them in the order given under
[For the implementer](#for-the-implementer).

**Commits.** The `#__next` change in `styles.ts` and the `getPadding` edits in `netgraph.tsx`, which were uncommitted
when this plan was written, are already committed ("Fix Writing page width bug"). The four commits are listed under
[For the implementer](#for-the-implementer). Steps 1 and 2 change every page, so a regression on the home or project
pages then traces back to a small commit instead of the whole feature. A pipeline regression and a styling regression
also trace back to different commits.

Per `AGENTS.md`, the one Next.js API this plan touches was checked against the docs in `node_modules/next/dist/docs/`:
`02-pages/03-building-your-application/01-routing/06-custom-document.md` (`<Html lang="en">`).

### Step 1. Site-wide fixes

**1a. Page language.** In `src/pages/_document.tsx`, change `<Html>` to `<Html lang="en">`. Browsers need it to
hyphenate (Step 7), and screen readers use it to pick a voice.

**1b. Reset fixes** in `resetCSS`, `src/components/layout/styles.ts`:

- Add the missing comma so the rule reads `ul,\n  ol,\n  dd`. Numbered lists everywhere lose the browser's 1em top and
  bottom margins, which bulleted lists already lost. The project pages use `OrderList`, so check them (see the
  checks at the end of this step).
- Add `h5`, `h6`, and `pre` to the same margin reset.
- Delete `text-rendering: optimizeSpeed;` from the `body` rule.
- Add, near the top:

  ```css
  /* Stop iOS Safari enlarging text when the phone rotates */
  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
  ```

**1c. Page gutter (D2).** In `globalCSS`, same file:

```ts
/** Side padding on every page. Full-width blocks in posts pull out by the same amount. */
export const PAGE_GUTTER = "1rem";
```

```css
body {
  /* ...existing declarations... */
  padding: 0 ${PAGE_GUTTER};
}

@media only screen and (max-width: 1000px) {
  body {
    padding-top: 1rem;
  }
}
```

In the `max-width: 400px` rule, keep only `padding-top: 0.5rem`. Only the side padding changes, and top padding stays
as it is: none above 1000px, 1rem at 1000px and below, and 0.5rem at 400px and below.

**1d. Netgraph demo.** `src/pages/projects/netgraph.tsx` works out the graph's width from `window.innerWidth` and
`getPadding`, which copies the body padding values. After 1c those values are wrong, and the graph overflows its border
between 1001px and 1032px. Measure the container instead. `clientWidth` and `clientHeight` give the space inside its
1px border, so the graph fits on both axes. Today the height comes from `getBoundingClientRect()`, which includes the
border, so the graph is 2px taller than its box.

```ts
const updateGraphDimensions = () => {
  // The inside of the container's border
  setGraphWidth(graphSectionRef.clientWidth);
  setGraphHeight(graphSectionRef.clientHeight);
};
```

Delete `getPadding`, the `windowWidth` math, and the `window` `resize` listener. The `ResizeObserver` on the container
already runs on every size change, including the ones the window causes. This also removes the `<=` boundary fix
to `getPadding` from "Fix Writing page width bug", which the container measurement makes unnecessary.

**1e. Header fallback, only if it's needed.** At 400px and below, 1c widens the gutter from 0.5rem to 1rem, so the
header is 288px wide at 320px instead of 304px. The row holds a 64px avatar, 16px of padding, the site name at 1.5rem
bold, the theme switch, and the menu button, so it may not fit. If the site name wraps at 320px, add a
`max-width: 400px` rule to `Title` in `src/components/header/index.tsx` that sets `font-size: 1.25rem`. Keep the
single gutter (D2).

**Done when:**

- At 320px, 390px, 1010px, and 1280px, no page's content touches the window edges: home, experience, both project
  pages, `/writing`, and a post. At 320px, the header's site name still fits on one line, with 1e's smaller size if
  that was needed.
- The Netgraph demo fills its border without overflowing on either axis at 390px, 1010px, and 1280px, and it resizes
  with the window.
- The numbered lists on the project pages are spaced the way Erik wants. They lose their 1em top and bottom margins.

### Step 2. Heading levels (D1)

- **`Layout`** (`src/components/layout/index.tsx`) takes an optional `siteNameIsHeading?: boolean`, which defaults to
  `true`, and passes it to `Header`.
- **`Header`** (`src/components/header/index.tsx`) takes the same prop and renders the site name with
  `<Title as={siteNameIsHeading ? "h1" : "p"}>`. Add `font-weight: 700` to `Title`. Today the name is bold only
  because of the browser's `h1` style, so a `<p>` would drop it to 400. `Title` already sets its own font, size, and
  padding, and the reset clears `p` margins, so with the weight set it looks the same either way.
- **The post page** (`src/pages/writing/[slug].tsx`) renders `<Layout siteNameIsHeading={false}>`.
- **`ArticleHeader`** renders `<ArticleTitle as="h1">`. `ArticleTitle` extends `Heading`, which is an `h2`.
- **The Contents sidebar.** In `src/components/writing/contents.tsx`, `SidebarHeading` changes from `styled.h3` to
  `styled.h2`. It sets its own font and size, and the reset clears `h2` margins.

**Done when:** on a post page, the browser's accessibility tree shows one `h1` (the post title), the post's sections
as `h2`, and the Contents heading as `h2`. On every other page, the site name is still the `h1`. Nothing looks
different.

### Step 3. Theme colors (D5)

Add an `article` group to `Theme["colors"]` in `src/theme/types.ts`, `light-theme.ts`, and `dark-theme.ts`.
`css-vars.ts` generates the variables, such as `--color-article-code-string`.

| Key                          | Light                             | Dark                              | Used for                                                    |
| ---------------------------- | --------------------------------- | --------------------------------- | ----------------------------------------------------------- |
| `article.surface`            | `grays.shade200` (#EFF2F4)        | `grays.shade800` (#343740)        | Inline code, code blocks, `<details>`                       |
| `article.strongLine`         | `grays.shade500` (#A9AEB7)        | `grays.shade600` (#7C818B)        | The table header rule, `<hr>`, `<kbd>` borders              |
| `article.quoteRule`          | `grays.shade600` (#7C818B)        | `grays.shade600` (#7C818B)        | The quote's left rule (D15)                                 |
| `article.selection`          | `primary.shade100` (#D1E1FF)      | `primary.shade800` (#0F2D66)      | Selected text, the footnote you jumped to                   |
| `article.highlight`          | `"#FFF0A6"` (new)                 | `"#5A4B0C"` (new)                 | `<mark>`                                                    |
| `article.imageEdge`          | `"transparent"`                   | `grays.shade600` (#7C818B)        | The hairline around images                                  |
| `article.code.string`        | `primary.shade600` (#1A4BCC)      | `primary.shade200` (#A3C3FF)      | Strings                                                     |
| `article.code.constant`      | `"#6E3AC9"` (new)                 | `"#CDB6FF"` (new)                 | Numbers, `true`/`false`/`null`, symbols                     |
| `article.code.comment`       | `grays.shade700` (#52555F)        | `grays.shade500` (#A9AEB7)        | Comments                                                    |
| `article.code.addedLine`     | `primary.shade100` (#D1E1FF)      | `primary.shade800` (#0F2D66)      | Diff lines starting with `+`                                |
| `article.code.removedLine`   | `grays.shade300` (#E5E8EC)        | `grays.shade900` (#1E2127)        | Diff lines starting with `-`                                |
| `article.linkOnTint`         | `primary.shade600` (#1A4BCC)      | `primary.shade200` (#A3C3FF)      | Links on `selection`, `highlight`, and `surface` (7d)       |

Write the four new hex values as string literals in the theme files, the way `LightTheme` already writes `"#FFFFFF"`.
They're used in one place each, so they don't need a design-system palette.

Every text color here is at least 5:1 against the background it sits on, in both themes. That includes code tokens
on the code background and on the diff line tints, and text on `<mark>`. The one exception is a dark-theme link on
`<mark>`, at 4.83:1.

`quoteRule` is 3.91:1 on the light page background and 4.12:1 on the dark one, so it meets WCAG's 3:1 for graphics
that carry meaning (D15). `strongLine` stays lighter, because the lines that use it are decorative or have other
cues.

`linkOnTint` exists because the light link color (#1F5AFF) is only 4.02:1 on `selection`, 4.61:1 on `highlight`,
and 4.71:1 on `surface`. `linkOnTint` is 5.45:1 or better on all three. In the dark theme it's the same as `link.text`.
Dark `link.textHover` is under 4:1 on every tint, so a link on a tint keeps `linkOnTint` on hover too.

In the dark theme, `removedLine` is the page background. Code inside `<details>` sits on the page background (7i), so a
diff there loses its removed-line tint, though its gray text and `-` still mark those lines. That's accepted, because
a diff inside `<details>` is rare.

**Done when:** the new variables appear in both the `:root` and the `:root[data-theme="Dark"]` blocks of the page's
CSS.

### Step 4. Code font (D4, D6)

- Install `@fontsource-variable/source-code-pro@^5.3.0`.
- In `src/components/layout/index.tsx`, next to the other font imports:
  `import "@fontsource-variable/source-code-pro"; // Code, weights 200-900`. Only the upright styles are needed.
  Browsers download a font file only when a page uses it, so pages without code don't load it.
- In `src/theme/fonts.ts`:

  ```ts
  // Box-drawing characters (├ ─ └) aren't in the fontsource files, so they come from the
  // next font. Menlo and DejaVu Sans Mono are close to Source Code Pro's 0.6em width, so the
  // characters line up. There's no ui-monospace: Safari would use SF Mono ahead of them.
  export const codeFont = `"Source Code Pro Variable", Menlo, "DejaVu Sans Mono", Consolas, monospace`;
  ```

**Done when:** a code block in the browser's font inspector shows "Source Code Pro Variable".

### Step 5. MDX plugins (D3)

Install `rehype-unwrap-images@^1.0.0` and `rehype-highlight@^7.0.2`. They're compatible with the `unified` 11 and
`mdast-util-to-hast` 13 that `@mdx-js/mdx` 3 uses.

In `src/lib/articles.ts`, move the compile step out of `getArticle` into an exported `compileArticle`, so the Step 9
tests can compile inline MDX without a file in `articles/`. Add the plugins, the Step 6 plugins, and
`tableCellAlignToStyle: false` to its options, and check the warnings after the `try`/`catch`:

```ts
/**
 * Compiles one post's MDX, front matter included, and collects its Contents headings.
 * Bad MDX and plugin warnings throw an error naming the file and line, which stops
 * `next build` (D11).
 */
export async function compileArticle(
  articlePath: string,
  source: string,
): Promise<{ code: string; headings: ArticleHeading[] }> {
  let compiled;
  try {
    compiled = await compile(
      { path: articlePath, value: source },
      {
        outputFormat: "function-body",
        // Keeps GFM's align attribute on table cells rather than an inline style (7i)
        tableCellAlignToStyle: false,
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        remarkRehypeOptions: { footnoteBackContent }, // Step 6
        rehypePlugins: [
          rehypeUnwrapImages,
          rehypeSlug,
          rehypeCollectHeadings,
          [rehypeHighlight, { aliases: { markdown: ["mdx"] } }],
          rehypeWrapTables, // Step 6
          rehypeQuoteAttribution, // Step 6
        ],
      },
    );
  } catch (error) {
    // MDX syntax errors give the line and column, but not the file
    throw new Error(`${articlePath}:${String(error)}`, { cause: error });
  }

  // Any warning stops the build (D11). Each reads "articles/<slug>.mdx:<line>:<column>-…: <reason>".
  if (compiled.messages.length > 0) {
    throw new Error(compiled.messages.map(String).join("\n"));
  }

  return {
    code: String(compiled),
    headings: compiled.data.headings as ArticleHeading[],
  };
}
```

`getArticle` keeps reading the file and checking its front matter, then calls
`compileArticle(`articles/${slug}${ARTICLE_EXTENSION}`, file.orig.toString())` and spreads the result into the
`Article`. Move the comment about compiling the whole file, front matter included, onto the call.

- **Rehype plugins only see elements made from Markdown.** HTML written in a post reaches them as
  `mdxJsxFlowElement` and `mdxJsxTextElement` nodes, not as `element`s, so the plugins here and in Step 6 skip it.
  A table or quote written as HTML wouldn't get Step 6's wrapper, so posts write them in Markdown.
- **`rehype-unwrap-images`** (D10) removes the `<p>` around a paragraph that holds only an image, or only a linked
  image. Markdown images then become top-level blocks and get the image spacing in 7b. An HTML `<img>` on its own line
  is already a top-level block, because MDX reads it as block-level JSX. It also unwraps a paragraph that holds
  several images, which then stack with 2rem between them, so each Markdown image goes in its own paragraph. Images
  side by side need HTML or an embedded component.
- **`tableCellAlignToStyle: false`.** GFM writes a column's alignment as an `align` attribute on its cells. By default
  MDX turns it into `style="text-align:right"`, so 7i's `td[align="right"]` would match nothing. With the option off,
  cells keep `align`, which React renders and browsers apply. A selector on the `style` attribute isn't a safe
  alternative: after a client-side navigation, React sets the style through the CSSOM, and the attribute becomes
  `text-align: right;`.
- **`rehype-highlight`** adds `hljs-*` classes at build time and ships no JavaScript. It highlights only fences that
  name a language, so part 2's plain-text file tree stays plain. The alias highlights ` ```mdx ` fences as Markdown,
  which `lowlight`'s common languages don't include. A fence in a language it doesn't know isn't an error. Instead it
  adds a warning to `file.messages` (`missing-language`), which the check after `compile` turns into a build error
  (D11).
- **The warning check.** `compile` gets the whole file, front matter included, and its path, so each message already
  names the file and the file's own line. It applies in `next dev` as well (D11).
- **Footnotes.** `remark-rehype`, which MDX runs internally, puts them in
  `<section data-footnotes class="footnotes">` at the end, with a visually hidden
  `<h2 id="footnote-label" class="sr-only">Footnotes</h2>`. Their ids start with `user-content-`, and the existing
  `& [id] { scroll-margin-top }` rule covers them.
- **`rehypeCollectHeadings`** has to skip the footnotes section. Otherwise its hidden `h2` becomes the last Contents
  item, which duplicates part 1's own "Footnotes" section and becomes the highlighted item at the bottom of the page.
  It also reports an `h1` as a warning, because after D1 a `#` heading would be a second `h1` next to the post title.
  An `<h1>` written as JSX isn't an element, so it isn't caught. Import `SKIP` from `unist-util-visit`:

  ```ts
  visit(tree, "element", (node) => {
    // The footnotes' hidden "Footnotes" heading isn't a section of the post
    if (node.tagName === "section" && node.properties.dataFootnotes !== undefined) {
      return SKIP;
    }
    // The post title is the page's h1 (D1), so "#" would add a second one
    if (node.tagName === "h1") {
      file.message("Use ## for sections. The post title is already the page's h1.", node);
    }
    // ...unchanged
  });
  ```

**Done when:**

- Part 1's rendered page (`.next/server/pages/writing/mb-blog-article-one.html` after a build) contains `<del>`,
  `<kbd>`, `<mark>`, `<abbr>`, checkbox `<input>`s, and a `section.footnotes`. Part 2's contains `<table>`,
  `<figure>`, `<details>`, `hljs-` spans, and `<td align="right">`, and none of its `<img>`s is inside a `<p>`.
- Part 1's Contents has these 9 items: Paragraphs and line breaks, Headings, Emphasis and inline code, Links, Lists…,
  Blockquotes, Footnotes, Horizontal rules, Wrapping up. Part 2's has these 6: Code blocks, Tables, Images and figures,
  HTML inside a post, Special characters & escapes, Wrapping up.
- Neither post produces a warning. Step 9's tests check that a `#` heading or a fence with the language `tsxx` stops
  the build with the file name and line, so no post needs editing to test it.

### Step 6. Rehype plugins

Put these in a new file, `src/lib/article-plugins.ts`, typed `Plugin<[], Root>` like `rehypeCollectHeadings`. The
mocks were rendered with the same logic, apart from the focus attributes, which move to a hook here (D14). Set hast
property names on new elements (`className`), which MDX turns into the matching React props.

**Import it with its extension**, because the Step 9 test runs `articles.ts` in Node, which doesn't add extensions
or know `@/`:

```ts
// With ".ts", so node --test can load this file too (Step 9)
import { footnoteBackContent, rehypeQuoteAttribution, rehypeWrapTables } from "./article-plugins.ts";
```

Set `"allowImportingTsExtensions": true` in `tsconfig.json` in this step, so the typecheck accepts the extension.
`noEmit` already allows the option, and Next's bundler resolves the path.

- **`rehypeWrapTables`** wraps each `<table>` in `<div class="table-scroll">`, so a wide table scrolls inside its own
  box. The box gets its focus attributes from D14's hook, not from this plugin.
- **`rehypeQuoteAttribution`**: when a `<blockquote>`'s last element is a `<p>` whose text starts with "—" (U+2014)
  or "―" (U+2015), move that paragraph out of the quote:

  ```html
  <figure class="quote">
    <blockquote>…the quote without its last paragraph…</blockquote>
    <figcaption>— John Gruber, <a href="…">Markdown</a></figcaption>
  </figure>
  ```

  The HTML spec puts attribution outside the `<blockquote>`, and a `<figure>` with a `<figcaption>` is its recommended
  pattern. Keep the paragraph's inline children, so the link survives. Normalize the leading dash and any spaces to
  `"— "`.
- **`footnoteBackContent`** isn't a plugin, but it lives in the same file, and Step 5 passes it to `remark-rehype`
  through `remarkRehypeOptions`. It
  returns the content of each footnote's back link. When a note is referenced more than once, its later back links get
  a superscript number (↩², ↩³), as `remark-rehype`'s default does. With a plain string, every back link would be the
  same bare arrow.

  ```ts
  import type { ElementContent } from "hast";

  /**
   * The content of a footnote's back link. U+FE0E asks for the text style, so iOS doesn't
   * draw the arrow as an emoji. Later references to the same note are numbered.
   */
  export function footnoteBackContent(
    _referenceIndex: number,
    rereferenceIndex: number,
  ): ElementContent[] {
    const arrow: ElementContent = { type: "text", value: "↩︎" };
    if (rereferenceIndex === 1) {
      return [arrow];
    }
    return [
      arrow,
      {
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{ type: "text", value: String(rereferenceIndex) }],
      },
    ];
  }
  ```

**Done when:** in part 2, all three tables are inside `div.table-scroll`. In part 1, the Gruber quote renders as
`figure.quote`, and the other quotes stay plain `<blockquote>`s. `npm run typecheck` passes with the `.ts` import.

### Step 7. Article body styles

Move `ArticleBody` out of `[slug].tsx` into `src/components/writing/article-body.tsx` (D8). There it's a styled `div`
named `Body`, which keeps its `& [id] { scroll-margin-top: 1.5rem; }` rule and gets the rules below. The file's
default export, `ArticleBody`, renders `Body` with a ref and runs the 7k hook on it. It wraps `<ArticleContent>`, so
its selectors reach the elements made from Markdown and the posts' own HTML alike. Every value is in
[the appendix](#appendix-mock-measurements). In this step, "muted" means `colors.mutedText`, "line" means
`colors.borderLine`, and the other names are the Step 3 tokens.

Breakpoints are the site's own: 650px and below for phones, and 900px and below for the one-column layout, which
changes nothing here. The phone rules are in 7j.

**Link colors need no `&&`.** Body links use the same colors as `Layout`'s `a` rules and only add underline styling,
which `Layout` doesn't set. The footnote links in 7g turn their underline off, which works for the same reason. Links
on a tint (7d) do change color, and their selectors are already more specific than `Layout`'s `a:visited` and
`a:hover`.

**7a. Text and measure.**

```css
font-size: 1.1875rem;
line-height: 1.7;
font-variant-numeric: lining-nums; /* D7 */
font-kerning: normal;
overflow-wrap: break-word; /* Long words break rather than widen the page */

& p { text-wrap: pretty; }

/* Prose keeps about 70 characters per line. Code and tables may use the whole column. */
& > * { max-width: min(100%, 40rem); }
& > :is(pre, .table-scroll) { max-width: none; }

& ::selection { background: selection; }
```

**7b. Vertical rhythm.** Each top-level block sets the space above itself in `--space-above`. Every rule is wrapped in
`:where()`, so they all have the same specificity and their order decides. A heading sits closer to the text it
introduces than to the text above it. A code block, table, figure, or quote sits close to the line that introduces it
("TypeScript, from this site's own types:") and further from what comes next. Images count as blocks too, whether
they're written in Markdown or HTML, because Step 5 unwraps paragraphs that hold only an image (D10). A linked image
is a top-level `a`.

```css
& > * + * { margin-top: var(--space-above, 1.25rem); }
& > :where(pre, .table-scroll, figure, details, img, a:has(> img), blockquote) { --space-above: 1rem; }
& > :where(pre, .table-scroll, figure, details, img, a:has(> img), blockquote) + * { --space-above: 2rem; }
& > :where(hr) + * { --space-above: 2.5rem; }
& > :where(hr) { --space-above: 2.5rem; }
& > :where(h2) { --space-above: 3.25rem; }
& > :where(h3) { --space-above: 2.5rem; }
& > :where(h4) { --space-above: 2rem; }
& > :where(h5, h6) { --space-above: 1.75rem; }
& > :where(h2, h3, h4, h5, h6) + * { --space-above: 0.75rem; } /* last, so it wins */
& > .footnotes { --space-above: 3.5rem; }
```

**7c. Headings.** Every level uses the heading font, so `h5` and `h6` still read as headings rather than as bold text.
Selectors aren't limited to top-level elements, so headings inside quotes and `<details>` match too.

| Level | Size        | Weight | Other                                                              |
| ----- | ----------- | ------ | ------------------------------------------------------------------ |
| all   |             |        | `headingFont`, line-height 1.3, `text-wrap: balance`               |
| `h2`  | 1.625rem    | 700    | line-height 1.25, letter-spacing -0.01em                           |
| `h3`  | 1.3125rem   | 700    |                                                                    |
| `h4`  | 1.125rem    | 700    |                                                                    |
| `h5`  | 1rem        | 600    |                                                                    |
| `h6`  | 0.9375rem   | 600    | muted                                                              |

Inline code inside a heading is 0.85em.

**7d. Inline text.**

| Element                    | Style                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `strong`                   | 700                                                                                                                                    |
| `a`                        | Underline 1px, `text-underline-offset: 0.22em`. Hover: 2px underline. The color comes from `Layout`.                                   |
| `a:focus-visible`          | `outline: 2px solid link.text; outline-offset: 2px; border-radius: 2px`                                                               |
| `:not(pre) > code`         | `codeFont`, 0.875em, `line-height: 1`, `padding: 0.12em 0.32em`, `surface` background, 3px radius, `box-decoration-break: clone` (with `-webkit-`), `overflow-wrap: anywhere` |
| `kbd`                      | `codeFont`, 0.8em, `line-height: 1`, inline-block, `padding: 0.15em 0.4em`, 1px `strongLine` border with a 2px bottom border, 4px radius, `white-space: nowrap` |
| `mark`                     | `highlight` background, `text` color, `padding: 0.05em 0.15em`, 2px radius, `box-decoration-break: clone`                              |
| `abbr[title]`              | Dotted underline in muted, offset 0.22em, `cursor: help`                                                                               |
| `del`                      | Muted, `text-decoration-thickness: 0.08em`                                                                                             |
| `sub`, `sup`               | 0.72em, `line-height: 0`, `position: relative`, `vertical-align: baseline`. `sup` has `top: -0.55em` and `sub` has `bottom: -0.25em`, so neither makes its line taller. |

`line-height: 1` on inline code and keys keeps them from making their line taller, which part 1 checks for.

**Links on a tint** use `linkOnTint` in every state, hover included (Step 3). Hover still thickens the underline.
That covers links inside `<mark>` and `<details>`, links in the note you jumped to, and the reference you jumped back
to:

```css
/* More specific than Layout's "a:visited" and "a:hover", so no && is needed */
& :is(mark, details) a:any-link,
& .footnotes li:target a:any-link,
& sup > a:target {
  color: linkOnTint;
}
```

**7e. Lists.**

- `ul`, `ol`: `padding-left: 1.5rem`. Markers are muted. Numbered markers use the heading font at weight 600 and 0.9em.
- `li + li`: 0.5rem above. A nested list inside an item gets 0.5rem above too.
- Loose items (with blank lines between them) contain `<p>`s. Inside an item, a `<p>` or `<pre>` after another block
  gets 0.75rem above it. A `<pre>` inside an item gets 0.25rem below it.
- **Checklists.** `.contains-task-list` has `list-style: none`, and each `.task-list-item` is `position: relative`. The
  checkbox is drawn by CSS and doesn't look like a form control. In a tight list, the checkbox is the item's first
  child. In a loose list, `remark-rehype` puts it inside the item's first `<p>` instead, so every rule matches both
  shapes. Either way it's positioned against the `li`, so it lands where the bullet would be.

  ```css
  & .task-list-item > input,
  & .task-list-item > p:first-child > input {
    appearance: none;
    -webkit-appearance: none;
    position: absolute;
    left: -1.5rem; /* where the bullet would be */
    top: 0.42em;
    width: 0.95rem;
    height: 0.95rem;
    margin: 0;
    border: 1.5px solid muted;
    border-radius: 3px;
    opacity: 1;
  }
  /* Checked: the input itself is masked to a check mark, filled with the text color */
  & .task-list-item > input:checked,
  & .task-list-item > p:first-child > input:checked {
    border: 0;
    background: text;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2 8.5l4 4 8-9' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center / 100% no-repeat;
    mask: /* the same */;
  }
  & .task-list-item:has(> input:checked, > p:first-child > input:checked) { color: muted; }
  /* So nested open items don't inherit muted */
  & .task-list-item:not(:has(> input:checked, > p:first-child > input:checked)) { color: text; }
  ```

**7f. Quotes and rules.**

- `blockquote`: `padding-left: 1.25rem`, a 2px `quoteRule` left border (D15), and no background. The text stays upright
  and in the text color, so emphasis inside a quote still shows. A nested quote gets its own rule and indent. Blocks
  inside a quote are 1rem apart, or 0.625rem after a heading.
- `figure.quote figcaption` (Step 6): 0.75rem above it, `padding-left: calc(1.25rem + 2px)` so it lines up with the
  quote's text, 1rem, line-height 1.5, muted.
- `hr`: a short line, centered on the text column, as a pause inside a section.

  ```css
  & hr {
    width: 4rem;
    height: 2px;
    border: 0;
    background: strongLine;
    margin-left: calc((min(100%, 40rem) - 4rem) / 2);
  }
  ```

**7g. Footnotes.**

- `& > .footnotes`: 3.5rem above it (7b), `padding-top: 1.5rem`, a 1px line on top, 1rem text, line-height 1.6.
- Its list has `padding-left: 1.5rem` and 0.625rem between notes. Markers use the heading font at weight 600.
- References (`sup > a[data-footnote-ref]`): no underline, heading font, weight 600, `padding-inline: 0.12em`, with
  `[` and `]` added by `::before` and `::after`. Bracketed numbers are easier to see and tap than a bare superscript.
  Give each bracket empty alt text so screen readers don't read it aloud. Browsers that don't support the second
  declaration skip it and use the first:

  ```css
  & sup > a[data-footnote-ref]::before {
    content: "[";
    content: "[" / "";
  }
  & sup > a[data-footnote-ref]::after {
    content: "]";
    content: "]" / "";
  }
  ```
- The back link (`a.data-footnote-backref`): no underline, heading font, `margin-left: 0.2em`.
- The note you jumped to, `.footnotes li:target`, gets a `selection` background with a 0.35rem `box-shadow` spread in
  the same color, so the highlight has room around the text. The reference you jumped back to,
  `sup:has(> a:target)`, gets the same background. Both use a 2px radius. Links on both highlights use `linkOnTint`
  (7d).
- `& .sr-only`: the usual visually-hidden rule, for the footnotes' hidden heading.

**7h. Code blocks.**

```css
& pre {
  padding: 1rem 1.25rem;
  background: surface;
  border-radius: 4px;
  overflow-x: auto;
  font-family: codeFont;
  font-size: 0.9375rem;
  line-height: 1.6;
  tab-size: 2;
  scrollbar-width: thin;
  scrollbar-color: muted transparent; /* Easy to see on systems that always show scrollbars */
}
/* Wide enough for the longest line, so diff tints run the full width when scrolled */
& pre > code { display: block; width: max-content; min-width: 100%; font-size: inherit; line-height: inherit; }
& pre:focus-visible { outline: 2px solid link.text; outline-offset: 2px; }
```

There's no border, shadow, window chrome, or language label. Highlighting has four roles, and everything else, keywords
included, stays in the text color:

| Classes                                                     | Style                  |
| ----------------------------------------------------------- | ---------------------- |
| `.hljs-comment`, `.hljs-quote`, `.hljs-meta`                | `code.comment`         |
| `.hljs-string`, `.hljs-regexp`, `.hljs-link`                | `code.string`          |
| `.hljs-number`, `.hljs-literal`, `.hljs-symbol`, `.hljs-bullet` | `code.constant`    |
| `.hljs-title.function_`, `.hljs-title.class_`, `.hljs-section` | weight 600          |
| `.hljs-emphasis` / `.hljs-strong`                           | italic / 700           |

Each diff line is one span, so it's stretched to the block's full width, padding included:

```css
& .hljs-addition,
& .hljs-deletion {
  display: inline-block;
  width: calc(100% + 2.5rem);
  margin-inline: -1.25rem;
  padding-inline: 1.25rem;
}
& .hljs-addition { background: code.addedLine; }
& .hljs-deletion { background: code.removedLine; color: code.comment; }
```

A code block inside `<details>` or a list keeps its padding and radius. Only top-level blocks run edge to edge on
phones (7j).

**7i. Tables, images, figures, and details.**

- `.table-scroll`: `overflow-x: auto`, with the same thin scrollbar as code. Its focus ring matches `pre`.
- `table`: `border-collapse: collapse`, 1rem, line-height 1.5, and `width: auto`, so a small table stays only as wide
  as it needs to be.
- `th`: heading font, weight 600, 0.9375rem, `white-space: nowrap`, and a 2px `strongLine` bottom border.
  `th:not([align])` is left-aligned. GFM writes the Markdown's column alignment as `align` attributes, which the
  browser already applies.
- `th`, `td`: `padding: 0.625rem 1.25rem 0.625rem 0` with no right padding on the last cell, so the table lines up
  with the text edges. `vertical-align: top`.
- `td`: 1px line bottom border. `td code` has `white-space: nowrap`.
- `td[align="right"]`: heading font, 0.9375rem, `font-variant-numeric: tabular-nums lining-nums` (D7).
- `img`: `height: auto`, which fixes the squashed image. Also a 4px radius and `filter: drop-shadow(0 0 1px imageEdge)`.
  In the dark theme, that draws a hairline that follows the image's shape, transparent corners included, so part 2's
  dark icon stays visible. In the light theme it's transparent.
- `a:has(> img)`: `display: block; width: fit-content`. The link hugs its image, with no underline or gap, and its
  focus ring goes around the image. After Step 5 unwraps it, a linked image on its own line is a top-level block (7b).
- `figcaption`: 0.75rem above it, 1rem, line-height 1.5, muted.
- `details`: `padding: 0.875rem 1.125rem`, `surface` background, 4px radius, the same box as the mobile Contents.
  `summary` uses the heading font, weight 600, 1rem, and `cursor: pointer`. Its `::marker` is muted. Blocks inside are
  1rem apart, and the first block after an open summary is 0.875rem below it. **Code inside `<details>`** (both `pre`
  and inline code) uses the page background, or it would vanish into the box. Links inside use `linkOnTint` (7d).
- **`PostMeta`** (`src/components/writing/post-meta.tsx`): add `font-variant-numeric: lining-nums` so the date line
  matches the body's figures (D7). It changes the Writing index too.

**7j. Phones (650px and below).**

```css
@media only screen and (max-width: 650px) {
  font-size: 1.125rem;
  line-height: 1.65;
  hyphens: auto; /* Needs <html lang> (1a). Only here, where lines are short. */
  -webkit-hyphens: auto;
  /* These break with overflow-wrap instead, so they never gain a hyphen that isn't theirs */
  & :is(code, kbd, pre, a) { hyphens: manual; -webkit-hyphens: manual; }

  & h2 { font-size: 1.4375rem; }
  & h3 { font-size: 1.1875rem; }
  & > :where(h2) { --space-above: 2.75rem; }

  /* Top-level code and tables run edge to edge and scroll on their own */
  & > pre,
  & > .table-scroll {
    margin-inline: calc(-1 * ${PAGE_GUTTER});
    padding-inline: ${PAGE_GUTTER};
    max-width: none;
  }
  & > pre { border-radius: 0; }
  /* At the screen's edges, a ring outside the box would be cut off */
  & > :is(pre, .table-scroll):focus-visible { outline-offset: -2px; }
  & pre { font-size: 0.875rem; }
  & > pre .hljs-addition,
  & > pre .hljs-deletion {
    width: calc(100% + 2 * ${PAGE_GUTTER});
    margin-inline: calc(-1 * ${PAGE_GUTTER});
    padding-inline: ${PAGE_GUTTER};
  }

  /* Columns keep their natural width and the table scrolls, rather than squeezing every cell to one word */
  & table { width: max-content; min-width: 100%; }
}
```

Code and text line up on the same left edge, because the edge-to-edge blocks pad their content by the page gutter.

**7k. Focusable scroll boxes (D14).** A new hook, `useFocusableOverflow` in `src/hooks/useFocusableOverflow.ts`, next
to the site's other hooks. `ArticleBody` calls it with its ref. It watches every `pre` and `.table-scroll` inside the
body, including the ones in lists, quotes, and `<details>`, and makes a box focusable only while it scrolls sideways:

- A `pre` gets `tabindex="0"`.
- A `.table-scroll` gets `tabindex="0"`, `role="region"`, and `aria-label="Table N"`. N is its position among all of
  the post's tables, not only the ones that scroll, so a table keeps its name at every width. A region is a
  landmark, and landmarks with the same name can't be told apart in a screen reader's list of landmarks. axe flags
  them (`landmark-unique`).
- When a box stops scrolling, the hook removes those attributes again.

> **Not verified.** This sketch was written by hand during the plan review and has never been run or typechecked.
> Treat it as a starting point: while implementing, check it in a browser against the 7k behavior above and the
> keyboard checks under [Checks](#checks).

```ts
import { useEffect, type RefObject } from "react";

/**
 * Lets keyboard users reach the code blocks and tables inside `ref` that scroll
 * sideways, and only those, so boxes that fit aren't extra Tab stops. A scrolling
 * table's box is also a region named "Table N", so screen readers say what it is.
 */
export const useFocusableOverflow = (ref: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const root = ref.current;
    if (!root) {
      return;
    }
    const tables = Array.from(root.querySelectorAll<HTMLElement>(".table-scroll"));
    const boxes = [...root.querySelectorAll<HTMLElement>("pre"), ...tables];

    const update = () => {
      boxes.forEach((box) => {
        if (box.scrollWidth > box.clientWidth) {
          box.setAttribute("tabindex", "0");
        } else {
          box.removeAttribute("tabindex");
        }
      });
      tables.forEach((table, index) => {
        if (table.hasAttribute("tabindex")) {
          table.setAttribute("role", "region");
          table.setAttribute("aria-label", `Table ${index + 1}`);
        } else {
          table.removeAttribute("role");
          table.removeAttribute("aria-label");
        }
      });
    };

    // The box resizes with the window. Its content resizes when the code font loads.
    const observer = new ResizeObserver(update);
    boxes.forEach((box) => {
      observer.observe(box);
      if (box.firstElementChild) {
        observer.observe(box.firstElementChild);
      }
    });
    return () => observer.disconnect();
  }, [ref]);
};
```

The attributes are added after hydration, so the server and browser markup still match. The effect runs once per
mount, so Step 8 gives `ArticleBody` a `key` of the post's slug. Otherwise a client-side navigation from one post to
another would reuse the component and keep watching the first post's boxes.

**Done when:** both test posts match their mocks in both themes at 1280px, 1010px, 960px, 768px, 390px, and 320px, and
every "should" in the posts' own text holds. The checks below list the ones that depend on width.

### Step 8. Wire it up

In `src/pages/writing/[slug].tsx`, import `ArticleBody` from `@/components/writing/article-body` and delete the local
one. `ArticleBody` keeps wrapping `<ArticleContent code={article.code} />`, and gets `key={article.slug}` so each post
mounts its own 7k hook.

**Done when:** `npm run check` and `npm run build` pass.

### Step 9. Automated checks (D12, D13)

This step depends only on Steps 5 and 6, so it can go in straight after them.

Nothing needs installing. In `package.json`:

```json
"test": "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test src/lib/articles.test.mts",
"check": "npm run lint && npm run typecheck && npm test"
```

Node 24, the version in `engines`, runs TypeScript directly by removing the types. `node:test` and
`node:assert/strict` come with Node.

- **Not `tsx`.** `package.json` has no `"type": "module"`, so `tsx` runs `articles.ts` as CommonJS. `articles.ts`
  imports `@mdx-js/mdx`, which depends on `estree-walker`, and that can only be imported, not required, so the test
  fails to load, whether it's a `.ts` or an `.mts` file.
- **The warning flag.** Node reads `articles.ts` as an ES module because of its `import` syntax, and warns
  (`MODULE_TYPELESS_PACKAGE_JSON`) that `package.json` doesn't say so. The flag silences that warning only.
- **Imports.** Node doesn't resolve the `@/` paths or leave out file extensions, so the test imports `./articles.ts`,
  and `articles.ts` imports `./article-plugins.ts` (Step 6). That works because both only import types through `@/`,
  and Node removes those. If either ever imports a value through `@/`, or a local file without its extension, the
  test stops loading. Node also can't run TypeScript that needs compiling, such as `enum`.
- **`tsconfig.json`.** Add `"**/*.mts"` to `include`, so `npm run typecheck` covers the test. Step 6 already set
  `allowImportingTsExtensions`, so the test's `.ts` import typechecks. ESLint already lints `.mts` files.

Add `src/lib/articles.test.mts` with these tests. To see what a post renders, run its `code` the way
`ArticleContent` does, with `runSync` from `@mdx-js/mdx` and `react/jsx-runtime`, then turn the component into HTML
with `renderToStaticMarkup` from `react-dom/server`.

- **Every post compiles (D11, D12).** For each slug from `getArticleSlugs()`, `getArticle(slug)` resolves. Put the
  slug in the assertion message.
- **Part 1** (`getArticle("mb-blog-article-one")`): the 9 Contents items from Step 5, in order. The HTML contains
  `<del>`, `<kbd>`, `<mark>`, `<abbr`, checkbox inputs, `class="footnotes"`, and exactly one `<figure class="quote">`.
- **Part 2**: the 6 Contents items, in order. Three `div.table-scroll` wrappers, `hljs-` spans, `<td align="right">`,
  and no `<img>` inside a `<p>`. The `align` check keeps a future MDX upgrade from undoing
  `tableCellAlignToStyle: false` (D3) without anyone noticing. The focus attributes come from the 7k hook in the
  browser, so they aren't in this HTML.
- **Bad MDX stops the build (D11).** Call `compileArticle("articles/test.mdx", source)` with inline MDX, and assert
  that it rejects with an error naming the file and line:
  - a `#` heading, on line 3 of the source
  - a fence with the language `tsxx`
  - an MDX syntax error, such as `<!-- comment -->` (D12)
- **Loose checklists.** A checklist with blank lines between its items renders each checkbox as the first child of
  the item's first `<p>`, the second shape 7e's selectors cover.

`getArticle` calls `compileArticle`, which throws on any warning (D11), so if these tests pass, neither post has one.

**Done when:** `npm run check` runs the tests and they pass.

## Checks

Run these after all the steps:

- [ ] `npm run check` (which now runs the Step 9 tests) and `npm run build` pass.
- [ ] The browser console shows no errors or hydration warnings on either post. The compiled post runs in the browser
      too, so the page it renders there has to match the built one.
- [ ] At every width from 320px to 1280px, the page never scrolls sideways on either post:
      `document.documentElement.scrollWidth === document.documentElement.clientWidth`.
- [ ] Phones (390px and 320px):
  - [ ] The long `curl` line and the wide table scroll inside their own boxes, which run edge to edge.
  - [ ] "Pneumonoultramicroscopicsilicovolcanoconiosis" and the long inline-code URL wrap.
  - [ ] Inline code, `<kbd>`, and links never break with an added hyphen.
  - [ ] The 900×300 HTML image keeps its proportions.
  - [ ] Text never touches either edge of the screen.
- [ ] 651–900px: post text stops at about 70 characters per line, and code and tables can use the full width.
- [ ] 1001–1032px: there's a 16px gutter on both sides of every page.
- [ ] Keyboard: Tab reaches each code block and table that scrolls sideways, with a visible focus ring, and the arrow
      keys scroll it. Tab skips the ones that fit. After resizing the window, a box that starts or stops scrolling
      gains or loses its Tab stop. On phones, the ring of an edge-to-edge block shows on all four sides. Enter opens
      the `<details>`.
- [ ] Go from one post to the other with the Writing page's links, without reloading. The second post's scrolling
      boxes can be reached with Tab, and a screen reader names its scrolling tables "Table N" (7k, Step 8).
- [ ] Part 2's Markdown images sit 1rem below the line that introduces them and 2rem above the next block, the same as
      the HTML image.
- [ ] Where scrollbars always show (Windows, most Linux setups), the thumb under the long `curl` line is easy to see.
- [ ] Part 1's Contents has 9 items and part 2's has 6. There's no second "Footnotes" item, and the footnotes never
      become the highlighted item.
- [ ] At the bottom of each post, note which Contents item is highlighted. The posts expect "Wrapping up". This plan
      doesn't change `useActiveHeading`, but the footnotes add height below the last section, which can change what
      it picks. If it's wrong, fix it as a separate change.
- [ ] A footnote marker jumps to its note, the note is highlighted, and the back arrow returns to the marker. On an
      iPhone, the arrow is a plain glyph, not an emoji. In the light theme, the highlighted marker and the arrow are
      the darker `linkOnTint` blue, on hover too.
- [ ] Dark theme: the site icon in part 2 has a visible edge, and code inside `<details>` is visible.
- [ ] Checklists: checked items show a check mark and gray text, and unchecked items show an empty box. Neither looks
      like a form field. Step 9 checks the loose-list shape, which the same selectors cover.
- [ ] Light theme: the darker quote rule (D15) still looks right next to the mock. It's meant to look a little heavier.
- [ ] Footnote references: a screen reader reads the number without the brackets.
- [ ] Tables: the digits in the "Words" column line up.
- [ ] Part 2's file tree lines up on macOS, Safari included, and on Linux. On Windows, check how far it drifts (D6).
- [ ] iPhone: rotating to landscape doesn't enlarge any text.
- [ ] `TZ=America/Los_Angeles npm run build` still shows January 1, 1994 on both posts.
- [ ] Other pages at 320px, 390px, and 1010px: the header, home, experience, and project pages look right with the
      new gutter and the numbered-list margin fix, and the Netgraph demo fits its border.

## Files

| File                                           | Change                                                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| `package.json`                                 | Add `rehype-unwrap-images`, `rehype-highlight`, and `@fontsource-variable/source-code-pro`. Add a `test` script, and run it from `check` |
| `src/pages/_document.tsx`                      | `<Html lang="en">`                                                                      |
| `src/components/layout/styles.ts`              | Reset fixes, `text-size-adjust`, `PAGE_GUTTER`, and one gutter at every width           |
| `src/pages/projects/netgraph.tsx`              | Measure the demo's container (`clientWidth`, `clientHeight`) instead of using `getPadding` |
| `src/components/layout/index.tsx`              | Import the code font, and add the `siteNameIsHeading` prop                              |
| `src/components/header/index.tsx`              | The site name is a `<p>` when `siteNameIsHeading` is false, and `Title` sets its own weight. A smaller `Title` at 400px and below, only if needed (1e) |
| `src/components/writing/article-header.tsx`    | The title is an `h1`                                                                    |
| `src/components/writing/contents.tsx`          | The sidebar heading is an `h2`                                                          |
| `src/components/writing/post-meta.tsx`         | Lining figures                                                                          |
| `src/theme/types.ts`, `light-theme.ts`, `dark-theme.ts` | The `article` color group, including `linkOnTint` and `quoteRule`              |
| `src/theme/fonts.ts`                           | `codeFont`                                                                              |
| `src/lib/articles.ts`                          | `compileArticle` split out of `getArticle`, with Step 5's plugins, `tableCellAlignToStyle: false`, and a build error for any compiler warning. The heading collector skips footnotes and reports `h1`s |
| `src/lib/article-plugins.ts`                   | New: `rehypeWrapTables`, `rehypeQuoteAttribution`, and `footnoteBackContent`, imported with its `.ts` extension |
| `src/lib/articles.test.mts`                    | New: every post compiles, the two test posts render what Steps 5 and 6 promise, and bad MDX stops the build |
| `tsconfig.json`                                | Set `allowImportingTsExtensions` (Step 6), and add `"**/*.mts"` to `include` so the typecheck covers the test (Step 9) |
| `src/components/writing/article-body.tsx`      | New: every post body style, and the component that runs `useFocusableOverflow`          |
| `src/hooks/useFocusableOverflow.ts`            | New: code blocks and tables can be focused only while they scroll (D14)                 |
| `src/pages/writing/[slug].tsx`                 | Uses `ArticleBody` (keyed by slug) around `ArticleContent`, and `siteNameIsHeading={false}` |

## Follow-on work

- **Image dimensions.** Markdown images (`![alt](src)`) have no `width` or `height`, so the text below them jumps when
  they load. A rehype plugin could read local images' sizes at build time.
- **The project pages' code blocks.** `CodeContainer` in `src/components/styled.ts` still uses Courier New. It could
  switch to `codeFont`.
- **Box-drawing glyphs on Windows (D6).** If the drift is noticeable, either self-host a small subset of Source Code
  Pro's box-drawing glyphs, or switch the code font to Fira Code or Geist Mono.
- **Copy buttons on code blocks, and links on headings.** These aren't in the mocks. Each could be a React component
  mapped to `pre` or `h2` in `articleComponents`.
- **Each page's title as its `h1`.** D1 makes the post title the `h1` only on post pages. Elsewhere the site name is
  still the `h1`, and the page's own title, such as "Netgraph", is an `h2`. Make each page's title its `h1`, make the
  site name a `<p>` everywhere, and remove `siteNameIsHeading`.
- **Page weight.** Each post ships twice: as HTML, and as compiled code in the page's JSON, which `ArticleContent`
  runs in the browser. Highlighting grows part 2's compiled code from 28.5 KB to 38.1 KB. Part 2's HTML is about
  17 KB gzipped today, so this doesn't matter yet. Measure again when the first long, code-heavy post arrives. If it
  has grown too much, consider importing each post as a module at build time (`@next/mdx`), which also removes the
  runtime compile and D9's `'unsafe-eval'` note.

## Appendix: mock measurements

Values from the mocks, recorded here because the mocks are private artifacts.

**Colors.** See the Step 3 table. The existing colors are `text`, `mutedText`, `borderLine`, `link.text`,
`link.textHover`, `backgroundColor`, and `contents.background`.

**Type**

| Role            | Face                                  | Desktop                 | Phones (650px and below) |
| --------------- | ------------------------------------- | ----------------------- | ------------------------ |
| Body            | Raleway, lining figures               | 1.1875rem / 1.7         | 1.125rem / 1.65          |
| `h2`–`h6`       | Montserrat                            | See 7c                  | `h2` 1.4375rem, `h3` 1.1875rem |
| Code block      | Source Code Pro                       | 0.9375rem / 1.6         | 0.875rem / 1.6           |
| Inline code     | Source Code Pro                       | 0.875em / 1             | same                     |
| Table           | Raleway. Right-aligned cells in Montserrat, tabular | 1rem / 1.5. Header 0.9375rem | same            |
| Captions, footnotes | Raleway                           | 1rem / 1.5 (footnotes 1.6) | same                  |

**Spacing**

| Between                                              | Space      |
| ---------------------------------------------------- | ---------- |
| Paragraphs, and any blocks not listed below          | 1.25rem    |
| Above `h2` / `h3` / `h4` / `h5`–`h6`                 | 3.25rem (2.75rem on phones) / 2.5rem / 2rem / 1.75rem |
| A heading and the block after it                     | 0.75rem    |
| The lead-in line and a code block, table, figure, image, quote, or `<details>` | 1rem |
| After a code block, table, figure, image, quote, or `<details>` | 2rem |
| Around `<hr>`                                        | 2.5rem     |
| Above the footnotes                                  | 3.5rem, plus 1.5rem padding below its top line |
| List items                                           | 0.5rem     |
| Text measure                                         | 40rem (about 70 characters) |

**Boxes**

| Element          | Padding              | Background     | Radius | Border                          |
| ---------------- | -------------------- | -------------- | ------ | ------------------------------- |
| Code block       | 1rem 1.25rem         | `surface`      | 4px    | none                            |
| Inline code      | 0.12em 0.32em        | `surface`      | 3px    | none                            |
| `kbd`            | 0.15em 0.4em         | none           | 4px    | 1px `strongLine`, 2px at bottom |
| `<details>`      | 0.875rem 1.125rem    | `surface`      | 4px    | none                            |
| Quote            | 0 0 0 1.25rem        | none           | none   | 2px `quoteRule` on the left     |
| Table cell       | 0.625rem 1.25rem 0.625rem 0 | none    | none   | 1px line below; header 2px `strongLine` |
| `hr`             | 4rem × 2px, centered on the measure | `strongLine` | none | none                   |
