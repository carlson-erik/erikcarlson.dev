import styled from "styled-components";
import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import PostList, { type PostListProps } from "@/components/writing/post-list";
import { Heading } from "@/components/styled";
/* ------------------ Metadata ------------------ */
import { getPageMetadata } from "@/lib/metadata";
/* ------------------ Data ------------------ */
import { getArticleSummaries, groupByYear } from "@/lib/articles";

const DESCRIPTION =
  "Erik Carlson's thoughts, ideas, and lessons learned, from web development to creative projects.";

export const getStaticProps = (async () => {
  return { props: { years: groupByYear(getArticleSummaries()) } };
}) satisfies GetStaticProps<PostListProps>;

const Introduction = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Lede = styled.p`
  font-size: 1.25rem;
  max-width: 62ch;
`;

export default function WritingPage({
  years,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>{getPageMetadata("Writing", DESCRIPTION)}</Head>
      <Layout>
        <Introduction aria-labelledby="writing-heading">
          <Heading id="writing-heading">Writing</Heading>
          <Lede>
            Welcome to my blog! This is a space where I share thoughts, ideas,
            and lessons learned from my various travels. Here you'll find
            articles ranging from web development to creative projects amongst
            other technobabble. I believe in learning in public, so this blog is
            as much a record of progress as it is a place to share knowledge.
            Thanks for stopping by!
          </Lede>
        </Introduction>
        <PostList years={years} />
      </Layout>
    </>
  );
}
