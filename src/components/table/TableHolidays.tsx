import { v4 as uuid } from "uuid";
import React, { useState, useEffect, useMemo, useRef } from "react";

import {
  Table,
  Pagination,
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
  SelectPicker,
  Input,
  Schema,
} from "rsuite";

import { toast, ToastContainer } from "react-toastify";

import Icon from "@rsuite/icons/lib/Icon";

import { MdDelete } from "react-icons/md";

import { FaAngleDown, FaCheck } from "react-icons/fa";

import { useLocalization } from "hooks/useLocalization";
import { Block } from "@rsuite/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import ShowError from "components/Dialogs/Error";
import FilterDropdown from "./FilterDropdown";

const { Column, Cell, HeaderCell } = Table;

function HolidaysTable({
  data,
  reloadList,
  getHoliday,
  style,
}: {
  data: any[];
  reloadList: any;
  getHoliday: Function;
  style: any;
}) {
  const _l = useLocalization("HolidaysTable");

  const [rowsData, setRowsData] = React.useState([] as any);

  const lstMonths = [
    { MonthCode: "01", MonthName: "01" },
    { MonthCode: "02", MonthName: "02" },
    { MonthCode: "03", MonthName: "03" },
    { MonthCode: "04", MonthName: "04" },
    { MonthCode: "05", MonthName: "05" },
    { MonthCode: "06", MonthName: "06" },
    { MonthCode: "07", MonthName: "07" },
    { MonthCode: "08", MonthName: "08" },
    { MonthCode: "09", MonthName: "09" },
    { MonthCode: "10", MonthName: "10" },
    { MonthCode: "11", MonthName: "11" },
    { MonthCode: "12", MonthName: "12" },
  ];
  const [lstDays, setLstDays] = React.useState([] as any);

  const [holidayName, setHolidayName] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentDay, setCurrentDay] = useState("");

  const [formValue, setFormValue] = useState([]);

  useEffect(() => {
    setRowsData(data ? data : []);
  }, [data]);

  useEffect(() => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    setCurrentMonth(month < 10 ? `0${month}` : `${month}`);
    setCurrentDay(day < 10 ? `0${day}` : `${day}`);
    getDaysOfMonth(currentMonth);
  }, []);

  useEffect(() => {
    if (rowsData) {
      setFormValue(
        rowsData.map((item: any) => {
          return {
            Day: item.Day,
            HolidayName: item.HolidayName,
            Remark: "",
          };
        })
      );
    }
  }, [rowsData]);

  useEffect(() => {
    getHoliday(formValue);
  }, [formValue]);

  const addTableRows = () => {
    const newData = {
      HolidayName: holidayName,
      Day: `${currentDay}-${currentMonth}`,
    };

    const checkTime = rowsData.find((item: any) => item.Day === newData.Day);

    const checkName = rowsData.find(
      (item: any) => item.HolidayName === newData.HolidayName
    );

    if (checkTime && checkName) {
      validate("Time has existed");
    } else {
      if (checkTime) {
        validate("Time has existed");
      } else {
        if (checkName) {
          validate("Name has existed");
        } else {
          if (!holidayName) {
            validate("Require holiday name");
          } else {
            let lstData = [...rowsData, newData];
            setRowsData(lstData);
          }
        }
      }
    }
  };

  const handleDelete = (data: any) => {
    let prevData = [...rowsData];
    setRowsData(prevData.filter((item) => item.Day !== data.Day));
  };

  function validate(errorMsg: string) {
    const errorMessage = _l(errorMsg);

    toast.error(errorMessage.toString(), {
      position: toast.POSITION.BOTTOM_CENTER,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
    });

    toast.clearWaitingQueue();
  }

  const getDaysOfMonth = (month: any) => {
    const year = new Date().getFullYear();

    const date = new Date(year, Number(month), 1);

    if (month !== undefined && month !== null) {
      let days: any = [];
      while (date.getMonth() === Number(month)) {
        let newDate: any = new Date(date);

        days.push(
          newDate.getDate() < 10
            ? { day: `0${newDate.getDate()}` }
            : { day: `${newDate.getDate()}` }
        );
        date.setDate(date.getDate() + 1);
      }

      setLstDays(days);
    }
  };

  return (
    <div
      className="container"
      style={{ display: style !== "workingtime" ? "" : "none" }}
    >
      <Row>
        <Col md={4}>
          <SelectPicker
            name="MonthCode"
            style={{ width: "100%" }}
            labelKey="MonthName"
            valueKey="MonthCode"
            value={currentMonth}
            data={lstMonths} //lstDays
            onChange={(e: any) => {
              setCurrentMonth(e);
              setCurrentDay("01");
              getDaysOfMonth(currentMonth);
            }}
            placeholder={_l("Month")}
          />
        </Col>
        <Col md={4}>
          <SelectPicker
            className="ml-2"
            name="DayCode"
            style={{ width: "100%" }}
            labelKey="day"
            valueKey="day"
            value={currentDay}
            data={lstDays}
            onChange={(e: any) => {
              setCurrentDay(e);
            }}
            placeholder={_l("Day")}
          />
        </Col>
        <Col md={12}>
          <Input
            className="ml-2"
            placeholder={_l("Event")}
            name="HolidayName"
            style={{ width: "100%" }}
            value={holidayName}
            onChange={(currentValue: any) => {
              setHolidayName(currentValue);
            }}
          />
        </Col>
        <Col md={4}>
          <Button appearance="primary" size="md" onClick={addTableRows}>
            {_l("Add")}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col md={20}>
          <Table data={rowsData} autoHeight={true} wordWrap>
            <Column width={100}>
              <HeaderCell>{_l("")}</HeaderCell>
              <Cell>
                {(rowsData) => {
                  return (
                    <Icon
                      onClick={() => {
                        handleDelete(rowsData);
                      }}
                      as={MdDelete}
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                    ></Icon>
                  );
                }}
              </Cell>
            </Column>

            <Column width={300}>
              <HeaderCell className="font-weight-bold">
                {_l("Day - Month")}
              </HeaderCell>
              <Cell dataKey="Day" />
            </Column>
            <Column minWidth={300} flexGrow={1}>
              <HeaderCell className="font-weight-bold">
                {_l("Event")}
              </HeaderCell>
              <Cell dataKey="HolidayName" style={{ wordWrap: "normal" }} />
            </Column>
          </Table>
        </Col>
      </Row>
    </div>
  );
}
export default HolidaysTable;
