import { ThemeProvider } from "@/theme/context";
import Head from "next/head";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
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

export default function BlogPage({ allArticles }: { allArticles: any }) {
  return (
    <>
      <Head>{getPageMetadata("Blog")}</Head>
      <ThemeProvider>
        <Layout>
          <h2>Blog</h2>
          {allArticles.map((article: any) => {
            return <div key={article.id}>{article.title}</div>;
          })}
        </Layout>
      </ThemeProvider>
    </>
  );
}
