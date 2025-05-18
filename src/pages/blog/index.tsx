import styled from "styled-components";
import Head from "next/head";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
/* ------------------ Theme ------------------ */
import { ThemeProvider } from "@/theme/context";
/* ------------------ Utils ------------------ */
import { getSortedArticles } from "../../lib/articles";
import { getPageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Heading, Subheading } from "@/components/styled";

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
      <ThemeProvider>
        <Layout>
          <Container>
            <Heading>Blog</Heading>
            <Introduction>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Introduction>
            <Subheading>Articles</Subheading>
            <ArticleList>
              {allArticles.map((article: any) => {
                return (
                  <ArticleEntry key={article.id}>
                    <ArticleTitle href={`/blog/articles/${article.id}`}>
                      {article.title}
                    </ArticleTitle>
                  </ArticleEntry>
                );
              })}
            </ArticleList>
          </Container>
        </Layout>
      </ThemeProvider>
    </>
  );
}
