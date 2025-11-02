import React from "react";
import styled, { createGlobalStyle } from "styled-components";
/* ------------------ Components ------------------ */
import Header from "../header";
/* ------------------ Theme ------------------ */
import { ThemeProvider } from "../../theme/context";
/* ------------------ Font ------------------ */
import "@fontsource-variable/raleway"; // Supports weights 100-900
/* ------------------ Global CSS Styles ------------------ */
import { globalCSS, resetCSS } from "./styles";

const Container = styled.div`
  padding: 0 2rem 0 2rem;
  width: 100%;
  max-width: 1000px;
  padding-bottom: 4rem;

  @media only screen and (max-width: 650px) {
    padding-right: 0;
    padding-left: 0;
    padding-bottom: 2rem;
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
${globalCSS}
  body {
    background-color: ${(props) => props.theme.colors.backgroundColor};
    color: ${(props) => props.theme.colors.text};
  }
  ${resetCSS}
`;

const MainContent = styled.main`
  width: 100%;
`;

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Container>
        <Header />
        <MainContent>{children}</MainContent>
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
