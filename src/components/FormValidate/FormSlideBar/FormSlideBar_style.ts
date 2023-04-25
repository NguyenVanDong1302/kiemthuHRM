import styled from "styled-components";

export const FormSlideBarContainer = styled.div`
  width: 100%;

  & .rs-sidenav-body {
    padding: 10px 0px 0px 0px !important;
    background-color: white !important;
  }

  & .rs-dropdown-menu.rs-dropdown-menu-collapse-in {
    margin-top: 15px;
  }

  &
    .form-validate.justify-content-between
    .rs-dropdown-menu.rs-dropdown-menu-collapse-in {
    justify-content: space-between !important;
    display: flex !important;
    flex-wrap: wrap !important;
  }

  & .rs-uploader-text .rs-uploader-file-item {
    width: 130px;
    height: 100px;
    padding: 0;
    position: relative;
    margin-right: 10px;
  }

  & .rs-form-vertical {
    & .form-item-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  & .rs-col {
    margin-bottom: 10px;
  }

  & .rs-sidenav-item-icon {
    position: absolute;
    right: 4%;
    z-index: 10;
  }

  /* info-edit */
  & form.info-component-item.rs-form.rs-form-vertical.rs-form-fixed-width {
    width: 100%;

    & .rs-form-group {
      width: 100%;
      display: flex;
      align-items: center;

      & .rs-form-control.rs-form-control-wrapper:first-child {
        width: 50% !important;
      }
    }
  }

  & .info-edit {
    & .form-item-container {
      & .rs-form-control-label {
        display: none;
      }

      & .info-component-item {
        width: 100%;
      }

      & .form-item-container__control {
        width: 100%;
        display: flex;
        align-items: center;
      }

      & .form-item-container__control {
        display: flex;
        width: 100%;
        justify-content: space-between;

        & .form-item-container__control {
          width: 100%;
          & .info-component-item {
            width: 100%;
            display: flex;
          }
        }
      }
    }
  }
`;
