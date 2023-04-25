import { useLocalization } from "hooks/useLocalization";
import { memo } from "react";
import { Modal } from "rsuite";

type Props = {
  flag: string;
  text: string;
};

function TitleComponent({ flag, text }: Props) {
  const _title = useLocalization("TitleComponent");
  let label = "";
  switch (flag) {
    case "add":
      label = _title("Add");
      break;
    case "update":
      label = _title("Update");
      break;
    case "detail":
      label = _title("Detail");
      break;
    case "delete":
      label = _title("Delete");
      break;
    default:
      label = "";
      break;
  }

  return (
    <Modal.Header>
      <Modal.Title>
        {_title(`${label} `)}
        {text}
      </Modal.Title>
    </Modal.Header>
  );
}

export default memo(TitleComponent);
