import type { Plugin } from "unified";
import { toString } from "hast-util-to-string";
import { SKIP, visit } from "unist-util-visit";
/* ------------------ Types ------------------ */
import type { Element, ElementContent, Root, Text } from "hast";

/**
 * Wraps each <table> in <div class="table-scroll">, so a wide table scrolls inside
 * its own box instead of widening the page. useFocusableOverflow makes the box
 * focusable while it scrolls.
 */
export const rehypeWrapTables: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "table" || !parent || index === undefined) {
      return;
    }
    const wrapper: Element = {
      type: "element",
      tagName: "div",
      properties: { className: ["table-scroll"] },
      children: [node],
    };
    parent.children[index] = wrapper;
    // Tables don't nest, so there's nothing inside to wrap
    return SKIP;
  });
};

/** An attribution paragraph starts with an em dash (U+2014) or a horizontal bar (U+2015). */
const attributionPattern = /^\s*[—―]\s*/;

/** The last element child, skipping the whitespace text between elements. */
function lastElementChild(node: Element): Element | undefined {
  for (let i = node.children.length - 1; i >= 0; i -= 1) {
    const child = node.children[i];
    if (child.type === "element") {
      return child;
    }
    if (child.type !== "text" || child.value.trim() !== "") {
      return undefined;
    }
  }
  return undefined;
}

/**
 * Moves a quote's attribution out of the <blockquote>. When the quote's last
 * paragraph starts with "—" or "―", the quote becomes
 * <figure class="quote"><blockquote>…</blockquote><figcaption>— …</figcaption></figure>,
 * the pattern the HTML spec recommends. The paragraph's inline content, links
 * included, moves into the caption.
 */
export const rehypeQuoteAttribution: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "blockquote" || !parent || index === undefined) {
      return;
    }
    const last = lastElementChild(node);
    if (
      !last ||
      last.tagName !== "p" ||
      !attributionPattern.test(toString(last))
    ) {
      return;
    }

    // Normalize the leading dash and spaces to "— "
    const children = [...last.children];
    const first = children[0];
    if (first?.type !== "text") {
      return;
    }
    const rest = first.value.replace(attributionPattern, "");
    const lead: Text = { type: "text", value: `— ${rest}` };
    children[0] = lead;

    // Drop the paragraph and any whitespace after it from the quote
    const lastIndex = node.children.indexOf(last);
    node.children = node.children.slice(0, lastIndex);

    const figure: Element = {
      type: "element",
      tagName: "figure",
      properties: { className: ["quote"] },
      children: [
        node,
        {
          type: "element",
          tagName: "figcaption",
          properties: {},
          children,
        },
      ],
    };
    // visit goes on into the quote's children, so nested quotes get the same treatment
    parent.children[index] = figure;
  });
};

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
