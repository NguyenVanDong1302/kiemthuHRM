import { ShowError } from 'components/Dialogs/Dialogs';
import FormValidate from 'components/FormValidate/FormValidate';
import { Textarea } from 'components/input/Textarea';

import { useLocalization } from 'hooks/useLocalization';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, DatePicker, Modal } from 'rsuite'
import staff_service from 'services/Staff/staff_service';
import store from 'store/store';
import { convertDate } from 'utils/date';
import { requiredRule } from 'utils/validationRules';
import { v4 as uuid } from 'uuid'

function HistStaffModal({ uuid, flag }: { uuid: any, flag: any }) {
    const [open, setOpen] = useState(false)
    const [flagProps, setFlagProps] = useState<string>(flag);
    const formRef: any = useRef(null);
    const [formValue, setFormValue] = useState({});
    const { StaffCode } = useParams()
    const { OrgId, NetworkId } = store.getState().orgInfo
    const handleClose = () => {
        setOpen(false)
    }
    const nav = useNavigate();

    const _l = useLocalization('')
    const handleSubmit = async () => {
        const condition = {
            StaffCode: StaffCode,
            ...formValue
        }
        const listStaffRemove = {
            StaffCode: StaffCode,
            OrgId
        }
        if (flagProps === 'delete') {
            staff_service.remove(
                { ...listStaffRemove }
            ).then((resp: any) => {
                if (resp.Success) {
                    toast.success(_l("Xoá thành công"));
                    // onSuccess();
                    nav(`/${NetworkId}/HRM`)
                } else {
                    ShowError(resp.ErrorData);  
                }
            })
        }
        if (flagProps === 'inactive') {
            staff_service.addInactiveStaff(
                { ...condition }
            )
                .then((resp: any) => {
                    if (resp.Success) {
                        toast.success(_l("Cho thôi việc thành công rồi nhaa"));
                        // onSuccess();
                    } else {
                        ShowError(resp.ErrorData);
                    }
                })
        } else if (flagProps === "pause") {
            staff_service.addPauseStaff(condition)
                .then((resp: any) => {
                    if (resp.Success) {
                        toast.success(_l("Nghỉ việc thành công rồi nhaa"));
                        // onSuccess();
                    } else {
                        ShowError(resp.ErrorData);
                    }
                })
        }
    }
    const listFormItem: any[] = [
        {
            label: _l(`${flagProps === "pause"
                ? _l("Ngày nghỉ việc")
                : flagProps === "inactive"
                    ? _l("Ngày tạm dừng")
                    : ""}`),
            required: true,
            Col: 15,
            control: [
                {
                    // plaintext: flagProps === "detail" ? true : false,
                    name: "HistDate",
                    placeholder: _l("Nhập"),
                    // rule: requiredRule,
                    accepter: DatePicker,
                },
            ],
        },
        {
            label: _l("Lý do"),
            required: true,
            control: [
                {
                    // plaintext: flagProps === "detail" ? true : false,
                    name: "ReasonDesc",
                    placeholder: _l("Nhập"),
                    rule: requiredRule,
                    accepter: Textarea,
                },
            ],
        },
    ]
    const body = () => {
        if (flagProps == "delete") {
            return (
                <strong className="delete-text">
                    {_l("Bạn có chắc là muốn xoá đối tượng này không ?")}
                </strong>
            )
        } else {
            return (
                <FormValidate
                    ref={formRef}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    layout="vertical"
                    listItem={listFormItem}
                />
            );
        }
    }

    useEffect(() => {
        setOpen(true)
        setFlagProps(flag);
    }, [uuid])
    return (
        <div>
            <Modal open={open} onClose={handleClose} size='md'>
                <Modal.Header>
                    <Modal.Title>Thông báo nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default HistStaffModal
