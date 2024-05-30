"use client";
import PageLayout from "@/components/page-layout";
import { ThemeProvider } from "@/theme/context";

export default function HomePage() {
  return (
    <ThemeProvider>
      <PageLayout>Home Page</PageLayout>
    </ThemeProvider>
  );
}
