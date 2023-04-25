import EditComponent from 'components/EditCell/EditCellComponent';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Stack, Table } from 'rsuite';
import Staff_LaborContract_service from 'services/Staff/Staff_LaborContract_service';
import staff_service from 'services/Staff/staff_service';
import store from 'store/store';
import { v4 as uuid } from 'uuid'
import ConTractStaffEdit from './ConTractStaffEdit';
import { useDispatch } from 'react-redux';
import { setListDataUpload } from 'store/reducers/selectApi';
import { Icon } from '@rsuite/icons';
import { AiFillFileExcel, AiOutlineDownload } from 'react-icons/ai';
import { FaDownload } from 'react-icons/fa';
import { Ellipsis } from 'react-bootstrap/esm/PageItem';


function ContractStaff() {
    const [data, setData] = useState([])
    const { OrgID } = store.getState().orgInfo
    const [keyword, setKeyword] = useState('')
    const { StaffCode } = useParams()
    const isFlagActiveEdit = useSelector((state: any) => state.ui.isFlagActiveEdit)
    const [loading, setLoading] = useState("");
    const [currentCode, setCurrentCode] = useState(<></>);
    const dispatch = useDispatch();
    const fetch = async () => {
        var resp = await Staff_LaborContract_service.getByStaffCode(StaffCode);
        if (resp.Success) {
            console.log(resp.Data);
            setData(resp.Data.Lst_Staff_LaborContract)
        }
        return resp
    }

    const listData = useSelector((state: any) => state.selectApiSlice.ListDataUpload);
    const handleUpdate = (data: any) => {
        setCurrentCode(
            <ConTractStaffEdit
                flag="update"
                code={data}
                onSuccess={reloading}
                uuid={uuid()}
            />
        );
        // console.log(data);
        dispatch(setListDataUpload({
            Url: data.ContractFileUrl,
            FilePath: data.ContractFilePath,
            FileName: data.ContractFileName,
            FlagFileUpload: 1,
            AttFileId: data.AttFileId ? data.AttFileId : '6ff0d905-7e75-4295-95bb-48dcb96bed1f.jpg'
        }));
        console.log(listData);

    }

    const handleDelete = (data: any) => {
        setCurrentCode(
            <ConTractStaffEdit
                flag="delete"
                code={data}
                onSuccess={reloading}
                uuid={uuid()}
            />
        );
    }

    const handleAdd = () => {
        setCurrentCode(
            <ConTractStaffEdit
                flag="add"
                onSuccess={reloading}
                uuid={uuid()}
            />
        );
        dispatch(setListDataUpload({}));
    }

    const reloading = () => {
        setLoading(uuid());
    };
    useEffect(() => {
        fetch()
    }, [loading])

    return (
        <div>
            <Button
                onClick={handleAdd}
            >
                Thêm
            </Button>

            {data && <Table
                data={data}
                height={500}
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
                <Table.Column width={250} >
                    <Table.HeaderCell>Số hợp đồng </Table.HeaderCell>
                    <Table.Cell dataKey="ContractCodeSys" style={{ padding: '6px !important', fontSize: '13px' }} />
                </Table.Column>
                <Table.Column width={200}>
                    <Table.HeaderCell>Ngày ký</Table.HeaderCell>
                    <Table.Cell dataKey="SignDate" />
                </Table.Column>
                <Table.Column width={150}>
                    <Table.HeaderCell>Loại hợp đồng</Table.HeaderCell>
                    <Table.Cell dataKey="mct_ContractTypeName" />
                </Table.Column>
                <Table.Column width={200}>
                    <Table.HeaderCell>Ngày hiệu lực</Table.HeaderCell>
                    <Table.Cell dataKey="EffectiveDate" />
                </Table.Column>
                <Table.Column width={200}>
                    <Table.HeaderCell>Ngày hết hạn</Table.HeaderCell>
                    <Table.Cell dataKey="ExpirationDate" />
                </Table.Column>
                <Table.Column width={150}>
                    <Table.HeaderCell>Chi tiết hợp đồng</Table.HeaderCell>
                    <Table.Cell dataKey="Remark" />
                </Table.Column>
                <Table.Column width={250}>
                    <Table.HeaderCell>Hợp đồng</Table.HeaderCell>
                    <Table.Cell dataKey="ContractFileName">
                        {(rowData: any) => {
                            return (
                                <Stack>
                                    {rowData.ContractFileName ? (
                                        <a href={rowData.ContractFileUrl} target="blank">
                                            <FaDownload />
                                            {
                                                rowData.ContractFileName.length > 25 ?
                                                    rowData.ContractFileName.substring(0, 25) + "..." : rowData.ContractFileName
                                            }
                                        </a>
                                    ) : (
                                        <>
                                            <AiFillFileExcel /> Không có
                                        </>
                                    )}
                                </Stack>
                            );
                        }}
                    </Table.Cell>
                </Table.Column>
            </Table>}
            {currentCode}
        </div >
    )
}

export default ContractStaff
