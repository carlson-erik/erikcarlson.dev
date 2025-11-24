import React from "react";
import styled, { createGlobalStyle } from "styled-components";
/* ------------------ Components ------------------ */
import Header from "../header";
import Footer from "./footer";
/* ------------------ Theme ------------------ */
import { ThemeProvider } from "../../theme/context";
/* ------------------ Font ------------------ */
import "@fontsource-variable/raleway"; // Supports weights 100-900
/* ------------------ Global CSS Styles ------------------ */
import { globalCSS, resetCSS } from "./styles";

const Container = styled.div`
  width: 100%;
  max-width: 1000px;

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
${globalCSS}
  body {
    background-color: ${(props) => props.theme.colors.backgroundColor};
    color: ${(props) => props.theme.colors.text};
  }
  ${resetCSS}
`;

const MainContent = styled.main`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media only screen and (max-width: 500px) {
    gap: 1rem;
  }
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
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Layout;
