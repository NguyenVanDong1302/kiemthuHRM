import EditComponent from 'components/EditCell/EditCellComponent'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Table } from 'rsuite'
import Train_Course_service from 'services/Course/Train_Course/Train_Course_service'
import TrainCourseEdit from './TrainCourseEdit'
import { v4 as uuid } from 'uuid'

function TrainCourse() {
    const { StaffCode } = useParams()
    const [data, setData] = useState()
    const isFlagActiveEdit = useSelector((state: any) => state.ui.isFlagActiveEdit)
    const [currentCode, setCurrentCode] = useState(<></>);
    const [loading, setLoading] = useState("")
    const fetch = async () => {
        const resp = await Train_Course_service.GetByStaffCode(StaffCode)
        if (resp.Success) {
            setData(resp.Data.Lst_Train_Course.DataList)
        }
    }
    const handleUpdate = (data: any) => {
        setCurrentCode(
            <TrainCourseEdit
                flag="update"
                code={data}
                onSuccess={reloading}
                uuid={uuid()}
            />
        );
    }
    const handleDelete = (data: any) => {
        setCurrentCode(
            <TrainCourseEdit
                flag="delete"
                code={data}
                onSuccess={reloading}
                uuid={uuid()}
            />
        );
    }

    const handleAdd = () => {
        setCurrentCode(
            <TrainCourseEdit
                flag="add"
                // code={data}
                onSuccess={reloading}
                uuid={uuid()}
            />
        );
    }

    const reloading = () => {
        setLoading(uuid());
    };
    useEffect(() => {
        fetch()
    }, [])
    return (
        <>
            <Button onClick={handleAdd} >
                Thêm
            </Button>
            {data && <Table
                data={data}
                height={450}
                style={{ padding: '10px' }}
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
                    <Table.Cell dataKey="LUDTimeUTC" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Đến ngày </Table.HeaderCell>
                    <Table.Cell dataKey="LogLUDTimeUTC" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={220} >
                    <Table.HeaderCell>Tên khoá</Table.HeaderCell>
                    <Table.Cell dataKey="TrCsName" style={{ padding: '6px !important', fontSize: '13px' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Trạng thái</Table.HeaderCell>
                    <Table.Cell dataKey="TrCsStatus" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Loại</Table.HeaderCell>
                    <Table.Cell dataKey="TrainType" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Rank</Table.HeaderCell>
                    <Table.Cell dataKey="RankName" style={{ padding: '6px !important' }} />
                </Table.Column>
            </Table>}
            {currentCode}
        </>
    )
}

export default TrainCourse
