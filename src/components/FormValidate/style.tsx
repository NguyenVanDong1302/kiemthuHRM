import styled from "styled-components";
export const FormValidateContainer = styled.div`
  & .rs-form-vertical {
    & .form-item-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  & .rs-form-horizontal {
    & .rs-form-control-label {
      min-width: 0px !important;
      width: max-content !important;
    }
  }

  *::-webkit-scrollbar {
    height: 5px;
    background-color: #f1f1f1;
  }

  *::-webkit-scrollbar-thumb {
    background: #888;
  }

  & .rs-col {
    margin-bottom: 10px;
  }

  & .rs-editor {
  }

  & .form-validate-training-course-content-chapter {
    & .rs-form-control-label {
      min-width: 100px !important;
    }
  }

  & .form-validate.justify-content-between .rs-row {
    justify-content: space-between !important;
    display: flex;
  }

  & .training-image__item {
  }

  & .training-upload-image {
    width: 100%;

    & .rs-uploader.rs-uploader-text {
      display: flex;
      overflow: auto;

      & .rs-uploader-file-items {
        display: flex;
        margin-left: 10px;
      }
    }

    & .rs-uploader-file-item.rs-uploader-file-item-text {
      padding: 0 !important;
      width: 130px;
      height: 100px;
      border-radius: 4px;
      overflow: hidden;
      margin-left: 10px;

      & .rs-uploader-file-item-btn-remove.rs-btn-close {
        color: white;
        padding: 3px;
        border-radius: 50%;
        border: 1px solid white;
        right: 8px;
        top: 8px;
        cursor: pointer;
      }
    }

    & .rs-uploader-file-item-panel {
      width: 100%;
      height: 100%;

      & .rs-uploader-file-item-content {
        width: 100%;
        height: 100%;

        & .training-image__item {
          width: 100%;
          height: 100%;

          & img {
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
          }
        }
      }
    }
  }
`;
