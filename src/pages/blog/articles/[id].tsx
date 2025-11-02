import Layout from "@/components/layout";
import { Heading } from "@/components/styled";
import { getAllArticleIDs, getArticleData } from "@/lib/articles";
import styled from "styled-components";

const Header = styled.div`
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

const Date = styled.div`
  font-style: italic;
`;

export async function getStaticPaths() {
  const paths = getAllArticleIDs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const articleData = await getArticleData(params.id);
  return {
    props: {
      articleData,
    },
  };
}

export default function Post({ articleData }: { articleData: any }) {
  return (
    <Layout>
      <Header>
        <Heading>{articleData.title}</Heading>
        <Date>{articleData.date}</Date>
      </Header>
      <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
    </Layout>
  );
}
