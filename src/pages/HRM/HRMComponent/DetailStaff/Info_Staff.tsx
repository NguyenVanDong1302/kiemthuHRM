import { Icon } from '@rsuite/icons'
import useDetailStaff from 'hooks/Staff/useDetailStaff'
import { useLocalization } from 'hooks/useLocalization'
import React, { useEffect, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { Button, Col, Grid, Row } from 'rsuite'
import staff_service from 'services/Staff/staff_service'
import store from 'store/store'
import MapListDepartment from '../mapListDepartment'
import { useSelector } from 'react-redux'
import HistStaffList from '../HistStaff/HistStaffList'
import { v4 as uuid } from 'uuid'

function Info_Staff() {
    const { StaffCode } = useParams()
    const { OrgId } = store.getState().orgInfo
    const [Data, setData] = useState({})
    const _l = useLocalization('')
    var staff = useDetailStaff(StaffCode).Staff_Staff
    var departmentList = useDetailStaff(StaffCode).Staff_MapDepartment
    const [currentHistStaff, setCurrentHistStaff] = useState(<></>)
    const formValue = {
        DepartmentCode: "",
        PositionCode: "",
        md_DepartmentName: '',
        mp_PositionName: ""
    }
    const isFlagActiveEdit = useSelector((state: any) => state.ui.isFlagActiveEdit)
    const handleShowHistStaff = () => {
        setCurrentHistStaff(
            <HistStaffList uuid={uuid()} />
        )
    }
    return (
        <>
            {currentHistStaff}
            <Grid fluid className='list-detail-staff' >
                <div className='detail-staff__header'>
                    <div className='detail-header'>
                        <span> <Icon as={AiOutlineUser} /></span>
                        <h6> Thông tin cá nhân</h6>
                    </div>
                    {
                        isFlagActiveEdit ? <Link to={`/${OrgId}/HRM/staffEdit/${StaffCode}`} >
                            <Button>
                                Edit
                            </Button>
                        </Link> : <></>
                    }

                </div>
                <div className='d-flex w-100'>
                    <Row className='flex-column col-6'>
                        <Col>
                            <span>{_l('Mã nhân viên')}</span>
                            <span>{staff.StaffCode}</span>
                        </Col>
                        <Col>
                            <span>{_l('Họ và tên')}</span>
                            <span>{staff.StaffFullName}</span>
                        </Col>
                        <Col>
                            <span>{_l('Loại')}</span>
                            <span>{staff.ms_StaffTypeName}</span>
                        </Col>
                        <Col>
                            <span>{_l('Phòng ban')}</span>
                            <span style={{ height: 'auto' }}>
                                <MapListDepartment item={
                                    departmentList.length > 0 ? departmentList : [formValue]
                                } flag='detail' />
                            </span>
                        </Col>
                        <Col>
                            <span>{_l('Ghi chú')}</span>
                            <span>---</span>
                        </Col>
                        <Col>
                            <span>{_l('OrgId')}</span>
                            <span>{staff.OrgID}</span>
                        </Col>
                        <Col>
                            <span>{_l('TK công ty')}</span>
                            <span>--</span>
                        </Col>
                        <Col>
                            <span>{_l('Bắt đầu')}</span>
                            <span>{staff.WorkingStartDate}</span>
                        </Col>
                        <Col>
                            <span>{_l('Nghỉ Việc')}</span>
                            <span>---</span>
                        </Col>
                        <Col>
                            <span>{_l('Trạng thái làm việc')}</span>
                            <span>{staff.StaffStatus == 'ACTIVE' ? 'Đang làm việc' : 'Đã nghỉ việc'}
                                <Button style={{ margin: "0 10px" }} onClick={handleShowHistStaff}>
                                    Chi tiết
                                </Button>
                            </span>

                        </Col>
                    </Row>
                    <Row className='flex-column col-6'>
                        <Col>
                            <span>{_l('Điện thoại')}</span>
                            <span>{staff.StaffPhone}</span>
                        </Col>
                        <Col>
                            <span>{_l('Email')}</span>
                            <span>{staff.StaffEmail}</span>
                        </Col>
                        <Col>
                            <span>{_l('Địa chỉ hiện tại')}</span>
                            <span>{staff.PermanentAddress}</span>
                        </Col>
                        <Col>
                            <span>{_l('DOB')}</span>
                            <span>{staff.DBO}</span>
                        </Col>
                        <Col>
                            <span>{_l('Giới tính')}</span>
                            <span>
                                {staff.Gender == '1' ? 'Nam' : staff.Gender == '0' ? 'Nữ' : '---'}
                            </span>
                        </Col>
                        <Col>
                            <span>{_l('Nơi sinh')}</span>
                            <span>{staff.BirthPlace ? staff.BirthPlace : '---'}</span>
                        </Col>
                        <Col>
                            <span>{_l('Địa chỉ thường trú')}</span>
                            <span>{staff.StaffAddress}</span>
                        </Col>
                        <Col>
                            <span>{_l('Số giấy tờ')}</span>
                            <span>{staff.IDCardNumber}</span>
                        </Col>
                        <Col>
                            <span>{_l('Ngày Cấp')}</span>
                            <span>{staff.DateOfIssue}</span>
                        </Col>
                        <Col>
                            <span>{_l('Nơi cấp')}</span>
                            <span>{staff.PlaceOfIssue}</span>
                        </Col>
                    </Row>
                </div>
            </Grid>
        </>

    )
}

export default Info_Staff
