import { v4 as uuid } from "uuid";
import React, { useState, useEffect, useMemo, useRef } from "react";

import {
  Table,
  Checkbox,
  Row,
  Col,
  Grid,
  IconButton,
  Stack,
  Divider,
  Dropdown,
  ColumnProps,
  TableProps,
  Panel,
  Container,
  Loader,
  Whisper,
  Popover,
  Button,
  TagPicker,
} from "rsuite";

import Pagination from "components/pagination/Pagination";

import Icon from "@rsuite/icons/lib/Icon";

import { FaAngleDown, FaCheck } from "react-icons/fa";

import { useLocalization } from "hooks/useLocalization";
import { BsThreeDotsVertical } from "react-icons/bs";
import ShowError from "components/Dialogs/Error";
import { MdDelete } from "react-icons/md";

const { Cell } = Table;

export interface TableDataSource {
  PageIndex: number;
  PageSize: number;
  PageCount: number;
  ItemCount: number;
  DataList: any[];
}

export interface ColumnDataProps extends ColumnProps {
  key: string;
  label: string;
  hide?: boolean;
  cell?: Function;
  alwayShow?: boolean;
  cansort?: boolean;
}

export interface TableDataProps extends TableProps {
  reloadKey: string;
  columns: ColumnDataProps[];
  fetchData: any;
  dataKey: any;
  genButtonsWhenChecked?: any;
  genCardViewItem?: any;
  genFilterBlock?: any;
  defaultLayout?: string;
  takeDeleteList: Function;
}

const DefautTableData: TableDataSource = {
  PageIndex: 0,
  PageSize: 10,
  PageCount: 0,
  ItemCount: 0,
  DataList: [],
};

const ColumnToggler = ({
  columns,
  hiddenList,
  setHiddenList,
}: {
  columns: ColumnDataProps[];
  hiddenList: string[];
  setHiddenList: any;
}) => {
  const _l = useLocalization("StandardTable");

  let allChecked = false;
  let indeterminateChecked = false;

  if (hiddenList.length === 0) {
    allChecked = true;
  } else if (hiddenList.length === columns.length) {
    indeterminateChecked = false;
  } else if (hiddenList.length > 0) {
    indeterminateChecked = true;
  }

  const handleCheck = (value: any, checked: any) => {
    const keys: any = !checked
      ? [...hiddenList, value]
      : hiddenList.filter((item) => item !== value);
    setHiddenList(keys);
  };

  const handleCheckAll = (value: any, checked: any) => {
    const keys = !checked
      ? columns.filter((item) => !item.alwayShow).map((item) => item.key)
      : [];
    if (keys) setHiddenList(keys);
  };

  return (
    <Dropdown
      placement="bottomEnd"
      renderToggle={(props: any, ref: any) => {
        return (
          <IconButton
            icon={<BsThreeDotsVertical />}
            size="sm"
            {...props}
            appearance="default"
          />
        );
      }}
    >
      <div style={{ width: "500px" }} className="p-2">
        <Grid fluid>
          <Row>
            <>
              {columns.map((col) => (
                <Col md={12} key={col.key}>
                  {!col.alwayShow ? (
                    <>
                      <Checkbox
                        value={col.key}
                        onChange={handleCheck}
                        checked={
                          !hiddenList.some((item: any) => item === col.key)
                        }
                      >
                        {" "}
                        {col.label}
                      </Checkbox>
                    </>
                  ) : (
                    <>
                      <Checkbox disabled checked={true}>
                        {" "}
                        {col.label}
                      </Checkbox>
                    </>
                  )}
                </Col>
              ))}
              <Col md={24}>
                <Divider />
              </Col>

              <Col md={24}>
                <Checkbox
                  checked={allChecked}
                  indeterminate={indeterminateChecked}
                  onChange={handleCheckAll}
                >
                  {_l("Check All Colums")}
                </Checkbox>
              </Col>
            </>
          </Row>
        </Grid>
      </div>
    </Dropdown>
  );
};

const DeleteCell = ({
  rowData,
  dataKey,
  onClick,
}: {
  rowData: any;
  dataKey: any;
  onClick: any;
}) => {
  return (
    <Icon
      as={MdDelete}
      style={{ fontSize: "20px", cursor: "pointer  ", color: "red" }}
      onClick={() => onClick(rowData[dataKey])}
    />
  );
};

const TableDelete = ({
  columns,
  fetchData,
  dataKey,
  reloadKey,
  genButtonsWhenChecked,
  genFilterBlock,
  genCardViewItem,
  rowHeight,
  height,
  defaultLayout,
  takeDeleteList,
  ...otherTableProps
}: TableDataProps) => {
  const _l = useLocalization("StandardTable");

  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sortBy, setSortBy] = React.useState("");
  const [sortDir, setSortDir] = React.useState("desc");
  const [data, setData] = React.useState(DefautTableData);
  const [layout, setLayout] = useState(
    defaultLayout ? defaultLayout : "TableView"
  );

  const defaultHList: any[] = [];
  const [hiddenList, setHiddenList] = useState(defaultHList);

  const sortLimitValues = [5, 10, 20, 30, 50, 100];
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();

  const [listData, setListData] = useState([] as any);
  const [listDelete, setListDelete] = useState([] as any);

  const handleSortColumn = (sortColumn: any, sortType: any) => {
    setLoading(false);
    setSortColumn(sortColumn);
    setSortType(sortType);
    refineDataSource(sortColumn, sortType);
  };

  const refineDataSource = (sCol: any, sType: any) => {
    if (data.DataList && sCol && sType) {
      let newData = data.DataList.sort((a: any, b: any) => {
        let x: any = a[sCol];
        let y: any = b[sCol];
        if (typeof x === "string") {
          x = x.toLocaleLowerCase();
        }
        if (typeof y === "string") {
          y = y.toLowerCase();
        }

        if (x == y) return 0;
        if (sType === "asc") {
          return x > y ? 1 : -1;
        } else {
          return x < y ? 1 : -1;
        }
      });

      const dataSorted = newData
        .map((item: any) => {
          if (
            listDelete.find((c: any) => {
              return c === item.StaffCode;
            })
          ) {
            return null;
          } else {
            return item;
          }
        })
        .filter((item: any) => {
          return item;
        });

      setListData(dataSorted);
    }
  };

  const refreshData = () => {
    const newData = data.DataList.map((item: any) => {
      if (
        listDelete.find((c: any) => {
          return c === item.StaffCode;
        })
      ) {
        return null;
      } else {
        return item;
      }
    }).filter((item: any) => {
      return item;
    });

    setListData(newData);
  };

  useEffect(() => {
    refreshData();
  }, [data]);

  useEffect(() => {
    takeDeleteList(listDelete);
    refreshData();
  }, [listDelete]);

  useEffect(() => {
    let hclist = columns.filter((c) => c.hide);

    let hlist = hclist.map((c) => {
      return c.key;
    });

    setHiddenList(hlist);
  }, [columns]);

  const reload = async () => {
    setLoading(true);
    const retData = await fetchData({
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortDir: sortDir,
    });

    if (retData.Success) {
      if (retData.Data.splice) {
        const listData = retData.Data.DataList.slice(
          (page - 1) * limit,
          limit * page
        );
        setData({
          PageIndex: retData.Data.PageIndex,
          PageSize: retData.Data.PageSize,
          PageCount: retData.Data.PageCount,
          ItemCount: retData.Data.ItemCount,
          DataList: listData,
        });
      } else {
        setData(retData.Data);
      }
    } else ShowError(retData.ErrorData);
    //console.log(retData.ErrorData)

    setLoading(false);
  };

  useEffect(() => {
    reload();
  }, [limit, page, sortBy, sortDir, reloadKey]);

  const handleDelete = (value: any) => {
    // const findIndex = data.DataList.findIndex((item: any) => {
    //   return item.StaffCode === value;
    // });
    setListDelete((prev: any) => {
      return [...prev, value];
    });
  };

  return (
    <Grid fluid>
      <Row className="pt-1 pb-1 border-bottom">
        <Col md={6}></Col>
        <Col md={18}>
          <Stack
            spacing={6}
            className="float-right pt-1"
            style={{ height: "50px" }}
          >
            {genCardViewItem ? (
              <>
                <span className="text-gray">{_l("Layout")}:</span>
                <Dropdown
                  renderToggle={(props: any, ref: any) => {
                    return (
                      <strong {...props}>
                        {_l(layout)}
                        <Icon as={FaAngleDown} className="ml-1" />
                      </strong>
                    );
                  }}
                >
                  <Dropdown.Item
                    onClick={() => {
                      setLayout("TableView");
                    }}
                    key={uuid()}
                    style={{ width: 200 }}
                    className={layout === "TableView" ? "text-green" : ""}
                  >
                    {_l("TableView")}{" "}
                    {layout === "TableView" ? (
                      <Icon className="text-small float-right" as={FaCheck} />
                    ) : (
                      <></>
                    )}
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => {
                      setLayout("CardView");
                    }}
                    key={uuid()}
                    style={{ width: 200 }}
                    className={layout === "CardView" ? "text-green" : ""}
                  >
                    {_l("CardView")}{" "}
                    {layout === "CardView" ? (
                      <Icon className="text-small float-right" as={FaCheck} />
                    ) : (
                      <></>
                    )}
                  </Dropdown.Item>
                </Dropdown>

                <Divider vertical />
              </>
            ) : (
              <></>
            )}

            <Pagination
              limit={limit}
              setLimit={(value: any) => {
                setLimit(value);
                setPage(1);
              }}
              limitOptions={[10, 50, 100]}
              page={page}
              itemCount={data.ItemCount}
              prev={(value: any) => setPage(value)}
              next={(value: any) => setPage(value)}
            />

            {layout === "TableView" ? (
              <ColumnToggler
                columns={columns}
                hiddenList={hiddenList}
                setHiddenList={setHiddenList}
              />
            ) : (
              <></>
            )}
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          {layout == "CardView" ? (
            <div
              className="card-container"
              style={{ height: `${height ? height : 90}px` }}
            >
              {loading ? <Loader center content="loading" /> : <></>}
            </div>
          ) : (
            <Table
              data={listData}
              loading={loading}
              rowHeight={rowHeight}
              height={height}
              onSortColumn={handleSortColumn}
              sortColumn={sortColumn}
              sortType={sortType}
              {...otherTableProps}
            >
              <Table.Column width={60} align="center">
                <Table.HeaderCell>{""}</Table.HeaderCell>
                <Table.Cell>
                  {(rowData) => (
                    <DeleteCell
                      rowData={rowData}
                      dataKey="StaffCode"
                      onClick={handleDelete}
                    />
                  )}
                </Table.Cell>
              </Table.Column>

              {columns
                .filter(
                  (c) => c.alwayShow || !hiddenList.some((h) => h === c.key)
                )
                .map((column) => {
                  const {
                    key,
                    cell,
                    label,
                    cansort,
                    hide,
                    alwayShow,
                    ...rest
                  } = column;

                  return (
                    <Table.Column {...rest} key={key} sortable flexGrow={1}>
                      <Table.HeaderCell>{label}</Table.HeaderCell>
                      {!cell ? (
                        <Table.Cell dataKey={key} />
                      ) : (
                        <Table.Cell dataKey={key}>
                          {(rowData) => cell(rowData)}
                        </Table.Cell>
                      )}
                    </Table.Column>
                  );
                })}
            </Table>
          )}
        </Col>
      </Row>
    </Grid>
  );
};

export default TableDelete;
