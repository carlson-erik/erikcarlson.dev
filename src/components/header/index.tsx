import React, { useContext, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
/* ------------------ Components ------------------ */
import { Link } from "../styled";
import Overlay from "../overlay";
import ThemeSwitch from "./theme-switch";
/* ------------------ Hooks ------------------ */
import { useWindowResize } from "@/hooks/useWindowResize";
/* ------------------ Icons ------------------ */
import profilePic from "../../images/portfolio.png";
import Github from "../../images/icons/alt/github";
import Gmail from "../../images/icons/simple/gmail";
/* ------------------ Theme ------------------ */
import { Theme } from "../../theme/types";
import { ThemeContext } from "../../theme/context";

const Interactions = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;

  @media only screen and (max-width: 650px) {
    flex-direction: row;
    justify-content: unset;
  }
`;

const Container = styled.header<{ theme: Theme }>`
  width: 100%;
  padding: 1rem 0 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderLine};
  margin-bottom: 1rem;

  @media only screen and (max-width: 650px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  @media only screen and (max-width: 400px) {
    gap: 0.25rem;
  }
`;

const StyledTitleLink = styled(Link)<{ theme: Theme }>`
  text-decoration: none;
  color: ${(props) => props.theme.colors.text} !important;

  &:hover {
    text-decoration: none !important;
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

  @media only screen and (max-width: 400px) {
    & img {
      display: none !important;
    }
  }
`;

const Title = styled.h1`
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  padding-left: 1rem;
  text-decoration: none;

  @media only screen and (max-width: 500px) {
    font-size: 2rem;
  }

  @media only screen and (max-width: 400px) {
    font-size: 2.5rem;
    padding: 0;
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

  @media only screen and (max-width: 400px) {
    padding-left: 0;
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

const NavigationLink = styled(Link)`
  font-size: 1rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.5rem;

  text-decoration: none;
  color: ${(props) => props.theme.colors.link.text} !important;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.link.text} !important;
  }
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
    text-underline-offset: 4px;
  }
`;

const ActionContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ThemeSwitchContainer = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (max-width: 650px) {
    flex-grow: 1;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-right: 0.5rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 4px;
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

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${(props) => props.theme.colors.menu.background};
`;

const MenuItem = styled.li`
  padding: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.menu.backgroundHover};
  }
`;

const MenuOverlay = styled(Overlay)`
  box-shadow: 
    /* inner glow */ inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
    /* shadow ring */ 0 0 0 1px hsla(0, 0%, 0%, 0.05),
    /* multiple soft shadows */ 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09);
`;

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { width } = useWindowResize();
  const [$showMobileMenu, set$showMobileMenu] = useState<boolean>(false);
  const [showProjectsMenu, setShowProjectsMenu] = useState<boolean>(false);
  const [buttonElement, setButtonElement] = useState<HTMLElement | null>(null);
  let MenuListComponent = (
    <MenuList>
      <MenuItem>
        <NavigationLink href="/projects/gneiss-editor">
          Gneiss Editor
        </NavigationLink>
      </MenuItem>
      <MenuItem>
        <NavigationLink href="/projects/netgraph">Netgraph</NavigationLink>
      </MenuItem>
    </MenuList>
  );
  if (width > 650 && buttonElement) {
    MenuListComponent = (
      <MenuOverlay
        referenceElement={buttonElement}
        outsideClick={() => setShowProjectsMenu(false)}
      >
        {MenuListComponent}
      </MenuOverlay>
    );
  }
  return (
    <Container theme={theme}>
      <TitleRowContainer>
        <StyledTitleLink href="/" theme={theme}>
          <TitleContainer>
            <Image
              src={profilePic}
              width={96}
              height={96}
              alt="erik carlson portfolio picture"
            />
            <Title>Erik Carlson</Title>
          </TitleContainer>
        </StyledTitleLink>
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
            onClick={() => setShowProjectsMenu(!showProjectsMenu)}
          >
            <span>Projects</span>
          </ProjectLinkButton>
          {showProjectsMenu && MenuListComponent}
          {/* <NavigationLink href="/blog">Blog</NavigationLink> */}
        </Navigation>
        <Interactions>
          <SocialContainer>
            <SocialLink
              href="mailto:erik@erikcarlson.com"
              title="Email Erik Carlson"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <Gmail type="social" />
            </SocialLink>
            <SocialLink
              href="https://github.com/carlson-erik/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#151013" }}
            >
              <Github color="#FFFFFF" type="social" />
            </SocialLink>
          </SocialContainer>
          <ThemeSwitchContainer>
            <ThemeSwitch />
          </ThemeSwitchContainer>
        </Interactions>
      </NavigationContainer>
    </Container>
  );
};

export default Header;
