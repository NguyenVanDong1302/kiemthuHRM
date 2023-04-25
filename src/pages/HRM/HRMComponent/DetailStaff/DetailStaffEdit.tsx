import FormValidate from 'components/FormValidate/FormValidate';
import { Textarea } from 'components/input/Textarea';
import useSelectListStaff from 'hooks/Select/useSelectListStaff';
import useSelectListStaffType from 'hooks/Select/useSelectListStaffType';
import { useLocalization } from 'hooks/useLocalization';
import React, { FC, useEffect, useRef, useState } from 'react'
import { Breadcrumb, Button, Col, Container, Content, DatePicker, Grid, Header, Row, SelectPicker, Sidebar, Toggle } from 'rsuite';
import MapListDepartmentItem from '../mapListDepartment'
import useDetailStaff from 'hooks/Staff/useDetailStaff';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import staff_service from 'services/Staff/staff_service';
import { ShowError } from 'components/Dialogs/Dialogs';
import { Icon } from '@rsuite/icons';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import AvatarStaff from '../AvartarStaff'
import useSelectListDepartment from 'hooks/Select/useSelectListDepartment';
import useSelectListGender from 'hooks/Select/useSelectListGender';
import useListOrg from 'hooks/Select/useListOrg';
import { dateRequiredRule, requiredRule } from 'utils/validationRules';
import { convertDate } from 'utils/date';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { setListDataUpload } from 'store/reducers/selectApi';
import { useDispatch } from 'react-redux';
import store from 'store/store';
// import MapListDepartmentItem2 from '../testListDep';



const DetailStaffEdit = (isNew: any) => {
    const formRef: any = useRef(null);
    const [formValue, setFormValue] = useState({} as any);
    const _l = useLocalization("Staff_Discipline_Edit");
    const _t = useLocalization("toast");
    const _p = useLocalization("Placeholder");

    const listStaffType = useSelectListStaffType()
    const listManagerStaff = useSelectListStaff();
    const listDepartment = useSelectListDepartment()
    const listGender = useSelectListGender()
    const listOrgID = useListOrg()
    const [departmentList, setDepartmentList] = useState([]);
    const listData = useSelector((state: any) => state.selectApiSlice.ListDataUpload);
    var staff = { AvatarUrl: '' }
    const { StaffCode } = useParams()
    const { OrgId, NetworkId } = store.getState().orgInfo
    const nav = useNavigate();
    const handleSubmit = () => {
        const nCondition = {
            Staff_Staff: {
                StaffCode: "",
                OrgID: OrgId,
                NetworkID: NetworkId,
                StaffCodeUser: formValue.StaffCodeUser,
                StaffLastName: formValue.StaffLastName,
                StaffName: formValue.StaffName,
                StaffEmail: formValue.StaffEmail,
                StaffType: formValue.ms_StaffTypeName,
                ManagerStaff: formValue.ManagerStaff,
                UserID: `user-${Math.random()}`,
                UserPassword: `user-${Math.random()}`,
                WorkingStartDate: new Date(formValue.WorkingStartDate),
                StaffAddress: formValue.StaffAddress,
                Remark: formValue.Remark,
                Gender: formValue.Gender,
                // Gender: '1',
                FlagActive: formValue.FlagActive ? "1" : "0",
                // FlagActive: "1",
                StaffPhone: formValue.StaffPhone,
                // DBO: new Date(formValue.DBO),
                DBO: formValue.DBO,
                WorkingEndDate: formValue.WorkingEndDate,
                BirthPlace: formValue.BirthPlace,
                DateOfIssue: null,
                StaffFullName: `${formValue.StaffLastName} ${formValue.StaffName}`,
                PlaceOfIssue: null,
                PermanentAddress: formValue.PermanentAddress,
                AvatarUrl: listData.Url ?? null,
                AvatarFileName: listData.FileName ?? null,
                AvatarFilePath: listData.FilePath ?? null,
                AvatarFileBase64: null,
                FlagFileUpload: listData.FlagFileUpload
                    ? listData.FlagFileUpload
                    : null,
                AttFileId: listData?.AttFileId ?? null,
            },
            Lst_Staff_MapDepartment: departmentList,
        }

        console.log(isNew);

        if (isNew == true) {
            console.log(1);
            staff_service.update(
                {
                    isNew: true,
                    data: nCondition
                }
            )
                .then((resp: any) => {
                    if (resp.Success) {
                        toast.success(_t("Thêm thành công rồi nhaa"));
                        nav(`/${NetworkId}/HRM/detail/${resp.Data.StaffCode}`)
                    } else {
                        ShowError(resp.ErrorData);
                    }
                });
        } else {
            let condition = {
                Staff_Staff: {
                    ...formValue,
                    StaffCode: StaffCode,
                    OrgID: OrgId,
                    FlagActive: formValue.FlagActive ? "1" : "0",
                    // avatar
                    AvatarUrl: listData.Url
                        ? listData.Url
                        : formValue.AvatarUrl,
                    AvatarFileName: listData.FileName
                        ? listData.FileName
                        : formValue.AvatarFileName,
                    AvatarFilePath: listData.FilePath
                        ? listData.FilePath
                        : formValue.AvatarFilePath,
                    AvatarFileBase64: null,
                    FlagFileUpload: listData.FlagFileUpload
                        ? listData.FlagFileUpload
                        : "",
                    AttFileId: listData?.AttFileId
                        ? listData?.AttFileId
                        : null,
                },
                Lst_Staff_MapDepartment: departmentList,
            };
            staff_service.update({
                isNew: false,
                data: condition
            })
                .then((resp: any) => {
                    if (resp.Success) {
                        toast.success(_t("Sửa thành công rồi nhaa"));
                        nav(`/${NetworkId}/HRM/detail/${condition.Staff_Staff.StaffCodeUser}`)
                    } else {
                        ShowError(resp.ErrorData);
                    }
                });
        }
    }

    if (isNew == true) {
        return <></>
    } else if (isNew) {
        const { StaffCode } = useParams()
        staff = useDetailStaff(StaffCode).Staff_Staff
        const fetch = async () => {
            const resp = await staff_service.getByStaffCode(StaffCode);
            if (resp.Success) {
                if (resp.Data && resp.Data.Staff_Staff) {
                    const nData = resp.Data.Staff_Staff
                    nData.DBO = new Date(nData.DBO)
                    nData.WorkingStartDate = new Date(nData.WorkingStartDate)
                    nData.Gender = nData.Gender == '1' ? 'Nữ' : nData.Gender == '0' ? 'Nam' : 'Khác'
                    nData.CreateDTime = new Date(nData.CreateDTime)
                    nData.WorkingEndDate = new Date(nData.WorkingEndDate)
                    console.log(nData);
                    setDepartmentList(resp.Data.Staff_MapDepartment)
                    setFormValue(nData);
                }
            } else {
                ShowError(resp.ErrorData);
            }
        };

        useEffect(() => {
            fetch();
        }, [StaffCode]);
    }
    // const listFormItem: any[] = [
    //     {
    //         label: _l("Mã nhân viên"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "StaffCodeUser",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập "),
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Điện thoại"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "StaffPhone",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Họ nhân viên"),
    //         required: true,
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "StaffLastName",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Tên nhân viên"),
    //         required: true,
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "StaffName",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Họ tên"),
    //         required: true,
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "StaffFullName",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //                 disabled: true,
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Email"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "StaffEmail",
    //                 plaintext: false,
    //                 placeholder: _p("Nhập"),
    //             },
    //         ],
    //     },
    //     {
    //         label: _l('DBO'),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: 'DBO',
    //                 accepter: DatePicker,
    //                 placeholder: _l("Select Date"),
    //                 rule: dateRequiredRule,
    //                 oneTap: true,
    //             }
    //         ]
    //     },

    //     // loại
    //     {
    //         label: _l("Loại"),
    //         Col: 11,
    //         control: [
    //             {
    //                 accepter: SelectPicker,
    //                 name: "StaffType",
    //                 placeholder: "Loại",
    //                 data: listStaffType,
    //                 labelKey: "GroupName",
    //                 valueKey: "StaffType",
    //             },

    //         ],
    //     },
    //     {
    //         label: _l("Địa chỉ"),
    //         required: true,
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "StaffAddress",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //             },
    //         ],
    //     },

    //     {
    //         label: _l("Nơi sinh"),
    //         required: true,
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "StaffAddress",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //             },
    //         ],
    //     },

    //     // ghi chú 
    //     {
    //         label: _l("Ghi chú"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "Remark",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //                 accepter: Textarea,
    //             },
    //         ],
    //     },

    //     // giới tính
    //     {
    //         label: _l("Giới tính"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "Gender",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //                 accepter: SelectPicker,
    //                 data: listGender,
    //                 labelKey: "Gender",
    //                 valueKey: "Gender",
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("OrgID"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "OrgID",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //                 accepter: SelectPicker,
    //                 data: listOrgID,
    //                 labelKey: "mnnt_NNTFullName",
    //                 valueKey: "OrgID",
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Nơi sinh"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "BirthPlace",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Địa chỉ thường trú"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "PermanentAddress",
    //                 plaintext: false, // kết xuất văn bản thuần túy
    //                 placeholder: _p("Nhập"),
    //                 accepter: Textarea,
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Trạng thái"),
    //         Col: 11,
    //         control: [
    //             {
    //                 name: "FlagActive",
    //                 plaintext: false,
    //                 placeholder: _p("Nhập"),
    //                 accepter: Toggle,
    //                 checkedChildren: "Active",
    //                 unCheckedChildren: "Inactive",
    //             },
    //         ],
    //     },
    //     {
    //         label: _l("Phòng ban"),
    //         customComponent: <div>
    //             <MapListDepartmentItem
    //                 item={departmentList}
    //                 setDepartmentList={setDepartmentList}
    //                 flag='update'
    //             />
    //         </div>

    //     }
    // ];

    const listFormItem: any[] = [
        {
            label: _l("Mã nhân viên"),
            Col: 11,
            control: [
                {
                    name: "StaffCodeUser",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập "),
                    disable: true
                },
            ],
        },
        {
            label: _l("Điện thoại"),
            Col: 11,
            control: [
                {
                    name: "StaffPhone",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                },
            ],
        },
        {
            label: _l("Họ nhân viên"),
            required: true,
            Col: 11,
            control: [
                {
                    name: "StaffLastName",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    rule: requiredRule
                },
            ],
        },
        {
            label: _l("Tên nhân viên"),
            required: true,
            Col: 11,
            control: [
                {
                    name: "StaffName",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                },
            ],
        },
        {
            label: _l("Họ tên"),
            required: true,
            Col: 11,
            control: [
                {
                    name: "StaffFullName",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    disabled: true,
                },
            ],
        },
        {
            label: _l("Email"),
            Col: 11,
            control: [
                {
                    name: "StaffEmail",
                    plaintext: false,
                    placeholder: _p("Nhập"),
                },
            ],
        },
        {
            label: _l("Loại"),
            Col: 11,
            control: [
                {
                    name: "ms_StaffTypeName",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    accepter: SelectPicker,
                    data: listStaffType,
                    labelKey: "GroupName",
                    valueKey: "StaffType",
                },
            ],
        },
        {
            label: _l("Người quản lý"),
            Col: 11,
            control: [
                {
                    name: "ManagerStaff",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    accepter: SelectPicker,
                    data: listManagerStaff,
                    labelKey: "StaffFullName",
                    valueKey: "StaffCode",
                },
            ],
        },
        {
            label: _l("Địa chỉ"),
            required: true,
            Col: 11,
            control: [
                {
                    name: "StaffAddress",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                },
            ],
        },

        // Phòng ban
        {
            label: _l("Phòng ban"),
            customComponent: <div>
                <MapListDepartmentItem
                    item={departmentList}
                    setDepartmentList={setDepartmentList}
                    flag='update'
                />
            </div>
        },
        {
            label: _l("DOB"),
            Col: 11,
            control: [
                {
                    name: "DBO",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    accepter: DatePicker,
                },
            ],
        },
        {
            label: _l("Ghi chú"),
            Col: 11,
            control: [
                {
                    name: "Remark",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),

                    accepter: Textarea,
                },
            ],
        },

        {
            label: _l("Giới tính"),
            Col: 11,
            control: [
                {
                    name: "Gender",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    accepter: SelectPicker,
                    data: listGender,
                    labelKey: "Gender",
                    valueKey: "GenderCode",
                },
            ],
        },
        {
            label: _l("OrgID"),
            Col: 11,
            control: [
                {
                    name: "OrgID",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    accepter: SelectPicker,
                    data: listOrgID,
                    labelKey: "mnnt_NNTFullName",
                    valueKey: "OrgID",
                },
            ],
        },
        {
            label: _l("Nơi sinh"),
            Col: 11,
            control: [
                {
                    name: "BirthPlace",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                },
            ],
        },
        {
            label: _l("Địa chỉ thường trú"),
            Col: 11,
            control: [
                {
                    name: "PermanentAddress",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    accepter: Textarea,
                },
            ],
        },
        {
            label: _l("Bắt đầu"),
            required: true,
            Col: 11,
            control: [
                {
                    name: "WorkingStartDate",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    accepter: DatePicker,
                },
            ],
        },
        {
            label: _l("Nghỉ việc"),
            Col: 11,
            control: [
                {
                    name: "WorkingEndDate",
                    plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    accepter: DatePicker,
                },
            ],
        },

        {
            label: _l("Trạng thái"),
            Col: 11,
            control: [
                {
                    name: "FlagActive",
                    // plaintext: false, // kết xuất văn bản thuần túy
                    placeholder: _p("Nhập"),
                    defaultChecked: true,
                    accepter: Toggle,
                    checkedChildren: "Active",
                    unCheckedChildren: "Inactive",
                },
            ],
        },
    ];

    return <>
        <Container>
            <Header>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        Danh sách nhân viên
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Chi tiết nhân viên</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Button onClick={handleSubmit}>
                        {
                            isNew == true ? (
                                <span>Lưu & Thêm mới</span>
                            ) : (
                                <span>Lưu</span>
                            )
                        }
                    </Button>
                </div>

            </Header>
            <Container>
                <Sidebar >
                    <Grid fluid className='py-4'>
                        <Row style={{ justifyContent: 'center' }} className='px-3 row-sidebar'>
                            <Col className='d-flex' style={{ justifyContent: 'center' }} xs={24}>
                                <AvatarStaff url={staff.AvatarUrl} flag={'edit'} />
                            </Col>
                            <Col className='py-3 text-center' xs={24}>
                                <h5 style={{ color: '#000' }}>{formValue.StaffFullName}</h5>
                            </Col>
                            {
                                isNew ? (
                                    <></>
                                ) : (
                                    <>
                                        <Col className='text-center w-100'>
                                            <span className={`tag - staff - type ${formValue.StaffStatus == "ACTIVE" ? 'staff__active' : 'staff__inactive'} `}>{formValue.StaffStatus == "ACTIVE" ? 'Đang làm việc' : 'Đã nghỉ việc'}</span>
                                        </Col>
                                        <Col className='w-100 after__bottom'>
                                        </Col>
                                        <Col xs={24} className='col-contact'>
                                            <Row>
                                                <Col xs={24}>
                                                    <Icon as={BsTelephone} className='mr-2' />
                                                    <span>{_l(`${formValue.StaffPhone} `)}</span>
                                                </Col>
                                                <Col xs={24}>
                                                    <Icon as={AiOutlineMail} className='mr-2' />
                                                    <span>{_l(`${formValue.StaffEmail} `)}</span>
                                                </Col>
                                                <Col xs={24}>
                                                    <Icon as={GrLocation} className='mr-2' />
                                                    <span>{_l(`${formValue.PermanentAddress} `)}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col className='w-100 after__bottom'>
                                        </Col>
                                        <Col className='col-12'>
                                            <Row>
                                                <Col>
                                                    <span>
                                                        Phòng ban
                                                    </span>
                                                    <h6 className='col-12'>{formValue.DepartmentName == 'null' ? formValue.DepartmentName : '---'}</h6>
                                                </Col>
                                                <Col className='col-12'>
                                                    <span>
                                                        Tên chức danh
                                                    </span>
                                                    <h6 className='col-12'>{formValue.PositionName == 'null' ? formValue.PositionName : '---'}</h6>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </>
                                )
                            }
                        </Row>
                    </Grid>
                </Sidebar>
                <Content>
                    {/* <NavTabs /> */}
                    <Grid fluid className='list-detail-staff' >
                        <div className='detail-header'>
                            <span> <Icon as={AiOutlineUser} /></span>
                            <h6> Thông tin cá nhân</h6>
                        </div>
                        <FormValidate
                            ref={formRef}
                            formValue={formValue}
                            setFormValue={setFormValue}
                            layout="vertical"
                            listItem={listFormItem}
                        />
                    </Grid>
                </Content>
            </Container >
        </Container >
    </>
}

export default DetailStaffEdit
