import React from "react";
import styled from "styled-components";
import Link from "next/link";
/* ------------------ Components ------------------ */
import { Subheading } from "../styled";
import PostMeta from "./post-meta";
/* ------------------ Theme ------------------ */
import { headingFont } from "@/theme/fonts";
/* ------------------ Types ------------------ */
import type { ArticleSummary } from "@/data/types";

/* ------------------ Styled Components ------------------ */
const Years = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const YearGroup = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
  column-gap: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid ${(props) => props.theme.colors.borderLine};

  @media only screen and (max-width: 650px) {
    grid-template-columns: 1fr;
    row-gap: 1rem;
  }
`;

const YearHeading = styled(Subheading)`
  font-size: 1.25rem;
  line-height: 1.25;
  color: ${(props) => props.theme.colors.mutedText};
`;

const Posts = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Post = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const PostTitle = styled.h4`
  font-family: ${headingFont};
  font-size: 1.375rem;
  line-height: 1.25;
`;

// Doubled class so it beats Layout's "a, a:visited" link color.
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

const PostDescription = styled.p`
  font-size: 1.1875rem;
  max-width: 62ch;
`;

export interface PostListProps {
  /** Newest year first, each with its posts newest first. */
  years: { year: number; articles: ArticleSummary[] }[];
}

/** Every post, under a heading for the year it was released. */
const PostList = ({ years }: PostListProps) => {
  return (
    <Years aria-label="Posts by year">
      {years.map(({ year, articles }) => (
        <YearGroup key={year}>
          <YearHeading>{year}</YearHeading>
          <Posts>
            {articles.map((article) => (
              <Post key={article.slug}>
                <PostTitle>
                  <PostTitleLink href={`/writing/${article.slug}`}>
                    {article.title}
                  </PostTitleLink>
                </PostTitle>
                <PostMeta
                  date={article.date}
                  minutesToRead={article.minutesToRead}
                  hideYear
                />
                <PostDescription>{article.description}</PostDescription>
              </Post>
            ))}
          </Posts>
        </YearGroup>
      ))}
    </Years>
  );
};

export default PostList;
