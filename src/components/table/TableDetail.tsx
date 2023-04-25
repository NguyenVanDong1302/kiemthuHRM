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
import Icon from "@rsuite/icons/lib/Icon";

import { FaAngleDown, FaCheck, FaAngleUp } from "react-icons/fa";

import { useLocalization } from "hooks/useLocalization";
import { BsThreeDotsVertical, BsFillCaretDownFill } from "react-icons/bs";
import ShowError from "components/Dialogs/Error";
import FilterDropdown from "./FilterDropdown";

import Pagination from "components/pagination/Pagination";

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
  showPagination?: boolean;
  showToggler?: boolean;
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

const TableDetail = ({
  columns,
  fetchData,
  dataKey,
  reloadKey,
  genButtonsWhenChecked,
  genFilterBlock,
  genCardViewItem,
  rowHeight,
  height,
  showPagination,
  showToggler,
  defaultLayout,
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
      if (data.DataList && sCol && sType) {
        data.DataList = data.DataList.sort((a: any, b: any) => {
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
      }
      return data;
    });
  };

  const handleCheck = (value: any, checked: any) => {
    const keys: any = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };

  let allChecked = false;
  let indeterminateChecked = false;

  if (checkedKeys.length === data.DataList.length) {
    allChecked = true;
  } else if (checkedKeys.length === 0) {
    allChecked = false;
  } else if (
    checkedKeys.length > 0 &&
    checkedKeys.length < data.DataList.length
  ) {
    indeterminateChecked = true;
  }

  const handleCheckAll = (value: any, checked: any) => {
    const keys = checked ? data.DataList.map((item) => item[dataKey]) : [];
    if (keys) setCheckedKeys(keys);
  };

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
      setData(retData.Data);
      setCheckedKeys([]);
    } else ShowError(retData.ErrorData);
    //console.log(retData.ErrorData)

    setLoading(false);
  };

  const getCurrentSortCol = () => {
    let col = columns.find((c) => c.key == sortBy);
    if (col) return col.label;

    return "Default";
  };

  const getCheckedItems = (keys: any[]) => {
    if (!keys || keys.length == 0) return [];

    return data.DataList.filter((d) => keys.some((k) => d[dataKey] == k));
  };

  useEffect(() => {
    reload();
  }, [limit, page, sortBy, sortDir, reloadKey]);

  return (
    <Grid fluid>
      <Row className="pt-1 pb-1 border-bottom d-flex align-items-center">
        <Col md={6}>
          <Stack spacing={6}>
            <FilterDropdown genFilterFunction={genFilterBlock} />
          </Stack>
        </Col>
        <Col md={18}>
          <Stack spacing={6} className="float-right">
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

            {showPagination ? (
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
            ) : (
              <></>
            )}

            {layout === "TableView" && showToggler ? (
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
              {data.DataList.map((rowData) => {
                return (
                  <div className="tb-card" key={uuid()}>
                    <div className="tb-card-inner">
                      <div className="tb-card-checkctn">
                        <Checkbox
                          value={rowData[dataKey]}
                          onChange={handleCheck}
                          checked={checkedKeys.some(
                            (item: any) => item === rowData[dataKey]
                          )}
                        />
                      </div>

                      <div className="tb-card-content">
                        {genCardViewItem(rowData)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Table
              data={data.DataList}
              loading={loading}
              rowHeight={rowHeight}
              height={height}
              onSortColumn={handleSortColumn}
              sortColumn={sortColumn}
              sortType={sortType}
              {...otherTableProps}
            >
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
                    <Table.Column
                      {...rest}
                      key={key}
                      sortable={cansort ? true : false}
                    >
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

export default TableDetail;
