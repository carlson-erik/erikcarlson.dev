import styled from "styled-components";
import Head from "next/head";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import { Heading, Subheading, Link } from "@/components/styled";
/* ------------------ Metadata ------------------ */
import { getSortedArticles } from "@/lib/articles";
import { getPageMetadata } from "@/lib/metadata";

export async function getStaticProps() {
  const allArticles = getSortedArticles();
  return {
    props: {
      allArticles,
    },
  };
}

const Container = styled.div`
  width: 100%;
  padding-bottom: 1.5rem;

  &:last-child {
    padding-bottom: 0;
  }
`;

const ArticleList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ArticleEntry = styled.li`
  padding: 0 0 0.5rem 0;
`;
const ArticleTitle = styled(Link)`
  font-size: 1.25rem;
`;

const Introduction = styled.p`
  font-size: 1.25rem;
  line-height: 2rem;
  padding-bottom: 1rem;

  &:last-child {
    padding-bottom: 0;
  }
`;

export default function BlogPage({ allArticles }: { allArticles: any }) {
  return (
    <>
      <Head>{getPageMetadata("Blog")}</Head>
      <Layout>
        <Container>
          <Heading>Brainstorms & Deep Dives</Heading>
          <Introduction>
            Welcome to my blog! This is a space where I share thoughts, ideas,
            and lessons learned from my various travels. Here you'll find
            articles ranging from web development to creative projects amongst
            other technobabble. I believe in learning in public, so this blog is
            as much a record of progress as it is a place to share knowledge.
            Thanks for stopping by!
          </Introduction>
          <Subheading>Articles</Subheading>
          <ArticleList>
            {allArticles.map((article: any) => {
              return (
                <ArticleEntry key={article.id}>
                  <ArticleTitle href={`/blog/articles/${article.id}`}>
                    {article.title}
                  </ArticleTitle>
                  <div>{article.date}</div>
                </ArticleEntry>
              );
            })}
          </ArticleList>
        </Container>
      </Layout>
    </>
  );
}
