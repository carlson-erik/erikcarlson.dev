import styled from "styled-components";
import Head from "next/head";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import ArticleBody from "@/components/writing/article-body";
import ArticleContent from "@/components/writing/article-content";
import ArticleHeader from "@/components/writing/article-header";
import { ContentsSection, ContentsSidebar } from "@/components/writing/contents";
/* ------------------ Metadata ------------------ */
import { getPageMetadata } from "@/lib/metadata";
/* ------------------ Data ------------------ */
import { getArticle, getArticleSlugs } from "@/lib/articles";
/* ------------------ Types ------------------ */
import type { Article } from "@/data/types";

export const getStaticPaths = (async () => {
  return {
    paths: getArticleSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const article = await getArticle(params!.slug);
  return { props: { article } };
}) satisfies GetStaticProps<{ article: Article }, { slug: string }>;

// A post without Contents gets one column, so an empty sidebar column doesn't narrow it
const ArticleLayout = styled.div<{ $hasContents: boolean }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$hasContents ? "minmax(0, 1fr) 14rem" : "minmax(0, 1fr)"};
  gap: 3rem;
  /* Lets the sidebar stick instead of stretching to the article's height */
  align-items: start;

  @media only screen and (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export default function ArticlePage({
  article,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const hasContents = article.headings.length > 0;
  return (
    <>
      <Head>{getPageMetadata(article.title, article.description)}</Head>
      <Layout siteNameIsHeading={false}>
        <ArticleLayout $hasContents={hasContents}>
          <article>
            <ArticleHeader
              title={article.title}
              date={article.date}
              minutesToRead={article.minutesToRead}
            />
            {hasContents && <ContentsSection headings={article.headings} />}
            {/* Keyed so each post mounts its own useFocusableOverflow */}
            <ArticleBody key={article.slug}>
              <ArticleContent code={article.code} />
            </ArticleBody>
          </article>
          {hasContents && <ContentsSidebar headings={article.headings} />}
        </ArticleLayout>
      </Layout>
    </>
  );
}
