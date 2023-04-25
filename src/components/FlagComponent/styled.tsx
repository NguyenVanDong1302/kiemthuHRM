import styled from "styled-components";

type FlagType = {
  FlagActive: string;
};

export const FlagComponentContainer = styled.p<FlagType>`
  max-width: 117px;
  padding: 3 30px;
  width: 120px;
  color: white;
  font-size: 12px;
  display: block;
  text-align: center;
  border-radius: 2px;
  background-color: ${(props) => {
    return props.FlagActive === "1" ? "#098850" : "#E48203";
  }};
`;
