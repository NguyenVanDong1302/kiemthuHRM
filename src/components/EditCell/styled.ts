import styled from "styled-components";

export const EditComponentContainer = styled.div`
  & .listEdit__item {
    fill: transparent;
    font-size: 18px;
    cursor: pointer;

    &--edit {
      stroke: #4f5e71;
      fill: #4f5e71;
    }

    &--delete {
      margin-left: 10px;
      stroke: #ff0000;
    }
  }
`;
