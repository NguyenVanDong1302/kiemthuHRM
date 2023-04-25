import { Button } from "rsuite";
import styled from "styled-components";

const ButtonCustomize = styled(Button)`
  border-radius: 2px;
`;

export type Button = typeof ButtonCustomize;
export default ButtonCustomize as Button;
