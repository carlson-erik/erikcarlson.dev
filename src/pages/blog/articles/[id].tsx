import Layout from "@/components/layout";
import { Heading } from "@/components/styled";
import { getAllArticleIDs, getArticleData } from "@/lib/articles";
import { ThemeProvider } from "@/theme/context";

export async function getStaticPaths() {
  const paths = getAllArticleIDs();
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  console.log(params);
  const articleData = await getArticleData(params.id);
  return {
    props: {
      articleData,
    },
  };
}

export default function Post({ articleData }: { articleData: any }) {
  return (
    <ThemeProvider>
      <Layout>
        <Heading>{articleData.title}</Heading>
        {articleData.date}
        <br />
        <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
      </Layout>
    </ThemeProvider>
  );
}
