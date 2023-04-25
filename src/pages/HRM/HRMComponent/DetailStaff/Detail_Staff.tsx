
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, AvatarGroup, Breadcrumb, Button, Col, Container, Content, Dropdown, Grid, Header, Sidebar } from 'rsuite'
import store from 'store/store'
import AvatarStaff from '../AvartarStaff'
import { Row } from 'react-bootstrap'
import { useLocalization } from 'hooks/useLocalization'
import { Icon, Phone } from '@rsuite/icons'
import { BsTelephone } from 'react-icons/bs'
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai'
import { GrLocation } from 'react-icons/gr'
import NavTabs from '../NavTabs'
import useDetailStaff from 'hooks/Staff/useDetailStaff'
import { useDispatch } from 'react-redux'
import { toggleEditDetail } from 'store/reducers/ui'
import MapListDepartmentItem from '../mapListDepartment'
import RelativeList from '../Relative/RelativeList'
import { useSelector } from 'react-redux'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import HistStaffModal from '../HistStaff/HistStaffModal'
import { v4 as uuid } from 'uuid'

function DetailStaff() {
    const { OrgId } = store.getState().orgInfo
    const _l = useLocalization('')
    const { StaffCode } = useParams()
    var staff = useDetailStaff(StaffCode).Staff_Staff
    const dispatch = useDispatch()
    const [currentForm, setCurrentForm] = useState(<></>)

    const handleDeleteStaff = () => {
        setCurrentForm(
            <HistStaffModal uuid={uuid()} flag='delete' />
        )
    }
    const handleOpenFormInactiveStaff = () => {
        setCurrentForm(
            <HistStaffModal uuid={uuid()} flag='inactive' />
        )
    }
    const handleOpenFormPauseStaff = () => {
        setCurrentForm(
            <HistStaffModal uuid={uuid()} flag='pause' />
        )
    }
    return (
        <>
            <Container>
                <Header>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            Danh sách nhân viên
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>Chi tiết nhân viên</Breadcrumb.Item>
                    </Breadcrumb>

                    <div>   
                        <Button
                            onClick={() => {
                                return dispatch(toggleEditDetail(true))
                            }}>
                            Chỉnh sửa
                        </Button>
                        <Dropdown
                            icon={<BiDotsHorizontalRounded style={{ margin: "0" }} />}
                            placement="bottomEnd"
                            style={{
                                zIndex: "1001",
                                border: " 1px solid #5f7d95",
                                borderRadius: "4px",
                            }}
                            noCaret
                        >
                            <Dropdown.Item onClick={handleDeleteStaff}>Xóa</Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    handleOpenFormInactiveStaff();
                                }}
                            >
                                Nghỉ việc
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    handleOpenFormPauseStaff();
                                }}
                            >
                                Tạm dừng
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                </Header>
                <Container>
                    <Sidebar>
                        <Grid fluid className='py-4'>
                            <Row style={{ justifyContent: 'center' }} className='px-3 row-sidebar'>
                                <Col className='d-flex' style={{ justifyContent: 'center' }} xs={24}>
                                    <AvatarStaff url={staff.AvatarUrl as string} flag={'detail'} />
                                </Col>
                                <Col className='py-3 text-center' xs={24}>
                                    <h5 style={{ color: '#000' }}>{staff.StaffFullName}</h5>
                                </Col>
                                <Col className='text-center d-flex'>
                                    <span className={`tag-staff-type text-center ${staff.StaffStatus == "ACTIVE" ? 'staff__active' : 'staff__inactive'}`}>{staff.StaffStatus == "ACTIVE" ? 'Đang làm việc' : 'Đã nghỉ việc'}</span>
                                </Col>
                                <Col className='w-100 after__bottom'>
                                </Col>
                                <Col xs={24} className='col-contact'>
                                    <Row>
                                        <Col xs={24}>
                                            <Icon as={BsTelephone} className='mr-2' />
                                            <span>{_l(`${staff.StaffPhone}`)}</span>
                                        </Col>
                                        <Col xs={24}>
                                            <Icon as={AiOutlineMail} className='mr-2' />
                                            <span>{_l(`${staff.StaffEmail}`)}</span>
                                        </Col>
                                        <Col xs={24}>
                                            <Icon as={GrLocation} className='mr-2' />
                                            <span>{_l(`${staff.PermanentAddress}`)}</span>
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
                                            <h6 className='col-12'>{staff.DepartmentName == 'null' ? staff.DepartmentName : '---'}</h6>
                                        </Col>
                                        <Col className='col-12'>
                                            <span>
                                                Tên chức danh
                                            </span>
                                            <h6 className='col-12'>{staff.PositionName == 'null' ? staff.PositionName : '---'}</h6>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Grid>
                    </Sidebar>
                    <Content style={{
                        overflow: "scroll",
                        height: "85vh"
                    }}>
                        <NavTabs />

                    </Content>
                </Container>
            </Container >
            {currentForm}
        </>
    )
}

export default DetailStaff
