import type { Metadata } from "next";

// Supports weights 100-900
import "@fontsource-variable/raleway";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Home | Erik Carlson",
  description: "Erik Carlson's Software Engineering Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
