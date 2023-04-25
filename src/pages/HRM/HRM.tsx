import Avatar from 'components/Avatar'
import { ShowError } from 'components/Dialogs/Dialogs'
import HeaderComponent from 'components/HeaderComponent/HeaderComponent'
import { MoreInterface } from 'components/interface'
import { ColumnDataProps } from 'components/table/TableDetail'
import { useLocalization } from 'hooks/useLocalization'
import { useWindowSize } from 'hooks/useWindowSize'
import React, { useEffect, useState } from 'react'
import { ButtonToolbar, Col, Container, FlexboxGrid, Header, IconButton, Input, InputGroup, Panel, Row, SelectPicker, Stack, Tag, TagPicker } from 'rsuite'
import { toast } from 'react-toastify'
import { Content, Grid } from 'rsuite'
import staff_service from 'services/Staff/staff_service'
import store from 'store/store'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'
import { BsDot, BsPlusCircle, BsSearch } from 'react-icons/bs'
import { FiClock, FiTrash } from 'react-icons/fi'
import { Icon } from '@rsuite/icons'
import { Button } from 'rsuite'
import general_master_service from 'services/general_master_service'
import department_service from "services/Admin/department_service";
import Staff_Type_service from 'services/Staff/Staff_Type_service'
import TableStandard2 from 'components/table/TableStandard2'
import TableStandard from 'components/table/TableStandard'
import HRMComponent from './HRMComponent/HRMComponent'
import { BiEditAlt } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'


function HRM() {
    const _l = useLocalization("Staff_Staff_Pause");
    const _t = useLocalization("toast");
    const _m = useLocalization("More");
    const _b = useLocalization("Button");

    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState("")
    const [paramValue, setParamValue] = useState({})
    const windowSize = useWindowSize()
    const { OrgId, NetworkId } = store.getState().orgInfo
    const [ftOrg, setFtOrg] = useState([])
    const [ftDep, setFtDep] = useState(OrgId)
    const [ftStaffType, setFtStaffType] = useState(OrgId)
    const [loadDataKey, setLoadDataKey] = useState('')
    const [listOrg, setListOrg] = useState([])
    const [listDep, setListDep] = useState([])
    const [listStaffType, setListStaffType] = useState([])


    const [condition, setCondition] = useState(
        {} as {
            ReasonID: string;
            DepartmentCode: string;
            HistDateFrom: string;
            HistDateTo: string;
            BackDayFrom: string;
            BackDayTo: string;
        }
    );

    const handleAdd = () => {

    }

    const handleExportExcel = () => {
        staff_service.exportExcel(paramValue).then((resp: any) => {
            if (resp.Success) {
                const url = resp.Data.Url;
                if (url) {
                    toast.success(_t("export excel success"));
                    window.location.href = url;
                } else {
                    toast.error(_t("Don't have Url to link"));
                }
            } else {
                ShowError(resp.ErrorData);
            }
        });
    };

    const fetchData = async ({
        page,
        limit,
        sortBy,
        sortDir,
    }: {
        page: number;
        limit: number;
        sortBy: string;
        sortDir: string;
    }) => {
        var orgId = '';
        if (ftOrg !== undefined && ftOrg !== null && ftOrg.length > 0) {
            orgId = ftOrg.join(',');
        } else {
            orgId = '4221896000'
        }

        const param = {
            ...condition,
            KeyWord: keyword,
            OrgID: orgId,
            Ft_PageIndex: page - 1,
            Ft_PageSize: 50,
            sortColumn: sortBy,
            sortBy: sortDir,
        };

        setParamValue(param);

        const resp = await staff_service.search(param);

        if (resp.Success) {
            const data = resp.Data.DataList;
            if (data) {
                const newResp = data.map((item: any, index: number) => {
                    return {
                        __idx: resp.Data.PageIndex * limit + index + 1,
                        ...item,
                    };
                });
                const param = {
                    ...resp,
                    Data: {
                        ...resp.Data,
                        DataList: newResp,
                    },
                };
                return param;
            }
        }
        return resp;
    };

    const StatusCell = ({ status }: { status: any }) => {
        if (status == "INACTIVE")
            return (
                <span style={{ background: "#FF9116", color: '#fff', padding: "3px 10px 3px 10px", width: '120px', textAlign: 'center' }} className="text-sm">
                    {_l('Đã nghỉ việc')}
                </span>
            );

        return (
            <span style={{ backgroundColor: '#168305', color: '#fff', padding: "3px 10px 3px 10px", width: '120px', textAlign: 'center' }} className="text-sm">
                {_l('Đang làm việc')}
            </span>
        );
    };

    const genCardViewItem = (item: any) => {
        return (
            <Grid fluid className="p-0">
                <Row className="p-0 row-card-view" style={{ backgroundColor: '#ffffff' }}>
                    <Col md={18} className="p-0">
                        <FlexboxGrid align="middle">
                            <Col>
                                <Avatar
                                    className="mr-2"
                                    circle
                                    src={item.AvatarUrl ? item.AvatarUrl : item.AvatarUrl}
                                    text={`${item.AvatarUrl ? item.AvatarUrl : item.StaffName}`}
                                />
                            </Col>
                            <Col>
                                <Stack spacing={5}>
                                    <Panel>
                                        <div className="text-gray text-bold">
                                            <Link to={`/nnt/edit/${item.MST}`} title={item.StaffFullName}>
                                                <Stack>
                                                    <span className="text-gray">{item.StaffFullName}</span>
                                                </Stack>
                                            </Link>
                                        </div>
                                        <div className="text-gray text-small">
                                            <Stack spacing={10}>
                                                {item.StaffEmail} <BsDot />
                                                {item.StaffPhone} <BsDot />
                                            </Stack>
                                        </div>
                                    </Panel>
                                </Stack>
                            </Col>
                        </FlexboxGrid>
                    </Col>
                    <Col md={6} className="p-0">
                        <Panel className="float-right text-lg-right">
                            <div style={{ lineHeight: '30px' }}>
                                <Stack spacing={5}>
                                    {item.StaffCode}
                                </Stack>
                            </div>
                            <p>
                                {
                                    <StatusCell status={item.FlagActive} />
                                }
                            </p>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    };


    const columnList: ColumnDataProps[] = [
        {
            key: '',
            label: '',
            width: 70,
            cell: (dataRow: any) => {
                return <>
                    <Stack spacing={5}>
                        <Icon
                            className="listEdit__item listEdit__item--edit"
                            // onClick={() => handleEdit(dataRow)}
                            style={{
                                fontSize: '20px ',
                                color: '#949494',
                                cursor: 'pointer'
                            }}
                            as={BiEditAlt}
                        ></Icon>
                        <Icon
                            className="listEdit__item listEdit__item--edit " style={{
                                fontSize: '20px ',
                                color: 'red',
                                cursor: 'pointer'
                            }}
                            as={AiOutlineDelete}
                        ></Icon>
                    </Stack>

                </>
            }
        },
        {
            key: "__idx",
            label: _l("STT"),
            width: 50,
            resizable: true,
        },
        {
            key: "StaffCode", // Mã nhân viên
            label: _l("Mã Nhân Viên"),
            width: 200,
            resizable: true,
            cansort: true,
        },

        {
            key: "StaffName", // Họ tên
            label: _l("Họ Tên"),
            width: 300,
            resizable: true,
            cell: (dataRow: any) => {
                return HRMComponent({ dataRow });
            }
        },
        {
            key: "StaffPhone", // Điện thoại
            label: _l("Điện Thoại"),
            width: 200,
            resizable: true,
        },
        {
            key: "StaffEmail", // Email
            label: _l("Email"),
            width: 200,
            resizable: true,
        },
        {
            key: "DepartmentName", // Phòng ban
            label: _l("Phòng Ban"),
            width: 230,
            resizable: true,
        },
        {
            key: "PositionName", // Chức vụ
            label: _l("Chức Vụ"),
            width: 230,
            resizable: true,
        },
        {
            key: "StaffStatus", // Chức vụ
            label: _l("Trạng Thái"),
            width: 230,
            resizable: true,
            cell: (rowData: any) => (<StatusCell status={rowData.StaffStatus} />)
        },

    ];

    const listMore: MoreInterface[] = [
        {
            label: _m("Export Excel"),
            event: handleExportExcel,
        },
    ];
    const loadOrgList = async () => {
        let resp = await general_master_service.org_GetAllActive();
        if (resp.Success) {
            if (resp.Data != null) {
                // console.log(resp.Data);
                setListOrg(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
    };

    const loadDepList = async () => {
        let resp = await department_service.getAllActive()
        if (resp.Success) {
            if (resp.Data != null) {
                // console.log(resp.Data);
                setListDep(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
    }
    const loadStaffTypeList = async () => {
        let resp = await Staff_Type_service.getAllActive()
        if (resp.Success) {
            if (resp.Data != null) {
                // console.log(resp.Data);
                setListStaffType(resp.Data);
            }
        }
        else {
            ShowError(resp.ErrorData);
        }
    }


    const reloading = () => {
        setLoading(uuid());
    };

    const handleFilter = () => {
        // console.log(ftOrg);
        reloadList()
    }
    const genButtonsWhenChecked = (checkedKeys: string[]) => {
        return (
            <Button color="yellow" appearance="primary">
                <Stack spacing={6}>
                    <Icon>
                        <FiTrash />
                    </Icon>
                    Delete
                </Stack>
            </Button>
        );
    };



    useEffect(() => {
        loadOrgList()
        loadDepList()
        loadStaffTypeList()
    }, [])

    const genFilterBlock = (funcClose: any) => (
        <div style={{ width: "300px", maxHeight: "400px", overflowY: "auto" }} className="p-3">

            <p className=" text-normal mb-1">{_l("Tổ chức")}</p>

            <TagPicker
                name="OrgID"
                size="sm"
                style={{ width: '100%' }}
                labelKey='Name'
                valueKey='Id'
                // key={uuid()}
                data={listOrg}
                onChange={setFtOrg}
                value={ftOrg} />

            <p className=" text-normal mb-1 mt-3">{_l("Phòng ban")}</p>
    
            <p className=" text-normal mb-1 mt-3">{_l("Loại nhân viên")}</p>
            <SelectPicker
                size="sm"
                value={ftStaffType}
                data={listStaffType}
                style={{ width: '100%' }}
                // key={uuid()}
                labelKey="GroupName"
                valueKey="StaffType"
                placeholder={_l("All Staff Types")}
                onChange={setFtStaffType}

            />

            <Button onClick={() => {
                handleFilter()
                funcClose()
            }} className="mt-3 full-width" color="green" appearance="primary" size="sm">Ok</Button>
        </div>
    )


    const reloadList = () => {
        setLoadDataKey(uuid())
    }

    return (
        <div className='wrapper-container'>
            <Container>
                <Grid fluid className='p-0'>
                    <Header>
                        <Grid fluid>
                            <Row>
                                <Col md={8}></Col>
                                <Col md={8}>
                                    <Stack spacing={5} className="p-2">
                                        <InputGroup inside style={{ width: "300px" }} size="sm">
                                            <InputGroup.Button>
                                                <Icon as={BsSearch}></Icon>
                                            </InputGroup.Button>
                                            <Input placeholder={_l('Search')}
                                                value={keyword}
                                                onChange={(value) => {
                                                    setKeyword(value);
                                                    reloadList();
                                                }
                                                }
                                            />
                                        </InputGroup>
                                        <Link to={`/${NetworkId}/HRM/staffCreate`} title={_l("Add new")}>
                                            <Button
                                                size="sm"
                                            >
                                                <Icon as={BsPlusCircle} className="mr-1" />
                                                <span>{_l('Add new')}</span>
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Col>
                                <Col md={8}></Col>
                            </Row>
                        </Grid>
                    </Header>
                    <Content>
                        <TableStandard
                            // genFilterBlock={genFilterBlock}
                            reloadKey={loadDataKey}
                            columns={columnList}
                            genButtonsWhenChecked={genButtonsWhenChecked}
                            genFilterBlock={genFilterBlock}
                            dataKey="StaffCode"
                            fetchData={fetchData}
                            // reloadKey={loading}
                            height={windowSize.height - 170}
                            genCardViewItem={genCardViewItem}
                            defaultLayout="TableView"
                            showViewMode={true}
                        />
                    </Content>
                </Grid>
            </Container>
        </div>
    )
}

export default HRM
