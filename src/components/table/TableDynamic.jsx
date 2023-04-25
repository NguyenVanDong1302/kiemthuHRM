// @ts-nocheck

import Dropdown from "components/dropdown/DropdownDiv";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSortBy, useTable } from "react-table";
import { Pagination } from "rsuite";

const DataTable = ({ columnData, funcFetchData, funcReloadRef }) => {
  const [tutorials, setTutorials] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [currentDetailCode, setCurrentDetailCode] = useState(<></>);

  const pageSizes = [3, 6, 9];

  tutorialsRef.current = tutorials;

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["pageIndex"] = page - 1;
    }

    if (pageSize) {
      params["pageSize"] = pageSize;
    }

    return params;
  };

  const retrieveTutorials = async () => {
    const params = getRequestParams(searchTitle, page, pageSize);

    var retData = await funcFetchData(params);

    setTutorials(retData.data);
    setCount(retData.pageCount);
  };

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return <input type="checkbox" ref={resolvedRef} {...rest} />;
    }
  );

  const refreshList = () => {
    retrieveTutorials();
  };

  React.useEffect(() => {
    funcReloadRef.current = refreshList;
  }, []);

  const removeAllTutorials = () => {};

  const findByTitle = () => {
    setPage(1);
    retrieveTutorials();
  };

  const deleteTutorial = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex].id;
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const columns = useMemo(() => columnData, [columnData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable(
    {
      columns,
      data: tutorials,
      manualSortBy: true,
    },
    useSortBy
  );

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await retrieveTutorials();
      // ...
    }
    fetchData();
  }, [page, pageSize, sortBy]);

  return (
    <>
      <div className="list row">
        <div className="col-md-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-2 text-lg-right">{"Items per Page: "}</div>
        <div className="col-md-2">
          <select
            onChange={handlePageSizeChange}
            value={pageSize}
            className="form-control"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <Dropdown
            isOpen={dropdownOpen}
            onChange={(open) => setDropdownOpen(open)}
            className="p-2"
            menuContainerTag="div"
            buttonTemplate={<button className="btn btn-default">...</button>}
            menuTemplate={
              <div className="p-2">
                <div>
                  <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} />{" "}
                  Toggle All
                </div>
                {allColumns.map((column) => (
                  <span key={column.id} className="mr-5">
                    <label>
                      <input
                        type="checkbox"
                        {...column.getToggleHiddenProps()}
                      />{" "}
                      {column.Header}
                    </label>
                  </span>
                ))}
                <br />
              </div>
            }
          />
        </div>

        <div className="col-md-12 list">
          <div className="mt-3">
            <Pagination
              total={count}
              limit={pageSize}
              activePage={page}
              onChangePage={setPage}
              prev
              last
              next
              first
              size="md"
            />
          </div>

          <table
            className="table table-striped table-bordered"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <i className="fa fa-arrow-down"></i>
                          ) : (
                            <i className="fa fa-arrow-up"></i>
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>{currentDetailCode}</div>
    </>
  );
};

export default DataTable;
