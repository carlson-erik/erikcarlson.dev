import { useContext } from "react";
import styled from "styled-components";
/* ------------------ Components ------------------ */
import ThemeSwitch from "../header/theme-switch";
import { IconLink, IconLinkText, Link } from "../styled";
/* ------------------ Theme ------------------ */
import { ThemeContext } from "@/theme/context";
/* ------------------ Icons ------------------ */
import Email from "@/images/icons/simple/email";
import Github from "@/images/icons/alt/github";

const StyledFooter = styled.footer`
  width: 100%;
  text-align: center;
  padding: 1rem 0 1rem 0;
  margin-top: 2rem;

  background-color: ${(props) => props.theme.colors.footer.background};

  display: flex;
  flex-direction: row;

  height: 10rem;

  @media only screen and (max-width: 650px) {
    height: fit-content;
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  @media only screen and (max-width: 400px) {
  }
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  align-items: center;

  justify-content: center;
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Copyright = styled.div`
  font-size: 0.8rem;
  color: ${(props) => props.theme.colors.footer.text};
`;

const SiteLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 50%;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 650px) {
    display: none;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const SiteCategory = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryTitle = styled.span`
  color: ${(props) => props.theme.colors.footer.text};
  font-weight: bold;

  width: fit-content;
  height: fit-content;
`;

const SiteLink = styled(Link)`
  width: fit-content;
  height: fit-content;
  color: ${(props) => props.theme.colors.footer.link.text};

  &:hover {
    color: ${(props) => props.theme.colors.footer.link.textHover};
  }
`;

const FooterLink = styled(IconLink)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.footer.link.text};
  &:hover {
    color: ${(props) => props.theme.colors.footer.link.textHover};
    background-color: ${(props) => props.theme.colors.footer.link.iconHover};
  }
`;

const FooterLinkText = styled(IconLinkText)`
  color: ${(props) => props.theme.colors.footer.link.text};
`;

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <StyledFooter>
      <SocialContainer>
        <SocialIcons>
          <FooterLink
            href="mailto:erik@erikcarlson.dev"
            target="_blank"
            title="Email Erik Carlson"
          >
            <Email type="dev" color={theme.colors.footer.link.text} />
            <FooterLinkText>Reach out!</FooterLinkText>
          </FooterLink>
          <FooterLink
            href="https://github.com/carlson-erik"
            target="_blank"
            rel="noopener noreferrer"
            title="Erik Carlson's Github"
          >
            <Github type="dev" color={theme.colors.footer.link.text} />
            <FooterLinkText>carlson-erik</FooterLinkText>
          </FooterLink>
          <ThemeSwitch />
        </SocialIcons>
        <Copyright>
          &copy; {new Date().getFullYear()} Erik Carlson. All rights reserved.
        </Copyright>
      </SocialContainer>
      <SiteLinksContainer>
        <CategoryContainer>
          <SiteCategory>
            <CategoryTitle>Site Map</CategoryTitle>
            <SiteLink href="/">Home</SiteLink>
            <SiteLink href="/experience">Experience</SiteLink>
          </SiteCategory>
          <SiteCategory>
            <CategoryTitle>Projects</CategoryTitle>
            <SiteLink href="/projects/gneiss-editor">Gneiss Editor</SiteLink>
            <SiteLink href="/projects/netgraph">Netgraph</SiteLink>
          </SiteCategory>
        </CategoryContainer>
      </SiteLinksContainer>
    </StyledFooter>
  );
};

export default Footer;
