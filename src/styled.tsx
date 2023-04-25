import styled from "styled-components";
export const ContainerWrapper = styled.div`
  & .rs-picker-search {
    width: 100% !important;
    & .rs-picker-search-input {
      width: 100% !important;
      & input {
        width: 100% !important;
        max-width: none !important;
      }
    }
  }

  & .text-blue {
    color: #298ef2;
    text-decoration: underline;
  }

  & .label:hover .rs-checkbox-wrapper .rs-checkbox-inner:before {
    border-color: var(--primary) !important;
  }

  & .wrapper-container {
    width: 100%;
  }

  & .disable-table-sort {
    display: none !important;
  }

  & .table-show-detail {
    cursor: pointer !important;
    transition: all 0.25s linear !important;
    &:hover {
      color: #00703c !important;
      text-decoration: underline !important;
    }
  }

  & .rs-dropdown.rs-dropdown-placement-bottom-end .rs-btn {
    background-color: transparent !important;
    border: none;
  }

  & .nav-pills.nav-sidebar {
    & .nav-link {
      transition: all 0.25s linear;
      padding-left: 13px;
      color: #0e223d;
      &.active {
        background-color: #eaf9f2;
        color: var(--rs-btn-primary-bg) !important;
        font-weight: 600;
      }
      &:hover {
        background-color: #f5f7f9;
        color: var(--rs-btn-primary-bg) !important;
      }
    }
  }

  & .header-container {
    & > .nav-link {
      padding-left: 2px !important;
    }

    & .navbar-nav {
      & .nav-link {
        word-break: break-all;
        color: #0e223d !important;
        &.active {
          color: #00703c !important;
        }
        font-weight: 500;
        transition: all 0.25s linear;
        &:hover {
          color: #00703c !important;
        }
      }
    }
  }

  & .page-sidebar.rs-sidebar.rs-sidebar-collapse {
    transition: all 0.25s linear;
  }

  & .divider {
    margin: 0 -5px !important;
    height: 8px;
    background-color: #f5f7f9 !important;
  }

  & .filterContainer {
    color: #5f7d95 !important;
  }

  & .rs-row .rs-col {
    /* padding-left: 10px !important;
    padding-right: 10px !important; */
  }

  & .header-breadcrumb {
    & .rs-stack .list-button {
      & > .rs-stack {
        padding-top: 20px !important;
      }

      & .rs-stack {
        padding-top: 0px !important;
      }
    }
  }

  & .rs-header {
    & .rs-stack {
      padding-top: 10px;
    }
  }

  & .rs-breadcrumb {
    & .rs-breadcrumb-item {
      color: #0e223d;
    }

    & .rs-breadcrumb-separator {
      padding-left: 25px;
      padding-right: 15px;
    }

    font-size: 14px;
    & .rs-breadcrumb-item:first-child {
      color: #5f7d95;
    }
  }
`;
