import React, { useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import { runSync } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";

/**
 * The components a post can use by name, such as <Netgraph />. Posts can't import
 * anything, because they're compiled apart from the site's code, so a component
 * must be added here first. A key that names an HTML element, such as "a" or
 * "pre", replaces that element everywhere in every post.
 */
const articleComponents: MDXComponents = {};

export interface ArticleContentProps {
  /** Article.code, the post's body as compiled by getArticle(). */
  code: string;
}

/** A post's body. Renders the same markup on the server and in the browser. */
export default function ArticleContent({ code }: ArticleContentProps) {
  const { default: Content } = useMemo(() => runSync(code, runtime), [code]);
  return <Content components={articleComponents} />;
}
