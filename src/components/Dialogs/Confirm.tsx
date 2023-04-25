import { confirmAlert } from 'react-confirm-alert'; // Import
import { Modal, Button } from 'rsuite'


export default function ConfirmDialog(option:any) {

    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <Modal backdrop="static" role="alertdialog" open={true} onClose={onClose}>

                    {option.title ?
                        <Modal.Header>
                            <Modal.Title>{option.title}</Modal.Title>
                        </Modal.Header> : <></>}

                    {option.message ?
                        <Modal.Body>
                            <i className='fas fa-exclamation-triangle mr-2 text-yellow'></i>
                            {option.message}
                        </Modal.Body> : <></>}
                    <Modal.Footer>
                        {
                            option.yes ? <>
                                <Button onClick={() => {
                                    onClose();
                                    option.yes();

                                }} appearance="primary">
                                    Yes
                                </Button>
                                <Button onClick={onClose} appearance="subtle">
                                    No
                                </Button>
                            </> :
                                <Button onClick={onClose} appearance="default">
                                    Close
                                </Button>
                        }
                    </Modal.Footer>
                </Modal>
            );
        }
    });

}