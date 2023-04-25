import EditComponent from 'components/EditCell/EditCellComponent'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Table } from 'rsuite'
import { v4 as uuid } from 'uuid'

import Staff_Appoint_service from 'services/Staff/Staff_Appoint_service'
import StaffAppointEdit from './StaffAppointEdit'

function StaffAppoint() {
    const { StaffCode } = useParams()
    const [data, setData] = useState()
    const isFlagActiveEdit = useSelector((state: any) => state.ui.isFlagActiveEdit)
    const defaultAppoint = {
        md_DepartmentName: '',
        mp_PositionName: '',

    };
    const [currentCode, setCurrentCode] = useState(<></>);
    const [AppointPosition, setAppointPosition] = useState(defaultAppoint)
    const [loading, setLoading] = useState("");
    const fetch = async () => {
        const resp = await Staff_Appoint_service.getByCode(StaffCode)
        console.log(resp);
        if (resp.Success) {
            const combinedData = resp.Data.Lst_Staff_Appoint.map((staffAp: any) => {
                const mapAppoint = resp.Data.Lst_Map_AppointPosition.find((a: any) => a.StaffAppointCodeSys === staffAp.StaffAppointCodeSys)
                return { ...staffAp, ...mapAppoint };
            });
            setData(combinedData)
        }
    }

    const handleUpdate = (checked: any) => {
        const obj = checked[0];
        setCurrentCode(
            <StaffAppointEdit
                code={obj}
                flag="update"
                onSuccess={reloading}
                uuid={uuid()}
            />
        );
    };



    useEffect(() => {
        fetch()
    }, [])

    const reloading = () => {
        setLoading(uuid());
    };
    return (
        <>
            <Table data={data} height={500}>
                {
                    isFlagActiveEdit && <Table.Column
                        width={100}
                    >
                        <Table.HeaderCell>{''}</Table.HeaderCell>
                        <Table.Cell >
                            {
                                (rowData: any) => {
                                    return EditComponent(handleUpdate, () => { }, rowData)
                                }
                            }
                        </Table.Cell>
                    </Table.Column>
                }
                <Table.Column width={200} >
                    <Table.HeaderCell>Số hợp đồng </Table.HeaderCell>
                    <Table.Cell dataKey="AppointTypeID" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Ngày điều động/bổ nhiệm</Table.HeaderCell>
                    <Table.Cell dataKey="EffectiveDate" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Phòng ban</Table.HeaderCell>
                    <Table.Cell dataKey="md_DepartmentName" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Chức danh</Table.HeaderCell>
                    <Table.Cell dataKey="mp_PositionName" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>Ghi chú</Table.HeaderCell>
                    <Table.Cell dataKey="Remark" style={{ padding: '6px !important' }} />
                </Table.Column>
                <Table.Column width={200} >
                    <Table.HeaderCell>File đính kèm </Table.HeaderCell>
                    <Table.Cell dataKey="AppointFileName" style={{ padding: '6px !important' }} />
                </Table.Column>
            </Table>
            {currentCode}
        </>
    )
}

export default StaffAppoint
