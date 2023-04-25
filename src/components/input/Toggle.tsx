import { Toggle } from "rsuite";
import styled from "styled-components";

export const ToggleStyled = styled(Toggle)`
  overflow: hidden;
  &.rs-toggle.rs-toggle-checked {
    .rs-toggle-presentation::after {
      margin-left: -15px;
    }
  }
  & .rs-toggle-presentation {
    width: 32px;
    min-width: unset;
    height: 20px;

    &::after {
      width: 12px;
      height: 12px;
      top: 4px;
    }
  }

  & .rs-toggle-inner {
    height: 20px;
  }
`;
