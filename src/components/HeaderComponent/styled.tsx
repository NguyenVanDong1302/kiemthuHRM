import styled from "styled-components";

export const HeaderContainer = styled.div`
  & .page-header {
    height: 60px;

    & .rs-grid-container-fluid {
      height: 100%;
      & .rs-row {
        height: 100%;
      }
    }
  }

  & .more-wrapper {
    position: relative;

    & .rs-dropdown-toggle.rs-btn.rs-btn-default {
      & .rs-dropdown-toggle-caret.rs-icon {
        opacity: 0;
        visibility: hidden;
      }
    }

    & .rs-dropdown-toggle.rs-btn.rs-btn-default {
      padding: 0 !important;
    }
  }

  & .page-title {
    color: #0e223d;
    font-weight: 500;
  }

  & .more-wrapper__button {
    padding: 5px 12px;
  }

  & .more-wrapper__list-button {
    position: absolute;
    z-index: 100;
    background-color: white;
    padding: 5px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    & .more-wrapper__item-button {
      margin-bottom: 2px;
      min-width: 200px;
      text-align: left;
      background-color: white !important;
      padding: 5px 10px;
      transition: all 0.25s linear;
      &:hover {
        color: #00703c !important;
        background-color: #f5f7f9 !important;
      }
    }
    & .rs-uploader-trigger-btn {
      width: 100%;
      background-color: transparent;
      padding: 5px 10px;
      text-align: left;

      &:hover {
        color: #00703c !important;
        background-color: #f5f7f9 !important;
      }
    }
  }

  & .header-button {
    background-color: #00703c;
    font-size: 14px;
    font-weight: 400;
  }

  & .rs-input-group.rs-input-group-sm.rs-input-group-inside {
    border: 1px solid var(--border-blue) !important;
  }

  & .rs-dropdown.rs-dropdown-placement-bottom-start.rs-dropdown-open {
    & svg {
      & path {
        fill: #00703c !important;
      }
    }

    & > button {
      /* border: 1px solid #00703c !important; */
    }
  }
`;
