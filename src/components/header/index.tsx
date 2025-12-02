import React, { useContext, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
/* ------------------ Components ------------------ */
import { Link } from "../styled";
import { NavigationLink } from "./styled";
/* ------------------ Hooks ------------------ */
import { useWindowResize } from "@/hooks/useWindowResize";
/* ------------------ Icons ------------------ */
import profilePic from "../../images/portfolio.png";
/* ------------------ Theme ------------------ */
import { Theme } from "../../theme/types";
import { ThemeContext } from "../../theme/context";
/* ------------------ Utilities ------------------ */
import { getMenuListComponent } from "./menu-list";

const Container = styled.header<{ theme: Theme }>`
  width: 100%;
  padding: 1rem 0 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderLine};
  margin-bottom: 2rem;

  @media only screen and (max-width: 650px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  @media only screen and (max-width: 400px) {
    gap: 0.25rem;
  }
`;

const TitleRowContainer = styled.div`
  width: 100%;
  display: flex;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  & img {
    border-radius: 6rem;
  }

  @media only screen and (max-width: 450px) {
    & img {
      height: 80px !important;
      width: 80px !important;
    }
  }

  @media only screen and (max-width: 375px) {
    & img {
      height: 64px !important;
      width: 64px !important;
    }
  }
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  padding-left: 1rem;
  text-decoration: none;

  @media only screen and (max-width: 500px) {
    font-size: 2.5rem;
  }
  @media only screen and (max-width: 450px) {
    font-size: 2.25rem;
  }
  @media only screen and (max-width: 375px) {
    font-size: 2rem;
  }
`;

const NavigationContainer = styled.div<{ $showMobileMenu: boolean }>`
  display: flex;
  padding-left: 7rem;

  @media only screen and (max-width: 1000px) {
    padding-left: 7rem;
  }

  @media only screen and (max-width: 650px) {
    flex-direction: column;
    width: 100%;
    padding-top: 0;
    padding-left: 7rem;
  }

  @media only screen and (max-width: 450px) {
    padding-left: 6rem;
    gap: 0.5rem;
  }

  @media only screen and (max-width: 375px) {
    padding-left: 5rem;
    gap: 0.5rem;
  }
`;

const Navigation = styled.nav<{ $showMobileMenu: boolean; theme: Theme }>`
  display: flex;
  margin: 0;
  padding: 0;

  & > a,
  & > a:visited {
    color: ${(props) => props.theme.colors.link.text};
  }

  & > a:hover {
    color: ${(props) => props.theme.colors.link.text};
  }

  ${(props) =>
    !props.$showMobileMenu
      ? `
        @media only screen and (max-width: 650px) {
          display: none;
        }
      `
      : `
        @media only screen and (max-width: 650px) {
          flex-direction: column;
          border-top: 1px solid ${props.theme.colors.borderLine};
          border-bottom: 1px solid ${props.theme.colors.borderLine};
          padding: 0.5rem 0 0.5rem 0;
          margin-bottom: 1rem;

          & > a,
          & > button {
            padding: 0.5rem 0.5rem 0.5rem 0;
          }
        }
      `}
`;

const ProjectLinkButton = styled.button`
  font-size: 1rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  color: ${(props) => props.theme.colors.link.text};

  padding: 0.5rem;
  background-color: transparent;
  border: none;
  border-radius: 4px;

  display: flex;
  align-items: flex-start;

  &:hover {
    color: ${(props) => props.theme.colors.link.text};
    text-decoration: underline;
    text-underline-offset: 6px;
  }
`;

const ActionContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MobileMenuIconContainer = styled.div`
  display: none;

  @media only screen and (max-width: 650px) {
    display: flex;
    padding: 0 0.5rem 0 0.5rem;
  }
`;

const MobileMenuIcon = styled.svg`
  height: 32px;
  width: 32px;
`;

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowResize();
  const [$showMobileMenu, set$showMobileMenu] = useState<boolean>(false);
  const [showProjectsMenu, setShowProjectsMenu] = useState<boolean>(false);
  const [buttonElement, setButtonElement] = useState<HTMLElement | null>(null);
  return (
    <Container theme={theme}>
      <TitleRowContainer>
        <TitleContainer
          onClick={() => {
            if (width < 650) {
              set$showMobileMenu(!$showMobileMenu);
            }
          }}
        >
          <Image
            src={profilePic}
            width={96}
            height={96}
            alt="erik carlson portfolio picture"
          />
          <Title>Erik Carlson</Title>
        </TitleContainer>
        <ActionContainer>
          <MobileMenuIconContainer
            onClick={() => set$showMobileMenu(!$showMobileMenu)}
          >
            <MobileMenuIcon
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-5 -7 24 24"
              width="32"
              fill={theme.colors.text}
            >
              <path d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" />
            </MobileMenuIcon>
          </MobileMenuIconContainer>
        </ActionContainer>
      </TitleRowContainer>
      <NavigationContainer $showMobileMenu={$showMobileMenu}>
        <Navigation theme={theme} $showMobileMenu={$showMobileMenu}>
          <NavigationLink href="/">Home</NavigationLink>
          <NavigationLink href="/experience">Experience</NavigationLink>
          <ProjectLinkButton
            ref={setButtonElement}
            onClick={() => {
              if (width > 650) {
                setShowProjectsMenu(!showProjectsMenu);
              }
            }}
          >
            <span>Projects</span>
          </ProjectLinkButton>
          {(showProjectsMenu || width < 650) &&
            getMenuListComponent(buttonElement, width > 650, () =>
              setShowProjectsMenu(false)
            )}
          {/* <NavigationLink href="/blog">Blog</NavigationLink> */}
        </Navigation>
      </NavigationContainer>
    </Container>
  );
};

export default Header;
