import { Button } from "rsuite";
import styled from "styled-components";

export const ButtonMore = styled(Button)`
  padding: 0 !important;
  background-color: transparent;
  border: 1px solid transparent !important;
  border-radius: 2px;
  transition: linear 0.4s;
  font-size: 24px !important;

  &:hover {
    background-color: #fff !important;
    border-color: #098850 !important;
  }

  &.rs-btn:focus,
  .rs-btn:hover {
    background-color: #fff !important;
    border-color: #098850 !important;
    color: #098850 !important;
  }
`;
