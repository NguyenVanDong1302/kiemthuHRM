import { useLocalization } from "hooks/useLocalization";
import { FC, memo, MouseEventHandler, ReactNode } from "react";
import { Button, Modal, Stack } from "rsuite";

type Props = {
  flag: string;
  onClose: MouseEventHandler;
  onUpdate?: MouseEventHandler;
  onAdd?: MouseEventHandler;
  onDelete?: MouseEventHandler;
  onChangeToUpdate?: MouseEventHandler;
  labelCustom?: string;
  onCustom?: MouseEventHandler;
  customFooter?: ReactNode;
};

const ModalFooterComponent: FC<Props> = ({
  flag,
  onClose,
  onUpdate,
  onAdd,
  onDelete,
  onChangeToUpdate,
  labelCustom,
  customFooter,
  onCustom,
}: Props) => {
  const _l = useLocalization("Button");
  let current = <></>;

  switch (flag) {
    case "add": {
      current = (
        <Button
          onClick={onAdd ? onAdd : () => {}}
          appearance="primary"
          color="green"
        >
          {_l("Add")}
        </Button>
      );
      break;
    }
    case "detail": {
      current = onChangeToUpdate ? (
        <Button onClick={onChangeToUpdate} appearance="primary" color="green">
          {_l("edit")}
        </Button>
      ) : (
        <></>
      );
      break;
    }
    case "update": {
      current = (
        <Button
          onClick={onUpdate ? onUpdate : () => {}}
          appearance="primary"
          color="green"
        >
          {_l("save")}
        </Button>
      );
      break;
    }
    case "delete": {
      current = (
        <Button
          onClick={onDelete ? onDelete : () => {}}
          appearance="primary"
          color="green"
        >
          {_l("delete")}
        </Button>
      );
      break;
    }
    case "custom": {
      current = (
        <Button
          onClick={onCustom ? onCustom : () => {}}
          appearance="primary"
          color="green"
        >
          {_l(`${labelCustom ? labelCustom : ""}`)}
        </Button>
      );
    }
    default:
      break;
  }

  return (
    <Modal.Footer>
      <Stack className="modal-footer-component" justifyContent="space-between">
        <Stack.Item>{customFooter}</Stack.Item>
        <Stack spacing={10}>
          {current}
          <Button appearance="default" onClick={onClose}>
            {_l("Close")}
          </Button>
        </Stack>
      </Stack>
    </Modal.Footer>
  );
};

export default memo(ModalFooterComponent);
