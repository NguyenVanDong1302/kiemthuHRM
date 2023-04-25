import { v4 as uuid } from "uuid";
import React, { useState, useEffect, useMemo, useRef } from "react";

import { Table, Pagination, Checkbox, Row, Col, Grid, IconButton, Stack, Divider, Dropdown, ColumnProps, TableProps, Panel, Container, Loader, Whisper, Popover, Button } from "rsuite";
import Icon from "@rsuite/icons/lib/Icon";

import { FaAngleDown, FaCheck } from 'react-icons/fa';

import { useLocalization } from "hooks/useLocalization";
import { Block } from "@rsuite/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { ColumnSizer } from "react-virtualized";

import ShowError from 'components/Dialogs/Error'
import FilterDropdown from "./FilterDropdown";


export interface TableDataSource {
    PageIndex: number,
    PageSize: number,
    PageCount: number,
    ItemCount: number,
    DataList: any[]

}

export interface ColumDataProps extends ColumnProps {

    key: string,
    label: string,
    hide?: boolean,
    cell?: Function,
    alwayShow?: boolean,
    cansort?: boolean
}

export interface TableDataProps extends TableProps {

    reloadKey: string,

    columns: ColumDataProps[],
    fetchData: any,
    dataKey: any,
    genButtonsWhenChecked?: any,
    genCardViewItem?: any,
    genFilterBlock?: any
    defaultLayout?: string,

}

const DefautTableData: TableDataSource = {
    PageIndex: 0,
    PageSize: 10,
    PageCount: 0,
    ItemCount: 0,
    DataList: []

};

const CheckCell = ({ checkedKeys, onChange, rowData, dataKey, rowHeight }: { checkedKeys: any, onChange: any, rowData: any, rowHeight?: any, dataKey: any }) => {

    return (
        <div style={{ lineHeight: `${rowHeight ? rowHeight : 32}px` }}>
            <Checkbox
                value={rowData[dataKey]}
                inline
                onChange={onChange}
                checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
            />
        </div>
    )
};

const ColumnToggler = ({ columns, hiddenList, setHiddenList }: { columns: ColumDataProps[], hiddenList: string[], setHiddenList: any }) => {
    const _l = useLocalization("StandardTable");

    let allChecked = false;
    let indeterminateChecked = false;

    if (hiddenList.length === 0) {
        allChecked = true;
    }
    else if (hiddenList.length === columns.length) {
        indeterminateChecked = false;
    }
    else if (hiddenList.length > 0) {
        indeterminateChecked = true;
    }

    const handleCheck = (value: any, checked: any) => {
        const keys: any = !checked ? [...hiddenList, value] : hiddenList.filter(item => item !== value);
        setHiddenList(keys);
    };


    const handleCheckAll = (value: any, checked: any) => {
        const keys = !checked ? columns.filter(item => !item.alwayShow).map(item => item.key) : [];
        if (keys)
            setHiddenList(keys);
    };

    return (
        <Dropdown placement="bottomEnd" renderToggle={(props: any, ref: any) => {
            return <IconButton icon={<BsThreeDotsVertical />} size="sm"  {...props} appearance="default" />
        }
        }>
            <div style={{ width: "500px" }} className="p-2">
                <Grid fluid>
                    <Row>
                        <>
                            {
                                columns.map(col => {
                                    return (
                                        <Col md={12} key={col.key}>
                                            {!col.alwayShow ? <>
                                                < Checkbox
                                                    value={col.key}
                                                    onChange={handleCheck}
                                                    checked={!hiddenList.some((item: any) => item === col.key)}

                                                > {col.label}</Checkbox>
                                            </> : <>
                                                < Checkbox
                                                    disabled
                                                    checked={true}
                                                > {col.label}</Checkbox>
                                            </>
                                            }
                                        </Col>
                                    )
                                }
                                )
                            }
                            <Col md={24}>

                                <Divider />
                            </Col>

                            <Col md={24}>
                                <Checkbox
                                    checked={allChecked}
                                    indeterminate={indeterminateChecked}
                                    onChange={handleCheckAll}
                                >{_l("Check All Colums")}</Checkbox>
                            </Col>
                        </>
                    </Row>
                </Grid>

            </div>
        </Dropdown >
    )
}

const TableStandard2 = ({ columns, fetchData, dataKey, reloadKey, genButtonsWhenChecked, genFilterBlock, genCardViewItem, rowHeight, height, defaultLayout, ...otherRableProps }: TableDataProps) => {


    const _l = useLocalization("StandardTable");


    const [loading, setLoading] = React.useState(false);
    const [limit, setLimit] = React.useState(10);
    const [page, setPage] = React.useState(1);


    const [sortBy, setSortBy] = React.useState('');
    const [sortDir, setSortDir] = React.useState('desc');
    const [data, setData] = React.useState(DefautTableData);
    const [layout, setLayout] = useState(defaultLayout ? defaultLayout : 'TableView');

    const defaultHList: any[] = [];
    const [hiddenList, setHiddenList] = useState(defaultHList);

    const defaultCheckKeys: any[] = [];
    const [checkedKeys, setCheckedKeys] = React.useState(defaultCheckKeys);
    const sortLimitValues = [5, 10, 20, 30, 50, 100];
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();



    const handleSortColumn = (sortColumn: any, sortType: any) => {

        setLoading(false);
        setSortColumn(sortColumn);
        setSortType(sortType);
        refineDataSource(sortColumn, sortType);
    };

    const refineDataSource = (sCol: any, sType: any) => {
        setData((data: any) => {
            // console.log("data ===>>>", data);
            if (data.DataList && sCol && sType) {
                data.DataList = data.DataList.sort((a: any, b: any) => {
                    let x: any = a[sCol];
                    let y: any = b[sCol];
                    if (typeof x === 'string') {
                        x = x.toLocaleLowerCase();
                    }
                    if (typeof y === 'string') {
                        y = y.toLowerCase();
                    }

                    if (x == y) return 0;
                    if (sType === 'asc') {
                        return x > y ? 1 : -1;
                    } else {
                        return x < y ? 1 : -1;
                    }
                });
            }
            return data;

        });

    };

    const handleCheck = (value: any, checked: any) => {
        const keys: any = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };

    let allChecked = false;
    let indeterminateChecked = false;

    if (checkedKeys.length === data.DataList.length) {
        allChecked = true;
    } else if (checkedKeys.length === 0) {
        allChecked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < data.DataList.length) {
        indeterminateChecked = true;
    }

    const handleCheckAll = (value: any, checked: any) => {
        const keys = checked ? data.DataList.map(item => item[dataKey]) : [];
        if (keys)
            setCheckedKeys(keys);
    };

    useEffect(() => {
        let hclist = columns.filter(c => c.hide);

        let hlist = hclist.map(c => { return c.key });

        setHiddenList(hlist);

    }, [columns]);

    const reload = async () => {
        setLoading(true);
        const retData = await fetchData({ page: page, limit: limit, sortBy: sortBy, sortDir: sortDir });
        if (retData.Success) {

            setData(retData.Data);
            setCheckedKeys([]);

        }
        else
            ShowError(retData.ErrorData)

        setLoading(false);

    };

    const getCurrentSortCol = () => {

        let col = columns.find(c => c.key == sortBy);
        if (col) return col.label;

        return "Default";
    };

    const getCheckedItems = (keys: any[]) => {

        if (!keys || keys.length == 0) return [];
        const check = data.DataList.filter(d => keys.some(k => d[dataKey] == k));
        return check

    }

    useEffect(() => {
        reload();
    }, [limit, page, sortBy, sortDir, reloadKey]);


    return (
        <Grid fluid>
            <Row className="pt-1 pb-1 border-bottom">
                <Col md={6}>
                    <Stack spacing={6}>
                        <Checkbox
                            style={{ "marginLeft": 17 }}
                            checked={allChecked}
                            indeterminate={indeterminateChecked}
                            onChange={handleCheckAll}
                        />
                        {
                            checkedKeys.length > 0 ? genButtonsWhenChecked ? genButtonsWhenChecked(getCheckedItems(checkedKeys)) : <></>
                                :
                                <Stack spacing={6}>
                                    <span className="text-gray">{_l("Sort by")}:</span>
                                    <Dropdown renderToggle={(props: any, ref: any) => {
                                        return (
                                            <strong {...props}>
                                                {
                                                    getCurrentSortCol()
                                                }
                                                <Icon as={FaAngleDown} className="ml-1" />
                                            </strong>
                                        );
                                    }} >
                                        {
                                            columns.filter(c => c.cansort).map(col => {
                                                return (
                                                    <Dropdown.Item onClick={() => {
                                                        setSortBy(col.key ? col.key : "");
                                                    }} key={uuid()}
                                                        style={{ width: 200 }}
                                                        className={col.key == sortBy ? "text-green" : ""}
                                                    >
                                                        {col.label} {col.key == sortBy ? <Icon className="text-small float-right" as={FaCheck} /> : <></>}
                                                    </Dropdown.Item>
                                                )

                                            })


                                        }

                                        <Dropdown.Item divider />

                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortDir("asc");
                                            }} key={uuid()}
                                            style={{ width: 200 }}
                                            className={sortDir == "asc" ? "text-green" : ""}
                                        >
                                            {_l("Asc")}  {sortDir == "asc" ? <Icon className="text-small float-right" as={FaCheck} /> : <></>}
                                        </Dropdown.Item>


                                        <Dropdown.Item
                                            onClick={() => {
                                                setSortDir("desc");
                                            }} key={uuid()}
                                            style={{ width: 200 }}
                                            className={sortDir == "desc" ? "text-green" : ""}
                                        >
                                            {_l("Desc")} {sortDir == "desc" ? <Icon className="text-small float-right" as={FaCheck} /> : <></>}
                                        </Dropdown.Item>

                                    </Dropdown>

                                    <FilterDropdown genFilterFunction={genFilterBlock} />

                                </Stack>
                        }

                    </Stack>
                </Col>
                <Col md={18}>
                    <Stack spacing={6} className="float-right pt-1">

                        {genCardViewItem ?
                            <>
                                <span className="text-gray">{_l("Layout")}:</span>
                                <Dropdown renderToggle={(props: any, ref: any) => {
                                    return (
                                        <strong {...props} >
                                            {_l(layout)}
                                            <Icon as={FaAngleDown} className="ml-1" />
                                        </strong>
                                    );
                                }} >

                                    <Dropdown.Item onClick={() => {
                                        setLayout("TableView");
                                    }} key={uuid()}
                                        style={{ width: 200 }}
                                        className={layout === 'TableView' ? "text-green" : ""}
                                    >
                                        {_l("TableView")} {layout === 'TableView' ? <Icon className="text-small float-right" as={FaCheck} /> : <></>}
                                    </Dropdown.Item>

                                    <Dropdown.Item onClick={() => {
                                        setLayout("CardView");
                                    }} key={uuid()}
                                        style={{ width: 200 }}
                                        className={layout === 'CardView' ? "text-green" : ""}
                                    >
                                        {_l("CardView")} {layout === 'CardView' ? <Icon className="text-small float-right" as={FaCheck} /> : <></>}
                                    </Dropdown.Item>





                                </Dropdown>

                                <Divider vertical />
                            </> : <></>
                        }

                        <span className="text-gray">{_l("PageSize")}:</span>
                        <Dropdown renderToggle={(props: any, ref: any) => {
                            return (
                                <span {...props} >
                                    <input value={limit} readOnly style={{ width: "32px", "padding": "0px 3px 0px 3px", "border": "solid 1px #ccc" }} />
                                    <Icon as={FaAngleDown} className="ml-1" />
                                </span>
                            );
                        }} >

                            {

                                sortLimitValues.map(n => {

                                    return (<Dropdown.Item onClick={() => {
                                        setPage(1);
                                        setLimit(n);
                                    }} key={uuid()}
                                        style={{ width: 200 }}
                                        className={limit == n ? "text-green" : ""}
                                    >
                                        {n} {limit == n ? <Icon className="text-small float-right" as={FaCheck} /> : <></>}
                                    </Dropdown.Item>);

                                })
                            }

                        </Dropdown>

                        <Pagination
                            prev
                            next
                            // first
                            // last
                            ellipsis
                            boundaryLinks
                            maxButtons={3}
                            size="xs"
                            //layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            layout={['-', 'pager']}
                            total={data.ItemCount}
                            pages={data.PageCount}
                            limitOptions={[5, 10, 20, 25, 50, 100]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={(val) => { setLimit(val); setPage(1); }}
                        />

                        {layout === "TableView" ?
                            <ColumnToggler columns={columns} hiddenList={hiddenList} setHiddenList={setHiddenList} />
                            : <></>
                        }


                    </Stack>
                </Col>
            </Row>
            <Row>
                <Col md={24}>
                    {layout == "CardView" ?

                        <div className="card-container" style={{ height: `${height ? height : 90}px` }} >
                            {loading ? <Loader center content="loading" /> : <></>}
                            {
                                data.DataList.map(rowData => {
                                    return (
                                        <div className="tb-card" key={uuid()}>
                                            <div className="tb-card-inner">
                                                <div className="tb-card-checkctn" >
                                                    <Checkbox
                                                        value={rowData[dataKey]}
                                                        onChange={handleCheck}
                                                        checked={checkedKeys.some((item: any) => item === rowData[dataKey])}
                                                    />

                                                </div>


                                                <div className="tb-card-content">
                                                    {genCardViewItem(rowData)}
                                                </div>

                                            </div>
                                        </div>)
                                })
                            }

                        </div>
                        :
                        <Table data={data.DataList} loading={loading} rowHeight={rowHeight} height={height}
                            onSortColumn={handleSortColumn}
                            sortColumn={sortColumn}
                            sortType={sortType}

                            {...otherRableProps}>

                            <Table.Column width={60} fixed align="center">
                                <Table.HeaderCell>{""}</Table.HeaderCell>
                                <Table.Cell style={{ "padding": "0" }}>
                                    {
                                        rowData =>
                                            <CheckCell rowData={rowData} rowHeight={rowHeight} dataKey={dataKey} checkedKeys={checkedKeys} onChange={handleCheck} />

                                    }
                                </Table.Cell>

                            </Table.Column>


                            {columns.filter(c => c.alwayShow || !hiddenList.some(h => h === c.key)).map(column => {
                                const { key, cell, label, cansort, hide, alwayShow, ...rest } = column;
                                return (
                                    <Table.Column {...rest} key={key}>

                                        <Table.HeaderCell>{label}</Table.HeaderCell>

                                        {
                                            !cell ?
                                                <Table.Cell dataKey={key} /> :
                                                <Table.Cell dataKey={key} >
                                                    {
                                                        rowData =>
                                                            cell(rowData)
                                                    }
                                                </Table.Cell>

                                        }
                                    </Table.Column>
                                );
                            })}



                        </Table>

                    }
                </Col>
            </Row>
        </Grid >

    );

};

export default TableStandard2;