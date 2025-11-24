import styled from "styled-components";
import { Link } from "../styled";

const NavigationLink = styled(Link)`
  font-size: 1rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.5rem;

  width: 100%;
  height: 100%;

  text-decoration: none;
  color: ${(props) => props.theme.colors.link.text} !important;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.link.text} !important;
  }
`;

export { NavigationLink };
