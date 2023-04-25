import { FC } from "react";
import { FlagComponentContainer } from "./styled";

type Props = {
  FlagActive: string;
};

const FlagComponent: FC<Props> = ({ FlagActive }: Props) => {
  return (
    <FlagComponentContainer FlagActive={FlagActive}>
      {FlagActive === "1" ? "Active" : "Inactive"}
    </FlagComponentContainer>
  );
};

export default FlagComponent;
