import EditComponent from 'components/EditCell/EditCellComponent'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Table } from 'rsuite'
import Staff_WorkExperience_service from 'services/Staff/Staff_WorkExperience_service'
import store from 'store/store'
import StaffWorkExpEdit from './StaffWorkExpEdit'
import { v4 as uuid } from 'uuid'


function StaffWorkExperience() {

    const { StaffCode } = useParams()
    const [data, setData] = useState()
    const isFlagActiveEdit = useSelector((state: any) => state.ui.isFlagActiveEdit)
    const [currentCode, setCurrentCode] = useState(<></>);
    const [loading, setLoading] = useState("");

    const fetch = async () => {
        const resp = await Staff_WorkExperience_service.GetByStaffCode(StaffCode)
        setData(resp.Data)
    }

    const handleUpdate = (data: any) => {
        setCurrentCode(
            <StaffWorkExpEdit
                flag="update"
                code={data}
                onSuccess={reloading}
                uuid={uuid()}
            />
        );
    };


    const handleAdd = () => {
        setCurrentCode(
            <StaffWorkExpEdit 
            uuid={uuid()} 
            flag="add" 
            onSuccess={reloading} />
        );
    };

    const handleDelete = (data: any) => {
        setCurrentCode(<StaffWorkExpEdit
            flag="delete"
            code={data}
            onSuccess={reloading}
            uuid={uuid()}
        />
        )
    }
    useEffect(() => {
        fetch()
    }, [uuid, loading])

    const reloading = () => {
        setLoading(uuid());
    };
    return (
        <>
            <Button onClick={handleAdd} >
                Thêm
            </Button>
            <Table
                data={data}
                height={450}
            >
                {
                    isFlagActiveEdit && <Table.Column
                        width={100}
                    >
                        <Table.HeaderCell>{''}</Table.HeaderCell>
                        <Table.Cell >
                            {
                                (rowData: any) => {
                                    return EditComponent(() => handleUpdate(rowData), () => handleDelete(rowData), rowData)
                                }
                            }
                        </Table.Cell>
                    </Table.Column>
                }
                <Table.Column width={200} >
                    <Table.HeaderCell>Từ ngày </Table.HeaderCell>
                    <Table.Cell dataKey="DateForm" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200}>
                    <Table.HeaderCell>Đến ngày</Table.HeaderCell>
                    <Table.Cell dataKey="DateTo" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={250} >
                    <Table.HeaderCell>Công ty</Table.HeaderCell>
                    <Table.Cell dataKey="Company" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Vị trí</Table.HeaderCell>
                    <Table.Cell dataKey="Position" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={250} >
                    <Table.HeaderCell>Kinh nghiệm làm việc</Table.HeaderCell>
                    <Table.Cell dataKey="WorkExperience" style={{ padding: '6px !important' }} />
                </Table.Column>
            </Table>
            {currentCode}
        </>
    )
}

export default StaffWorkExperience
