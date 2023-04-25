import ModalFooterComponent from 'components/CustomModal/ModalFooterComponent';
import TitleComponent from 'components/CustomModal/TitleComponent';
import FormValidate from 'components/FormValidate/FormValidate';
import { Textarea } from 'components/input/Textarea';
import useSelectListDiscipline from 'hooks/Select/useSelectListDiscipline';
import useSelectListStaff from 'hooks/Select/useSelectListStaff';
import { useLocalization } from 'hooks/useLocalization'
import React, { FC, useEffect, useRef, useState } from 'react'
import { DatePicker, Modal } from 'rsuite';
import { dateRequiredRule, requiredRule } from 'utils/validationRules'
import Staff_WorkExperience_service from 'services/Staff/Staff_WorkExperience_service'
import store from 'store/store';
import { convertDate } from 'utils/date';
import { toast } from 'react-toastify';
import { ShowError } from 'components/Dialogs/Dialogs';
import { useParams } from 'react-router-dom';

type Props = {
    flag: string;
    code?: any;
    onSuccess: Function;
    uuid: string;
};

type FormValue = {
    StaffCode?: string,
    Idx?: string,
    DateForm: Date,
    DateTo: Date,
    Company: string,
    Position: string,
    WorkExperience: string,
    LogLUBy?: string,
    LogLUDTimeUTC?: Date
};
const StaffWorkExpEdit: FC<Props> = ({
    flag,
    code,
    onSuccess,
    uuid,
}: Props) => {
    const formRef: any = useRef(null);
    const _l = useLocalization("Staff_Discipline_Edit");
    const _t = useLocalization("toast");
    const _p = useLocalization("Placeholder");
    const [data, setData] = useState(code)
    const [flagProps, setFlagProps] = useState<string>(flag);
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState({} as FormValue);
    const { StaffCode } = useParams()
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async () => {
        if (flagProps == 'delete') {
            Staff_WorkExperience_service.Remove({
                StaffCode: StaffCode,
                Idx: code.Idx,
            })
                .then((resp: any) => {
                    if (resp.Success) {
                        toast.success(_t("Xoá thành công rồi nhaa"));
                        onSuccess();
                    } else {
                        ShowError(resp.ErrorData);
                    }
                });
        } else {
            console.log(formValue);

            let condition = {
                ...formValue,
                Idx: formValue.Idx ? formValue.Idx : "0",
                DateTo: convertDate(formValue.DateTo),
                DateForm: convertDate(formValue.DateForm),
            };

            if (flagProps == 'add') {
                Staff_WorkExperience_service.Create({
                    ...condition,
                    StaffCode,
                })
                    .then((resp: any) => {
                        if (resp.Success) {
                            toast.success(_t("Thêm thành công rồi nhaa"));
                            onSuccess();
                        } else {
                            ShowError(resp.ErrorData);
                        }
                    });

            } else if (flagProps == 'update') {
                Staff_WorkExperience_service
                    .Update({
                        ...condition,
                    })
                    .then((resp: any) => {
                        if (resp.Success) {
                            toast.success(_t("Sửa được rùi đó "));
                            onSuccess();
                        } else {
                            ShowError(resp.ErrorData);
                        }
                    });
            }
        }
        setOpen(false);
    }

    useEffect(() => {
        setFlagProps(flag);
    }, [uuid]);

    const listFormItem: any[] = [
        {
            label: _l("Thời gian làm việc"), // Ngày kinh nghiệm
            required: true,
            control: [
                {
                    accepter: DatePicker,
                    plaintext: flagProps === "detail" ? true : false,
                    name: "DateTo",
                    placeholder: _p("Select Date"),
                    rule: dateRequiredRule,
                    oneTap: true,
                },
                {
                    accepter: DatePicker,
                    oneTap: true,
                    plaintext: flagProps === "detail" ? true : false,
                    name: "DateForm",
                    placeholder: _p("Select Date"),
                    rule: dateRequiredRule,
                },
            ],
        },
        {
            label: _l("Công ty"), // Danh hiệu
            required: true,
            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "Company",
                    placeholder: _p("Công ty"),
                    rule: requiredRule,
                },
            ],
        },
        {
            label: _l("Vị trí"), // Danh hiệu
            required: true,
            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "Position",
                    placeholder: _p("Nhập"),
                    rule: requiredRule,
                },
            ],
        },
        {
            label: _l("Kinh nghiệm làm việc"), // Danh hiệu
            required: true,
            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "WorkExperience",
                    placeholder: _p("Nhập"),
                    rule: requiredRule,
                    accepter: Textarea,
                },
            ],
        },
    ]

    const render = () => {
        if (flag === "add") {
            setFormValue({} as FormValue);
        } else {
            setFormValue(() => {
                return {
                    ...code,
                    DateTo: new Date(code.DateTo),
                    DateForm: new Date(code.DateForm),
                };
            })
        }
    };

    const body = () => {
        if (flagProps == "delete") {
            return (
                <strong className="delete-text">
                    {_t("Bạn có chắc là muốn xoá đối tượng này không ?")}
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
        render();
        setOpen(true);
        return () => {
            setFormValue({} as FormValue);
        };
    }, [uuid, flag]);

    const handleChangeView = () => {
        setFlagProps("update");
    };

    return <>
        <Modal
            backdrop="static"
            className="modal-container"
            open={open}
            onClose={handleClose}
            size={flagProps === "delete" ? "sm" : "sm"}
        >
            <TitleComponent flag={flagProps} text={_l("Kinh nghiệm")} />
            <Modal.Body>{body()}</Modal.Body>
            <ModalFooterComponent
                onDelete={handleSubmit}
                onAdd={handleSubmit}
                onUpdate={handleSubmit}
                flag={flagProps}
                onChangeToUpdate={handleChangeView}
                onClose={handleClose}
            />
        </Modal>
    </>
}

export default StaffWorkExpEdit
