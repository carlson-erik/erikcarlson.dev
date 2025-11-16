import { useContext, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
/* ------------------ Components ------------------ */
import Layout from "@/components/layout";
import SkillList from "@/components/skill-list";
import { Heading, Paragraph, Subheading, Link } from "@/components/styled";
import { getPageMetadata } from "@/lib/metadata";
/* ------------------ Gneiss Editor ------------------ */
import { EditorElement, GneissEditor, ThemeTypes } from "gneiss-editor";
import { getEditorTheme, SHOWCASE_CONTENT } from "@/utils/editor";
/* ------------------ Theme ------------------ */
import { ThemeContext } from "@/theme/context";
import { ThemeNames } from "@/theme/types";
/* ------------------ Styled Components ------------------ */
const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DemoContainer = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 0.25rem;

  & .gneiss-editor {
    height: 500px;
    overflow-y: auto;
    border: 1px solid ${(props) => props.theme.colors.borderLine};
  }

  /** .top-toolbar above enables the following:
   *  1."sticky" top editor toolbar
   *  2. Styling bug fixes
   * */
  .top-toolbar {
    // Sticky toolbar behavior
    position: sticky;
    z-index: 100;

    // Note: Needs to be active only when the scrollbar is "sticking" to the top of the editor
    top: 0px;

    height: unset; // BUGFIX - No need for setting height.
    background-color: ${(props) =>
      props.theme.colors
        .backgroundColor}; // BUGFIX - Need to set background color
  }

  // BUGFIX - Toolbar buttons don't wrap when the editor gets smaller.
  .top-toolbar > div {
    flex-wrap: wrap;
  }
`;

function Showcase() {
  const { theme } = useContext(ThemeContext);
  const [editorContent, setEditorContent] =
    useState<EditorElement[]>(SHOWCASE_CONTENT);
  const editorTheme = getEditorTheme(theme);
  const themeType =
    theme.name === ThemeNames.LIGHT ? ThemeTypes.LIGHT : ThemeTypes.DARK;
  return (
    <>
      <Section>
        <Heading>GneissEditor</Heading>
        <Paragraph>
          GneissEditor allows developers to include modifiable Rich Text content
          in their React projects. At the core is a customizable editor
          component that allows you to easily create, save, and export your
          content. Your users create content, you save it, and our component
          handles the rest.
        </Paragraph>
      </Section>
      <Section>
        <Subheading>Showcase</Subheading>
        <DemoContainer>
          <GneissEditor
            key={`gneiss-editor-${themeType}`}
            theme={editorTheme}
            themeType={themeType}
            initialContent={editorContent}
            readOnly={false}
            onChange={(newContent) => setEditorContent(newContent)}
            toolbarMode="top"
          />
        </DemoContainer>
      </Section>
      <Section>
        <Paragraph>GneissEditor provides the following features:</Paragraph>
        <ul>
          <li>Multiple rich content options</li>
          <ul>
            <li>Text (bold, italic, underline, strikethrough)</li>
            <li>Headings (H1-H6)</li>
            <li>Links</li>
            <li>Ordered and unordered lists</li>
            <li>Blockquotes</li>
          </ul>
          <li>Easy to use theming</li>
          <li>Save and export your content</li>
          <li>Undo/redo support</li>
          <li>Full TypeScript support</li>
        </ul>
      </Section>
      <Section>
        <Subheading>Technologies Used</Subheading>
        <SkillList skills={["react", "typescript", "jest", "rollup"]} />
      </Section>
      <Section>
        <Subheading>Can I use it?</Subheading>
        <Paragraph>
          Yes! If you want to use GneissEditor in your React project, you can
          install install it using{" "}
          <Link
            href="https://www.npmjs.com/package/gneiss-editor"
            target="_blank"
            rel="noopener noreferrer"
          >
            npm
          </Link>{" "}
          or{" "}
          <Link
            href="https://yarnpkg.com/package/gneiss-editor"
            target="_blank"
            rel="noopener noreferrer"
          >
            yarn
          </Link>
          .
        </Paragraph>
      </Section>
    </>
  );
}

export default function GneissEditorPage() {
  return (
    <>
      <Head>{getPageMetadata("GneissEditor")}</Head>
      <Layout>
        <Showcase />
      </Layout>
    </>
  );
}
