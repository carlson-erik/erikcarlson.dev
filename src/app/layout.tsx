import type { Metadata } from "next";
/* ------------------ Fonts ------------------ */
import "@fontsource-variable/raleway"; // Supports weights 100-900
/* ------------------ Global CSS Styles ------------------ */
import "../styles/global.css";
import "../styles/reset.css";
/* ------------------ Components & Utils ------------------ */
import StyledComponentsRegistry from "../lib/registry";

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
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
