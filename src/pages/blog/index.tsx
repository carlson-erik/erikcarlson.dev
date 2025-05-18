import styled from "styled-components";
import Head from "next/head";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
/* ------------------ Theme ------------------ */
import { ThemeProvider } from "@/theme/context";
/* ------------------ Utils ------------------ */
import { getSortedArticles } from "../../lib/articles";
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

const Title = styled.h2``;
const ArticleList = styled.ul`
  list-style: none;
  padding: 0;
`;
const ArticleEntry = styled.li`
  padding: 0 0 0.5rem 0;
`;

export default function BlogPage({ allArticles }: { allArticles: any }) {
  return (
    <>
      <Head>{getPageMetadata("Blog")}</Head>
      <ThemeProvider>
        <Layout>
          <Container>
            <Title>Blog</Title>
            <ArticleList>
              {allArticles.map((article: any) => {
                return (
                  <ArticleEntry key={article.id}>{article.title}</ArticleEntry>
                );
              })}
            </ArticleList>
          </Container>
        </Layout>
      </ThemeProvider>
    </>
  );
}
