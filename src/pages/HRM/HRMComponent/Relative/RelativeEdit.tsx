import ModalFooterComponent from "components/CustomModal/ModalFooterComponent";
import TitleComponent from "components/CustomModal/TitleComponent";
import { ShowError } from "components/Dialogs/Dialogs";
import FormValidate from "components/FormValidate/FormValidate";
import { Textarea } from "components/core";
import AppTextarea from "components/input/Textarea";
import { useLocalization } from "hooks/useLocalization";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    DatePicker,
    Input,
    Modal,
    SelectPicker,
    TagPicker,
    Uploader,
} from "rsuite";
import Mst_RelativeInfo_service from "services/Staff/Mst_RelativeInfo_service";
import Staff_LaborContract_service from "services/Staff/Staff_LaborContract_service";
import Staff_WorkExperience_service from "services/Staff/Staff_WorkExperience_service";
import { setFormValue } from "store/reducers/Training/Training_Course";
import store from "store/store";
import { dateRequiredRule } from "utils/validationRules";

type Props = {
    flag: string;
    code?: any;
    onSuccess: any;
    uuid: string;
};

type FormValue = {
    Relationship: string;
    FullName: string;
    DateOfBirth: any;
    Career: string;
};
const Staff_Edit_Experience = ({ flag, code, onSuccess, uuid }: Props) => {
    const { StaffCode } = useParams();
    const { NetworkId, OrgId } = store.getState().orgInfo;

    console.log("StaffCode", StaffCode);
    const _l = useLocalization("Staff_Experience_Edit");
    const _p = useLocalization("Placeholder");
    const formRef: any = useRef(null);
    const [flagProps, setFlagProps] = useState<string>(flag);
    const [open, setOpen] = useState(true);

    const [formValue, setFormValue] = useState({} as FormValue);
    // close modal
    const handleClose = () => {
        setOpen(false);
    };

    // body
    const listFormItem: any[] = [
        {
            label: _l("Quan hệ"),
            required: true,
            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "Relationship",
                    accepter: Input,
                    placeholder: _p("Nhập"),
                },
            ],
        },
        {
            label: _l("Họ tên"),
            required: true,
            control: [
                {
                    name: "FullName",
                    accepter: Input,

                    placeholder: "Nhập",
                },
            ],
        },
        {
            label: _l("Ngày sinh"), // Th
            required: true,
            control: [
                {
                    rule: dateRequiredRule,
                    name: "DateOfBirth",
                    placeholder: _p("Nhập sinh nhật"),
                    accepter: DatePicker,
                    className: "w-5",
                },
            ],
        },
        {
            label: _l("Nghề nghiệp"),
            control: [
                {
                    name: "Career",
                    accepter: Input,
                    placeholder: "Nhập",
                },
            ],
        },
    ];

    const body = () => {
        if (flagProps === "delete") {
            return (
                <strong className="delete-text">
                    {_l("Do you want to delete the selected items ???")}
                </strong>
            );
        } else {
            return (
                <FormValidate
                    ref={formRef}
                    formValue={formValue}
                    setFormValue={setFormValue}
                    layout="vertical"
                    listItem={listFormItem ?? []}
                />
            );
        }
    };

    useEffect(() => {
        render();
        setOpen(true);
        setFlagProps(flag);
    }, [uuid, flag]);

    // check add hay update
    const render = () => {
        if (flag === "add") {
            setFormValue({} as FormValue);
        } else {
            setFormValue(() => {
                return {
                    ...code,
                    DateOfBirth: new Date(code.DateOfBirth),
                };
            });
        }
    };

    // hàm submit data
    const handleSubmit = () => {
        if (flagProps === "delete") {
            // call api ở đây
            Mst_RelativeInfo_service.Remove({
                StaffCode,
                RelativeInfoID: code.RelativeInfoID,
                OrgID: OrgId,
            }).then((resp) => {
                if (resp.Success) {
                    toast.success("Xóa thành công");
                    handleClose();
                    // onSuccess();
                } else {
                    ShowError(resp.ErrorData);
                }
            });
        } else {
            if (!formRef.current.check || !formRef.current) {
                return;
            }
            if (!formRef.current.check()) {
                return;
            } else {
                const condition = {
                    ...formValue,
                    DateOfBirth: new Date(formValue.DateOfBirth),
                };

                if (flagProps === "add") {
                    Mst_RelativeInfo_service.Create({
                        ...condition,
                        DateOfBirth: new Date(formValue.DateOfBirth),
                        StaffCode,
                    }).then((resp) => {
                        if (resp.Success) {
                            toast.success("Create new thành công");
                            handleClose();
                            onSuccess();
                        } else {
                            ShowError(resp.ErrorData);
                        }
                    });
                }
                if (flagProps === "update") {
                    console.log("CONDITION INFO RELATIVE", condition);
                    Mst_RelativeInfo_service.Update({
                        ...condition,
                        DateOfBirth: new Date(formValue.DateOfBirth),
                    }).then((resp) => {
                        if (resp.Success) {
                            toast.success("Update thành công");
                            handleClose();
                            onSuccess();
                        } else {
                            ShowError(resp.ErrorData);
                        }
                    });
                }
            }
        }
    };
    return (
        <>
            <Modal
                backdrop="static"
                className="modal-container"
                open={open}
                onClose={handleClose}
                size={"md"}
            >
                <TitleComponent flag={flagProps} text={_l("Staff_Experience")} />
                <Modal.Body>{body()}</Modal.Body>
                <ModalFooterComponent
                    onDelete={() => {
                        handleSubmit();
                    }}
                    onAdd={() => {
                        handleSubmit();
                    }}
                    onUpdate={() => {
                        handleSubmit();
                    }}
                    flag={flagProps}
                    onChangeToUpdate={() => { }}
                    onClose={handleClose}
                />
            </Modal>
        </>
    );
};

export default Staff_Edit_Experience;