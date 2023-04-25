import { confirmAlert } from "react-confirm-alert"; // Import
import { Modal, Button } from "rsuite";

export default function Error(error: any, localizer?: any) {
  const _l = (str:any) => {
    return localizer ? localizer(str) : str;
  };

  console.log(error);

  const title = _l("An error occurred");

  const ErrorContent = function () {
    if (
      error !== undefined &&
      error !== null &&
      error.FieldError !== undefined &&
      error.FieldError !== null &&
      error.FieldError.length > 0
    ) {
      let fieldErrors = error.FieldError;
      return (
        <>
          <div className="error-content">
            {fieldErrors.map((fieldError:any, index:number) => {
              var fName = fieldError.FName;
              var fVal = fieldError.FVal;
              if (fName === "c_K_DT_SysInfo") {
                fVal = "";
                return (
                  <div key={index}>
                    {fName}: {fVal}
                  </div>
                );
              } else if (fName === "c_K_DT_SysError") {
                fVal = "";
                return (
                  <div key={index}>
                    <span>
                      ------------------------------------------------------------------------
                    </span>
                    <div>
                      {fName}: {fVal}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    {fName}: {fVal}
                  </div>
                );
              }
            })}
          </div>
        </>
      );
    }
    return <></>;
  };

  confirmAlert({
    customUI: ({ onClose }) => {
      if (error) {
        return (
          <Modal
            backdrop="static"
            role="alertdialog"
            open={true}
            onClose={onClose}
          >
            <Modal.Header>
              <Modal.Title>
                <i className="fas fa-exclamation-triangle mr-2 text-red"></i>{" "}
                {title}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>
                ErrorCode: <strong>{error.ErrorCode}</strong>
              </p>
              <p>
                ErrorMessage: <strong>{error.ErrorMessage}</strong>
              </p>
              {ErrorContent()}
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  onClose();
                }}
                appearance="primary"
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        );
      }
    },
  });
}
