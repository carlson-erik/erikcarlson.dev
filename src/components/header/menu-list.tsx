import styled from "styled-components";
/* ------------------ Components ------------------ */
import Overlay from "../overlay";
/* ------------------ Styled Components ------------------ */
import { NavigationLink } from "./styled";

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: ${(props) => props.theme.colors.menu.background};
`;

const MenuItem = styled.li<{ $isDesktopMenu: boolean }>`
  display: flex;

  &:hover {
    background-color: ${(props) => props.theme.colors.menu.backgroundHover};
  }

  ${(props) =>
    props.$isDesktopMenu
      ? `
        & > a {
        padding: 1rem !important;
        }
      `
      : ""}
`;

const MenuOverlay = styled(Overlay)`
  box-shadow: 
    /* inner glow */ inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075),
    /* shadow ring */ 0 0 0 1px hsla(0, 0%, 0%, 0.05),
    /* multiple soft shadows */ 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09);
`;

const getMenuListComponent = (
  buttonElement: HTMLElement | null,
  isDesktopMenu: boolean,
  handleOutsideClick: () => void
) => {
  let MenuListComponent = (
    <MenuList>
      <MenuItem $isDesktopMenu={isDesktopMenu}>
        <NavigationLink href="/projects/gneiss-editor">
          Gneiss Editor
        </NavigationLink>
      </MenuItem>
      <MenuItem $isDesktopMenu={isDesktopMenu}>
        <NavigationLink href="/projects/netgraph">Netgraph</NavigationLink>
      </MenuItem>
    </MenuList>
  );

  if (isDesktopMenu && buttonElement) {
    return (
      <MenuOverlay
        referenceElement={buttonElement}
        outsideClick={handleOutsideClick}
      >
        {MenuListComponent}
      </MenuOverlay>
    );
  }

  return MenuListComponent;
};

export { getMenuListComponent };
