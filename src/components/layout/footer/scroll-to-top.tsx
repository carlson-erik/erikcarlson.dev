import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
/* ------------------ Icons ------------------ */
import DoubleUp from "@/images/icons/double-up";
/* ------------------ Theme ------------------ */
import { ThemeContext } from "@/theme/context";
/* ------------------ Styled Components ------------------ */
const IconWrapper = styled.div<{ $isScrolled: boolean }>`
  display: none;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.scrollToTop.iconBackground};
  padding: 0.5rem;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.scrollToTop.iconBackgroundHover};
  }

  @media only screen and (max-width: 650px) {
    display: ${(props) => (props.$isScrolled ? "flex" : "none")};
    position: fixed;
    bottom: 16px;
    right: 16px;
  }
`;

const ScrollToTop = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    function handleScroll() {
      // Show element after ANY scroll, or set a threshold like > 20px
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleScrollToTop = () => {
    if (isScrolled) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <IconWrapper onClick={handleScrollToTop} $isScrolled={isScrolled}>
      <DoubleUp color={theme.colors.text} />
    </IconWrapper>
  );
};
export default ScrollToTop;
