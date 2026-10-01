import React from "react";
import styled, { createGlobalStyle } from "styled-components";
/* ------------------ Components ------------------ */
import Header from "../header";
import Footer from "./footer";
/* ------------------ Theme ------------------ */
import { ThemeProvider } from "../../theme/context";
import { themeCssVariables } from "../../theme/css-vars";
/* ------------------ Font ------------------ */
import "@fontsource-variable/montserrat"; // Headings, weights 100-900
import "@fontsource-variable/raleway"; // Body text, weights 100-900
import "@fontsource-variable/raleway/wght-italic.css"; // Body text in italics
import "@fontsource-variable/source-code-pro"; // Code, weights 200-900
/* ------------------ Global CSS Styles ------------------ */
import { globalCSS, resetCSS } from "./styles";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;

  /* Fill the window so short pages keep the footer at the bottom of it */
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 650px) {
    padding-right: 0;
    padding-left: 0;
  }

  & a,
  & a:visited {
    color: ${(props) => props.theme.colors.link.text};
  }

  & a:hover {
    color: ${(props) => props.theme.colors.link.textHover};
  }
`;

const GlobalStyle = createGlobalStyle`
${themeCssVariables}
${globalCSS}
  body {
    background-color: ${(props) => props.theme.colors.backgroundColor};
    color: ${(props) => props.theme.colors.text};
  }
  ${resetCSS}
`;

const MainContent = styled.main`
  width: 100%;
  flex: 1 0 auto;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (max-width: 500px) {
    gap: 1rem;
  }
`;

interface LayoutProps {
  children?: React.ReactNode;
  /** False on pages whose own title is the h1, such as posts */
  siteNameIsHeading?: boolean;
}

const Layout = (props: LayoutProps) => {
  const { children, siteNameIsHeading = true } = props;
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Container>
        <Header siteNameIsHeading={siteNameIsHeading} />
        <MainContent>{children}</MainContent>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
