import styled from "styled-components";

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;


  & .rs-dropdown-toggle.rs-sidenav-item {
    background-color: white !important;
    padding: 0.5rem 1rem;
    margin-bottom: 0.2rem;
    font-size: 14px;
  }

  & .rs-dropdown.rs-dropdown-placement-bottom-start {
    background-color: white;
  }

  & .rs-dropdown-menu {
    background-color: white;

    & .nav-link {
      margin-left: 15px;
    }
  }
`;
