import { confirmAlert } from "react-confirm-alert"; // Import
import { Modal, Button } from "rsuite";

export default function Popup({
  size,
  body,
  title,
  footer,
  custom,
}: {
  size: any;
  body: any;
  title: any;
  footer: any;
  custom: any;
}) {
  confirmAlert({
    customUI: ({ onClose }) => {
      return custom ? (
        <>{custom(onClose)}</>
      ) : (
        <Modal
          role="alertdialog"
          backdrop="static"
          open={true}
          onClose={onClose}
          size={size}
        >
          {title ? (
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
          ) : (
            <></>
          )}
          {body ? <Modal.Body> {body(onClose)} </Modal.Body> : <></>}

          {footer ? <Modal.Footer> {footer(onClose)} </Modal.Footer> : <></>}
        </Modal>
      );
    },
  });
}
