import { ThemeProvider } from "@/theme/context";
import Head from "next/head";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
/* ------------------ Utils ------------------ */
import { getSortedPostsData } from "../../../lib/posts";

export async function getStaticProps() {
  const allPosts = getSortedPostsData();
  return {
    props: {
      allPosts,
    },
  };
}

export default function BlogPage({ allPosts }: { allPosts: any }) {
  return (
    <>
      <Head>
        <title>Blog | Erik Carlson</title>
      </Head>
      <ThemeProvider>
        <Layout>
          <h2>Blog</h2>
          {allPosts.map((post: any) => {
            return <div key={post.id}>{post.title}</div>;
          })}
        </Layout>
      </ThemeProvider>
    </>
  );
}
