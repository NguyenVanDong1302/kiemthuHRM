import React, { memo, ReactNode, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import Icon from "@rsuite/icons/lib/Icon";
import {
  Checkbox,
  Col,
  ColumnProps,
  Container,
  Divider,
  Dropdown,
  Grid,
  IconButton,
  Row,
  Stack,
  Table,
  TableProps,
} from "rsuite";

import { FaAngleDown, FaCheck } from "react-icons/fa";

import { useLocalization } from "hooks/useLocalization";

import ShowError from "components/Dialogs/Error";
import Pagination from "components/pagination/Pagination";
import FilterDropdown from "./FilterDropdown";
export interface TableDataSource {
  PageIndex: number;
  PageSize: number;
  PageCount: number;
  ItemCount: number;
  DataList: any[];
}

export interface ColumnDataProps extends ColumnProps {
  key: string;
  label: string | ReactNode;
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
  hidesort?: boolean;
  hiddenCheckBox?: boolean;
  hiddenPaginate?: boolean;
  hiddenSetCondition?: boolean;
  hiddenLayout?: boolean;
  showtotal?: boolean;
  genButtonsWhenChecked?: any;
  genCardViewItem?: any;
  genFilterBlock?: any;
  defaultLayout?: string;
  takeData?: any;
  customComponent?: ReactNode;
  customRight?: ReactNode;
  listCheck?: any[]; // phụ thuộc vào dataKey
  showViewMode?: boolean;
  customBackground?: any;
  customLimit?: number;
  takeCheckList?: Function;
}

const DefautTableData: TableDataSource = {
  PageIndex: 0,
  PageSize: 10,
  PageCount: 0,
  ItemCount: 0,
  DataList: [],
};

const CheckCell = ({
  checkedKeys,
  onChange,
  rowData,
  dataKey,
  rowHeight,
}: {
  checkedKeys: any;
  onChange: any;
  rowData: any;
  rowHeight?: any;
  dataKey: any;
}) => {
  const isCheck = checkedKeys.some((item: any) => {
    return item === rowData[dataKey];
  });
  return (
    <div style={{ lineHeight: `${rowHeight ? rowHeight : 32}px` }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        className={isCheck ? "checked-row" : ""}
        onChange={onChange}
        checked={isCheck}
      />
    </div>
  );
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
      className="drop-right"
      placement="bottomEnd"
      renderToggle={(props: any, ref: any) => {
        return (
          <IconButton
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17.786"
                height="15.756"
                viewBox="0 0 17.786 15.756"
              >
                <path
                  id="ic_anhien"
                  d="M11.813,15.71a2.451,2.451,0,0,1-1.863-1.68.752.752,0,0,1-.2.027h-9a.75.75,0,0,1,0-1.5h9a.753.753,0,0,1,.2.027q.033-.108.077-.213a2.449,2.449,0,0,1,2.264-1.514h.023a2.507,2.507,0,0,1,2.295,1.7h2.427a.75.75,0,1,1,0,1.5H14.624a2.453,2.453,0,0,1-2.811,1.653Zm-.049-3.193a.947.947,0,0,0-.4.975.936.936,0,0,0,.259.487.951.951,0,0,0,1.036.206.951.951,0,0,0,.586-.866v0a1.008,1.008,0,0,0-.962-.959A.947.947,0,0,0,11.764,12.516ZM3.172,8.624H.75a.75.75,0,0,1,0-1.5H3.172a2.447,2.447,0,0,1,4.665.027.75.75,0,0,1,.2-.027h9a.75.75,0,0,1,0,1.5h-9a.75.75,0,0,1-.2-.027,2.447,2.447,0,0,1-4.666.027Zm1.383-.75A.946.946,0,1,0,5.5,6.927.948.948,0,0,0,4.555,7.874ZM9.95,3.169a.753.753,0,0,1-.2.027h-9a.75.75,0,1,1,0-1.5h9a.753.753,0,0,1,.2.027A2.447,2.447,0,0,1,14.616,1.7h2.421a.75.75,0,1,1,0,1.5H14.615A2.446,2.446,0,0,1,9.95,3.169Zm1.391-.723a.946.946,0,1,0,.946-.946A.948.948,0,0,0,11.341,2.446Z"
                  fill="#5f7d95"
                />
              </svg>
            }
            size="sm"
            ref={ref}
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
                        {col.label}
                      </Checkbox>
                    </>
                  ) : (
                    <>
                      <Checkbox disabled checked={true}>
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

const TableStandard = ({
  columns,
  fetchData,
  dataKey,
  reloadKey,
  hidesort = false,
  hiddenCheckBox = false,
  hiddenPaginate = false,
  hiddenLayout = false,
  showtotal = false,
  genButtonsWhenChecked,
  genFilterBlock,
  genCardViewItem,
  rowHeight,
  hiddenSetCondition,
  customComponent,
  height,
  listCheck,
  defaultLayout,
  showViewMode,
  customBackground,
  customLimit,
  takeCheckList,
  ...otherTableProps
}: TableDataProps) => {
  const _l = useLocalization("StandardTable");
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(customLimit || 10);
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

  useEffect(() => {
    if (takeCheckList) {
      takeCheckList(
        getCheckedItems(checkedKeys),
        checkedKeys.filter((item: any) =>
          data.DataList.some((c: any) => c[dataKey] === item)
        ).length,
        data.DataList.length
      );
    }
  }, [checkedKeys, data]);

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
    if (keys) {
      setCheckedKeys(keys);
    }
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
    } else ShowError(retData.ErrorData);
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
      {!hiddenSetCondition && (
        <Row
          className="d-flex align-items-center"
          style={{
            padding: 5,
            borderBottom: "1px solid #EAF0F4",
          }}
        >
          <Col md={6}>
            <Stack spacing={6}>
              {customComponent ? customComponent : <></>}

              {checkedKeys.length > 0 ? (
                genButtonsWhenChecked ? (
                  <div>
                    {genButtonsWhenChecked(getCheckedItems(checkedKeys))}
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <Stack spacing={6}>
                  <Stack spacing={6}>
                    {!hidesort && (
                      <div className={`table--sort`}>
                        <span className="text-gray">{_l("Sort by")}:</span>
                        <Dropdown
                          renderToggle={(props: any, ref: any) => {
                            return (
                              <strong {...props} ref={ref}>
                                {getCurrentSortCol()}
                                <Icon as={FaAngleDown} className="ml-1" />
                              </strong>
                            );
                          }}
                        >
                          {columns
                            .filter((c) => c.cansort)
                            .map((col) => {
                              return (
                                <Dropdown.Item
                                  onClick={() => {
                                    setSortBy(col.key ? col.key : "");
                                  }}
                                  key={uuid()}
                                  style={{
                                    width: 200,
                                  }}
                                  className={
                                    col.key == sortBy ? "text-green" : ""
                                  }
                                >
                                  {col.label}
                                  {col.key == sortBy ? (
                                    <Icon
                                      className="text-small float-right"
                                      as={FaCheck}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </Dropdown.Item>
                              );
                            })}
                          <Dropdown.Item divider />

                          <Dropdown.Item
                            onClick={() => {
                              setSortDir("asc");
                            }}
                            key={uuid()}
                            style={{ width: 200 }}
                            className={sortDir == "asc" ? "text-green" : ""}
                          >
                            {_l("Asc")}
                            {sortDir == "asc" ? (
                              <Icon
                                className="text-small float-right"
                                as={FaCheck}
                              />
                            ) : (
                              <></>
                            )}
                          </Dropdown.Item>

                          <Dropdown.Item
                            onClick={() => {
                              setSortDir("desc");
                            }}
                            key={uuid()}
                            style={{ width: 200 }}
                            className={sortDir == "desc" ? "text-green" : ""}
                          >
                            {_l("Desc")}
                            {sortDir == "desc" ? (
                              <Icon
                                className="text-small float-right"
                                as={FaCheck}
                              />
                            ) : (
                              <></>
                            )}
                          </Dropdown.Item>
                        </Dropdown>
                      </div>
                    )}
                    <FilterDropdown genFilterFunction={genFilterBlock} />
                  </Stack>
                </Stack>
              )}

              {showtotal ? (
                <>
                  {_l("Total: ")}
                  {`${data.ItemCount}`}
                </>
              ) : (
                <></>
              )}
            </Stack>
          </Col>
          <Col md={18}>
            <Stack spacing={6} className="float-right">
              {showViewMode ? (
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
                      {_l("TableView")}
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
                      {_l("CardView")}
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

              {hiddenPaginate ? (
                <></>
              ) : (
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
              )}

              {layout === "TableView" && !hiddenLayout && (
                <ColumnToggler
                  columns={columns}
                  hiddenList={hiddenList}
                  setHiddenList={setHiddenList}
                />
              )}

              {otherTableProps.customRight}
            </Stack>
          </Col>
        </Row>
      )}
      <Row>
        <Col md={24} className={`row-card-container ${customBackground}`}>
          {layout == "CardView" ? (
            <Container
              style={{
                height: height || "100vh",
                paddingTop: 7,
                overflow: "auto",
              }}
            >
              {data.DataList.map((rowData: any) => {
                return (
                  <div className="tb-card" key={uuid()}>
                    {!hiddenCheckBox && (
                      <div className="tb-card-checkctn">
                        <Checkbox
                          value={rowData[dataKey]}
                          onChange={handleCheck}
                          checked={checkedKeys.some(
                            (item: any) => item === rowData[dataKey]
                          )}
                        />
                      </div>
                    )}

                    {genCardViewItem(rowData)}
                  </div>
                );
              })}
            </Container>
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
              {hiddenCheckBox ? (
                <></>
              ) : (
                <Table.Column width={45} fixed align="center">
                  <Table.HeaderCell>
                    <Checkbox
                      checked={data.DataList.length === 0 ? false : allChecked}
                      indeterminate={indeterminateChecked}
                      onChange={handleCheckAll}
                    />
                  </Table.HeaderCell>
                  <Table.Cell style={{ padding: "0" }}>
                    {(rowData) => (
                      <CheckCell
                        rowData={rowData}
                        rowHeight={rowHeight}
                        dataKey={dataKey}
                        checkedKeys={checkedKeys}
                        onChange={handleCheck}
                      />
                    )}
                  </Table.Cell>
                </Table.Column>
              )}

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
                    <Table.Column {...rest} key={key}>
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

export default memo(TableStandard);
