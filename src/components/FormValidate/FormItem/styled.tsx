import { device } from "contains";
import styled from "styled-components";

export const FormItemContainer = styled.div`
  & .rs-form-group {
    margin-bottom: 0px !important;
  }

  & .rs-form-control-label {
    flex: 0;
    min-width: 160px;
    margin-bottom: 5px;
    font-weight: 400 !important;

    @media ${device.laptopL} {
      min-width: 120px;
    }
  }

  & .rs-form-control.rs-form-control-wrapper {
    width: 100% !important;
    overflow-x: clip;

    & > div {
      flex: 2;
      width: 100% !important;
    }
  }

  & .form-item-container__control {
    display: flex;
    flex-wrap: wrap;
    overflow-x: clip;
    overflow-y: visible;
    flex: 2;
    & > div {
      width: 100%;
    }
    & .separate {
      height: 1px;
      display: block;
      text-align: center;
    }

    & .form-control-multiple {
      /* margin-left: 10px; */
      /* position: relative; */
    }

    & > div {
      display: flex;
      flex: 1;
    }

    & > div:first-child .separate {
      display: none;
    }

    & > div:not(:first-child) {
    }

    & > div:not(:first-child) {
      position: relative;
      & .separate {
        position: relative !important;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  & .rs-uploader-file-item-size {
    display: none;
  }

  & .rs-uploader-text {
    display: flex;
    align-items: start;

    &
      .rs-uploader-trigger-btn.rs-btn-icon.rs-btn-icon-placement-left.rs-btn.rs-btn-default {
      margin-right: 10px !important;
    }
  }

  & .rs-uploader-file-items {
    /* max-width: 205px;
    width: 205px; */
    margin-top: 0px !important;
    & .rs-uploader-file-item.rs-uploader-file-item-text {
      border-radius: 2px;
      background-color: #f6f6f6;
      box-shadow: 1px 1px 2px rgba(175, 175, 175, 0.749);
      padding: 5px 6px !important;
      margin-bottom: 10px;
    }

    & .rs-uploader-file-item-icon-wrapper {
      display: none;
    }

    & .rs-uploader-file-item-panel {
      & .list-file__item-image {
        & img {
          width: 17px;
          height: 17px;
          display: block;
          margin-right: 10px;
        }
      }
    }
    & .list-file__item {
      display: flex;
      align-items: start;
      width: 200px;
    }
    & .list-file__item-content {
      h4 {
        padding-right: 20px;
        font-size: 13px;
        line-height: 16px;
        color: #0e223d;
        max-width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }

      span {
        font-size: 12px;
        color: #858585;
      }
    }

    & .rs-btn-close .rs-icon {
      & path {
        filter: #6d6d6d;
      }
    }
  }

  & .editor-plain-text {
    & .tox-editor-header {
      display: none;
    }

    & .tox-statusbar {
      display: none;
    }

    & .tox.tox-tinymce.tox-tinymce--disabled {
    }

    & .tox.tox-tinymce.tox-tinymce--disabled {
      height: fit-content !important;
    }

    & .mce-content-body {
      /* margin: 0 !important; */
    }

    & .tox.tox-tinymce.tox-tinymce--disabled {
    }

    & .tox .tox-edit-area {
      height: max-content;

      & .tox-edit-area__iframe {
        height: max-content;
        position: relative;
        & * {
          height: max-content;
        }

        & #document {
        }
      }
    }

    & .tox-tinymce {
      border: none;
    }
  }

  & .map-department {
    flex-wrap: wrap;
  }
`;
