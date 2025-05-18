import PageLayout from "@/components/page-layout";
import { ThemeProvider } from "@/theme/context";
import Head from "next/head";
/* ------------------ Fonts ------------------ */
import "@fontsource-variable/raleway"; // Supports weights 100-900
/* ------------------ Global CSS Styles ------------------ */
import "@/styles/global.css";
import "@/styles/reset.css";
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
        <PageLayout>
          {allPosts.map((post: any) => {
            return <div key={post.id}>{post.title}</div>;
          })}
        </PageLayout>
      </ThemeProvider>
    </>
  );
}
