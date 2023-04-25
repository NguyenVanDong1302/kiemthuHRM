import ModalFooterComponent from 'components/CustomModal/ModalFooterComponent';
import TitleComponent from 'components/CustomModal/TitleComponent';
import { Textarea } from 'components/input/Textarea';
import useSelectListDiscipline from 'hooks/Select/useSelectListDiscipline';
import useSelectListStaff from 'hooks/Select/useSelectListStaff';
import { useLocalization } from 'hooks/useLocalization'
import React, { FC, useRef, useState } from 'react'
import { DatePicker, Modal } from 'rsuite';
import { dateRequiredRule, requiredRule } from 'utils/validationRules'


type Props = {
    flag: string;
    code?: any;
    onSuccess: Function;
    uuid: string;
};

type FormValue = {
    Staff_Appoint: {
        StaffAppointCodeSys: string,
        NetworkID: "4221896000",
        OrgID: "4221896000",
        StaffAppointCode: string,
        StaffCode: string,
        Idx: string,
        DecisionNo: string,
        AppointGroup: string,
        AppointTypeID: string,
        RefNo: string,
        Remark: string,
        appointfilepath: null,
        appointfileurl: null,
        appointfilebase64: null,
        appointfilename: null,
        appointfilesize: 0,
        approvaldate: Date,
        approvalby: string,
        approvalposition: string,
        EffectiveDate: Date,
        ExpirationDate: Date,
        AppointStatus: string,
        ApprvCodeSysOS: string,
        CreateDTimeUTC: Date,
        createby: string,
        ApprDTimeUTC: null,
        ApprBy: null,
        CancelDTimeUTC: null,
        CancelBy: null,
        AppointDate: null,
        ApprDate: null,
        mp_PositionName: null,
        md_DepartmentName: null,
        ss_StaffFullName: string,
        ss_StaffCodeUser: string,
        mat_AppointTypeName: string,
        mag_AppointGroupName: string,
        mstnnt_NNTFullName: string,
        stst_StaffFullName: string,
        mpst_PositionName: string
    },
    Lst_Map_AppointPosition: [
        {
            StaffAppointCodeSys: string,
            PositionIdx: any,
            DepartmentCode: any,
            PositionCode: any,
            OrgID: "4221896000",
            LogLUDTimeUTC: Date,
            logluby: "demo@inos.vn",
            mp_PositionName: string,
            md_DepartmentName: string,
            mnnt_NNTFullName: string
        }
    ]
};
const StaffAppointEdit: FC<Props> = ({
    flag,
    code,
    onSuccess,
    uuid,
}: Props) => {
    const formRef: any = useRef(null);
    const _l = useLocalization("Staff_Discipline_Edit");
    const _t = useLocalization("toast");
    const _p = useLocalization("Placeholder");
    const [flagProps, setFlagProps] = useState<string>(flag);
    const [open, setOpen] = useState(false);
    const [formValue, setFormValue] = useState({} as FormValue);
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {

    }
    const handleChangeView = () => {

    }
    const listFormItem: any[] = [
        {
            label: _l("Số hợp đồng"), // Danh hiệu
            required: true,
            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "Company",
                    placeholder: _p("Nhập"),
                    rule: requiredRule,
                },
            ],
        },
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

    const body = () => {
        return <p>
            hehe
        </p>
    }

    return <>
        <Modal
            backdrop="static"
            className="modal-container"
            open={open}
            onClose={handleClose}
            size={flagProps === "delete" ? "sm" : "sm"}
        >
            <TitleComponent flag={flagProps} text={_l("Staff_Reward")} />
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

export default StaffAppointEdit
