import { ShowError } from 'components/Dialogs/Dialogs';
import EditComponent from 'components/EditCell/EditCellComponent';
import ButtonCustomize from 'components/button/Button';
import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Stack, Table } from 'rsuite';
import Mst_RelativeInfo_service from 'services/Staff/Mst_RelativeInfo_service';
import Staff_Edit_Experience from './RelativeEdit';
import { v4 as uuid } from 'uuid'
import { Icon } from '@rsuite/icons';
import { AiOutlineUser } from 'react-icons/ai';


function RelativeList() {
    const [currentCode, setCurrentCode] = useState(<></>)
    const [loading, setLoading] = useState(false)
    const [dataRelativeInfo, setDataRelativeInfo] = useState([]);
    const { StaffCode } = useParams()
    const [load, setLoad] = useState("");
    const fetchData = async () => {
        const data = await Mst_RelativeInfo_service.GetByStaffCode(StaffCode);
        if (data.Success) {
            const dataAfter = data.Data.Lst_Mst_RelativeInfo?.map(
                (item: any, index: number) => {
                    return { ...item, idx: ++index };
                }
            );
            setDataRelativeInfo(dataAfter);
            return dataAfter;
        } else {
            ShowError(data.ErrorData);
        }
    };
    const handleCreateRelative = () => {

    }
    const reloading = async () => {
        setLoading(true);
        await fetchData();
        setLoading(false);
    };

    useEffect(() => {
        reloading();
    }, [load]);
    const handleUpdateRelative = (dataRow: any) => {
        return setCurrentCode(
            <Staff_Edit_Experience uuid={uuid()} flag='update' code={dataRow} onSuccess={reloading} />
        )
    }
    const handleDeleteRelative = (dataRow: any) => {
        return setCurrentCode(
            <Staff_Edit_Experience uuid={uuid()} flag='delete' code={dataRow} onSuccess={reloading} />
        )
    }

    useEffect(() => {
        fetchData()
    }, [uuid])

    const isFlagActiveEdit = useSelector((state: any) => state.ui.isFlagActiveEdit)
    return (
        <div style={{
            overflow: "scroll",
            height: '350px'
        }}>
            <Col md={24}>
                <>
                    <div className='detail-staff__header'>
                        <div className='detail-header'>
                            <span> <Icon as={AiOutlineUser} /></span>
                            <h6> Thông tin cá nhân</h6>
                        </div>
                        {isFlagActiveEdit && (
                            <Stack
                                spacing={5}
                                justifyContent="flex-end"
                                style={{ marginTop: "10px" }}
                            >
                                <ButtonCustomize onClick={handleCreateRelative}>
                                    Thêm người thân
                                </ButtonCustomize>
                            </Stack>
                        )}
                    </div>
                    {currentCode}
                    <Table
                        loading={loading}
                        virtualized
                        autoHeight
                        data={dataRelativeInfo}
                    >
                        {isFlagActiveEdit && (
                            <Table.Column width={60} fixed>
                                <Table.HeaderCell>{" "}</Table.HeaderCell>
                                <Table.Cell>
                                    {(rowData) =>
                                        EditComponent(
                                            (rowData: any) => { handleUpdateRelative(rowData) },
                                            (rowData: any) => {
                                                handleDeleteRelative(rowData);
                                            },
                                            rowData
                                        )
                                    }
                                </Table.Cell>
                            </Table.Column>
                        )}
                        <Table.Column resizable width={80} align="center">
                            <Table.HeaderCell>STT</Table.HeaderCell>
                            <Table.Cell dataKey="idx" />
                        </Table.Column>

                        <Table.Column width={130}>
                            <Table.HeaderCell>Quan hệ</Table.HeaderCell>
                            <Table.Cell dataKey="Relationship" />
                        </Table.Column>

                        <Table.Column width={200}>
                            <Table.HeaderCell>Họ tên</Table.HeaderCell>
                            <Table.Cell dataKey="FullName" />
                        </Table.Column>

                        <Table.Column width={200}>
                            <Table.HeaderCell>Ngày sinh</Table.HeaderCell>
                            <Table.Cell dataKey="DateOfBirth" />
                        </Table.Column>
                        <Table.Column width={200}>
                            <Table.HeaderCell>Nghề nghiệp</Table.HeaderCell>
                            <Table.Cell dataKey="Career" />
                        </Table.Column>
                    </Table>
                </>
            </Col>
        </div>
    )
}

export default RelativeList
