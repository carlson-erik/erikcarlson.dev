"use client";
import PageLayout from "@/components/page-layout";
import { ThemeProvider } from "@/theme/context";

export default function BlogPage() {
  return (
    <ThemeProvider>
      <PageLayout>Blog page</PageLayout>
    </ThemeProvider>
  );
}
