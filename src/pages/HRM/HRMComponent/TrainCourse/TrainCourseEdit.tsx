import ModalFooterComponent from 'components/CustomModal/ModalFooterComponent';
import TitleComponent from 'components/CustomModal/TitleComponent';
import { ShowError } from 'components/Dialogs/Dialogs';
import FormValidate from 'components/FormValidate/FormValidate';
import { Textarea } from 'components/input/Textarea';
import useSelectListDiscipline from 'hooks/Select/useSelectListDiscipline';
import useSelectListRank from 'hooks/Select/useSelectListRank';
import useSelectListStaff from 'hooks/Select/useSelectListStaff';
import useSelectListStaffType from 'hooks/Select/useSelectListStaffType';
import useSelectTrainType from 'hooks/Select/useSelectTrainType';
import { useLocalization } from 'hooks/useLocalization';
import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DatePicker, Modal, SelectPicker } from 'rsuite';
import Train_Course_service from 'services/Course/Train_Course/Train_Course_service';
import { convertDate, convertDateToYMDHMS } from 'utils/date';
import { dateRequiredRule, requiredRule } from 'utils/validationRules';


type Props = {
    flag: string;
    code?: any;
    onSuccess: Function;
    uuid: string;
};

type FormValue = {
    StaffCode: string,
    Idx: any,
    DateForm: any,
    DateTo: any,
    TranningCode: string,
    TranningName: string,
    TranningStatus: string,
    TrainningType: string,
    TranningRank: string,
    Position: string
}


const TrainCourseEdit: FC<Props> = ({
    flag,
    code,
    onSuccess,
    uuid,
}: Props) => {
    // console.log(code);
    const formRef: any = useRef(null);
    const _l = useLocalization("Staff_Discipline_Edit");
    const _t = useLocalization("toast");
    const _p = useLocalization("Placeholder");
    const selectListStaff = useSelectListStaff();
    const [data, setData] = useState(code)
    const selectListDiscipline = useSelectListDiscipline();
    const [flagProps, setFlagProps] = useState<string>(flag);
    const [open, setOpen] = useState(true);
    const [formValue, setFormValue] = useState({} as FormValue);
    const { StaffCode } = useParams()
    const listTrainType = useSelectTrainType()
    const listRank = useSelectListRank()

    // console.log(code.Idx);

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {

        let condition = {
            ...formValue,
            DateForm: convertDateToYMDHMS(formValue?.DateForm),
            DateTo: convertDateToYMDHMS(formValue?.DateTo),
            StaffCode: StaffCode
        };

        // console.log(condition);

        if (flagProps == 'add') {
            Train_Course_service.create({
                ...condition
            })
                .then((resp: any) => {
                    if (resp.Success) {
                        console.log('success');
                        toast.success(_t("add được rùi đó "));
                        onSuccess();
                        setOpen(false);
                    } else {
                        ShowError(resp.ErrorData);
                    }
                }
                )
        }
        else {
            Train_Course_service.update({
                isNew: false,
                data: condition
            })
                .then((resp: any) => {
                    if (resp.Success) {
                        console.log('success');
                        toast.success(_t("Sửa được rùi đó "));
                        onSuccess();
                        setOpen(false);
                    } else {
                        ShowError(resp.ErrorData);
                    }
                }
                )
        }
    }

    const listFormItem: any[] = [
        {
            label: _l("Thời gian làm việc"), // Ngày kinh nghiệm
            // required: true,
            Col: 24,
            control: [
                {
                    accepter: DatePicker,
                    plaintext: flagProps === "detail" ? true : false,
                    name: "LearnStartDTimeUTC",
                    format: "yyyy-MM-dd HH:mm:ss",
                    placeholder: _p("Select Date"),
                    rule: dateRequiredRule,
                    oneTap: true,
                },
                {

                    accepter: DatePicker,
                    format: "yyyy-MM-dd HH:mm:ss",
                    oneTap: true,
                    plaintext: flagProps === "detail" ? true : false,
                    name: "LearnEndDTimeUTC",
                    placeholder: _p("Select Date"),
                    rule: dateRequiredRule,
                },
            ],
        },
        {
            label: _l("Tên khoá"), // Danh hiệu
            required: true,
            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "TrCsName",
                    placeholder: _p("Tên khoá"),
                    rule: requiredRule,
                },
            ],
        },
        {
            label: _l("Loại"), // Loại
            required: true,
            control: [
                {
                    accepter: SelectPicker,
                    data: listTrainType,
                    valueKey: "TrainType",
                    labelKey: "TrainType",
                    plaintext: flagProps === "detail" ? true : false,
                    name: "TrainType",
                    placeholder: _p("Input"),
                    searchable: false,
                    rule: requiredRule,
                },
            ],
        },
        {
            label: _l("Rank"), // Loại
            required: true,
            control: [
                {
                    accepter: SelectPicker,
                    data: listRank,
                    valueKey: "RankDesc",
                    labelKey: "RankDesc",
                    plaintext: flagProps === "detail" ? true : false,
                    name: "RankName",
                    placeholder: _p("Input"),
                    searchable: false,
                    rule: requiredRule,
                },
            ],
        },
    ]

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

    const render = () => {
        if (flag === "add") {
            setFormValue({} as FormValue);
        } else {
            setFormValue(() => {
                return {
                    ...code,
                    LearnStartDTimeUTC: new Date(code.LearnStartDTimeUTC),
                    LearnEndDTimeUTC: new Date(code.LearnEndDTimeUTC),
                };
            })

        }
    };

    useEffect(() => {
        render();
        setOpen(true);
        return () => {
            setFormValue({} as FormValue);
        };
    }, [uuid, flag]);

    useEffect(() => {
        setFlagProps(flag);
    }, [uuid]);
    return <>
        <Modal
            backdrop="static"
            className="modal-container"
            open={open}
            onClose={handleClose}
            size={flagProps === "delete" ? "sm" : "md"}
        >
            <TitleComponent flag={flagProps} text={_l("Quá trình đào tạo")} />
            <Modal.Body>{body()}</Modal.Body>
            <ModalFooterComponent
                onDelete={handleSubmit}
                onAdd={handleSubmit}
                onUpdate={handleSubmit}
                flag={flagProps}
                // onChangeToUpdate={handleChangeView}
                onClose={handleClose}
            />
        </Modal>
    </>

}

export default TrainCourseEdit
