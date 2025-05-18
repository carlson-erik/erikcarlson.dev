import styled from "styled-components";
import Link from "next/link";

const Heading = styled.h2`
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  margin-block: 0;
  padding-bottom: 0.5rem;
`;

const Subheading = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  margin-block: 0;
  padding-bottom: 0.5rem;
`;

const StyledLink = styled(Link)<{ hasIcon?: boolean }>`
  ${(props) =>
    props.hasIcon
      ? `
        display:flex;
        align-items: center;
        & svg {
          margin-right: 0.25rem;
        }
      `
      : ""}
`;

const Paragraph = styled.p`
  font-family: "Raleway", sans-serif;
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

export { Heading, Subheading, StyledLink as Link, Paragraph };
