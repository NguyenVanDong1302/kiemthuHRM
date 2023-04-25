import ModalFooterComponent from 'components/CustomModal/ModalFooterComponent';
import TitleComponent from 'components/CustomModal/TitleComponent';
import { handleShouldUpdate } from 'components/CustomModal/UpLoader';
import { ShowError } from 'components/Dialogs/Dialogs';
import FormValidate from 'components/FormValidate/FormValidate';
import { Textarea } from 'components/input/Textarea';
import useSelectListContractType from 'hooks/Select/useSelectContractType';
import { useLocalization } from 'hooks/useLocalization';
import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DatePicker, Modal, SelectPicker, Uploader } from 'rsuite';
import Staff_Contact_service from 'services/Staff/Staff_Contact_service';
import Staff_LaborContract_service from 'services/Staff/Staff_LaborContract_service';
import { convertDate, convertDateToYMDHMS } from 'utils/date';
import { dateRequiredRule, requiredRule } from 'utils/validationRules';
import MapListDepartmentItem from '../mapListDepartment'
import UploaderCp from '../Uploader';
import { v4 as uuids } from 'uuid'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setListDataUpload } from 'store/reducers/selectApi';
type Props = {
    flag: string;
    code?: any;
    onSuccess: Function;
    uuid: string;
};

type FormValue = {
    StaffCode: string,
    ContractCodeSys: string,
    ContractNo: string,
    SignDate: string,
    ContactType: string,
    ContractDetail: string,
    Remark: any,
    RefSolution: any,
    RefCode: any,
    CreateDTime: Date,
    EffectiveDate: Date,
    ExpirationDate: Date,
    ContractFilePath: any,
    FlagFileUpload: string,
    AttFileId: any,
    ContractFileName: any,
    ContractFileSize: any,

}

const ConTractStaffEdit: FC<Props> = ({
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
    const listContractType = useSelectListContractType()
    const listData = useSelector((state: any) => state.selectApiSlice.ListDataUpload);
    const handleClose = () => {
        setOpen(false);
        dispatch(setListDataUpload({}));
    };
    const dispatch = useDispatch();
    console.log(listData);
    const listFormItem: any[] = [
        {
            label: _l("Số hợp đồng"), // Danh hiệu
            required: true,
            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "ContractNo",
                    placeholder: _p("Nhập"),
                    rule: requiredRule,
                },
            ],
        },
        {
            label: _l("Ngày ký"), // Ngày kinh nghiệm
            required: true,
            Col: 15,
            control: [
                {
                    accepter: DatePicker,
                    oneTap: true,
                    plaintext: flagProps === "detail" ? true : false,
                    name: "SignDate",
                    placeholder: _p("Select Date"),
                    rule: dateRequiredRule,
                },
            ],
        },
        {
            label: _l("Ngày hiệu lực"), // Ngày kinh nghiệm
            required: true,
            control: [
                {
                    accepter: DatePicker,
                    plaintext: flagProps === "detail" ? true : false,
                    name: "EffectiveDate",
                    placeholder: _p("Select Date"),
                    rule: dateRequiredRule,
                    oneTap: true,
                },
                {
                    accepter: DatePicker,
                    oneTap: true,
                    plaintext: flagProps === "detail" ? true : false,
                    name: "ExpirationDate",
                    placeholder: _p("Select Date"),
                    rule: dateRequiredRule,
                },
            ],
        },
        {
            label: _l("Loại hợp đồng"),
            control: [
                {
                    accepter: SelectPicker,
                    name: "ContactType",
                    placeholder: "Loại hợp đồng",
                    data: listContractType,
                    labelKey: "ContractTypeName",
                    valueKey: "ContractTypeCode",
                },

            ],
        },
        {
            label: _l("Chi tiết hợp đồng"),

            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "ContractDetail",
                    placeholder: _p("Nhập"),
                    rule: requiredRule,
                },
            ],
        },
        {
            label: _l("Ghi chú"),

            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "Remark",
                    placeholder: _p("Nhập"),
                    rule: requiredRule,
                    accepter: Textarea,
                },
            ],
        },
        {
            label: _l("Mã tham chiếu"),

            control: [
                {
                    plaintext: flagProps === "detail" ? true : false,
                    name: "WorkExperience",
                    placeholder: _p("Nhập"),
                    rule: requiredRule,
                },
            ],
        },
        {
            label: _l("Upload"),
            customComponent: <div>
                <UploaderCp flag={'contract'} uuid={uuids()} />
            </div>
        },

    ]
    const render = () => {
        if (flag === "add") {
            setFormValue({} as FormValue);
        } else {
            setFormValue(() => {
                return {
                    ...code,
                    SignDate: new Date(code.SignDate),
                    EffectiveDate: new Date(code.EffectiveDate),
                    CreateDTime: new Date(Date.now()),
                    ExpirationDate: new Date(code.ExpirationDate),
                };
            });

        }
    };

    const handleSubmit = async () => {
        if (flagProps == 'delete') {
            Staff_LaborContract_service.remove({
                StaffCode: StaffCode,
                ContractCodeSys: code.ContractCodeSys
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
            let condition = {
                ...formValue,
                StaffCode: StaffCode,
                CreateDTime: new Date(formValue.CreateDTime),
                EffectiveDate: new Date(formValue.EffectiveDate),
                ExpirationDate: new Date(formValue.ExpirationDate),
                ContractFileUrl: listData.Url,
                ContractFilePath: listData.FilePath,
                FlagFileUpload: listData.FlagFileUpload,
                AttFileId: listData.AttFileId,
                ContractFileName: listData.FileName,
                ContractFileSize: listData.FileSize,
                ContractCodeSys: formValue.ContractCodeSys
            };

            if (flagProps == 'add') {
                let nCondition = {
                    ContractCodeSys: "",
                    ContractNo: uuid,
                    SignDate: "2022-02-16",
                    ContactType: formValue.ContactType,
                    ContractDetail: "123",
                    Remark: null,
                    RefSolution: null,
                    RefCode: null,
                    EffectiveDate: "2022-02-26",
                    ExpirationDate: "2023-03-03",
                    ContractFilePath: null,
                    StaffCode: StaffCode,
                }
                Staff_LaborContract_service.create({
                    ...nCondition,
                })
                    .then((resp: any) => {
                        if (resp.Success) {
                            toast.success(_t("Thêm thành công rồi nhaa"));
                            onSuccess();
                            dispatch(setListDataUpload({}));
                        } else {
                            ShowError(resp.ErrorData);
                        }
                    });
            } else
                if (flagProps === "update") {
                    // call api ở đây
                    console.log(condition);
                    Staff_Contact_service.updateContractByCode({
                        isNew: false,
                        data: condition,
                    }).then((resp) => {
                        if (resp.Success) {
                            toast.success("Update thành công");
                            onSuccess();
                            handleClose();
                            dispatch(setListDataUpload({}));
                        } else {
                            ShowError(resp.ErrorData);
                        }
                    });
                }
        }
        setOpen(false);
    }

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

    useEffect(() => {
        setFlagProps(flag);
    }, [uuid]);

    useEffect(() => {

    }, [])

    return <>
        <Modal
            backdrop="static"
            className="modal-container"
            open={open}
            onClose={handleClose}
            size={flagProps === "delete" ? "sm" : "sm"}
        >
            <TitleComponent flag={flagProps} text={_l("hợp đồng")} />
            <Modal.Body>{body()}</Modal.Body>
            <ModalFooterComponent
                onDelete={handleSubmit}
                onAdd={handleSubmit}
                onUpdate={handleSubmit}
                flag={flagProps}
                onClose={handleClose}
            />
        </Modal>
    </>
}
export default ConTractStaffEdit
