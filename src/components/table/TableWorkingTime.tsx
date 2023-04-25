import React, { useState, useEffect } from "react";

import { Grid, Row, Col, Toggle, RangeSlider, Button, Checkbox } from "rsuite";

import { useLocalization } from "hooks/useLocalization";
import { Icon } from "@rsuite/icons";
import { MdAdd, MdClose } from "react-icons/md";
import { debug } from "console";

import { convertTime } from "components/functions/convertTime";

function flatArray(arr: any) {
  return arr.reduce((pre: any, cur: any) => {
    return pre.concat(Array.isArray(cur) ? flatArray(cur) : cur);
  }, []);
}

const TableWorkingTime = ({
  detailInfo,
  list,
  getWorkingTime,
  getFlag247,
  style,
}: {
  detailInfo: any;
  list: any;
  getWorkingTime: Function;
  getFlag247: Function;
  style: any;
}) => {
  const [currentFlag247, setCurrentFlag247] = useState(
    detailInfo.Flag247 === "0" ? false : true
  );

  const _l = useLocalization("WorkingTimeList");

  const [add, setAdd] = useState([] as any);

  const step = 5;

  const minValue = 0;
  const maxValue = 1440;

  const days: any = [
    { dayId: 1, name: "Sunday" },
    { dayId: 2, name: "Monday" },
    { dayId: 3, name: "Tuesday" },
    { dayId: 4, name: "Wednesday" },
    { dayId: 5, name: "Thursday" },
    { dayId: 6, name: "Friday" },
    { dayId: 7, name: "Saturday" },
  ];

  const initData: any[] = days.map((item: any, index: any) => {
    return [
      {
        Day: item.dayId,
        TimeStart: minValue,
        TimeEnd: minValue,
        Idx: item.dayId + index,
        add: false,
      },
      {
        Day: item.dayId,
        TimeStart: minValue,
        TimeEnd: minValue,
        Idx: item.dayId + index + 1,
        add: false,
      },
    ];
  });

  const initData247: any[] = days.map((item: any, index: any) => {
    return [
      {
        Day: item.dayId,
        TimeStart: minValue,
        TimeEnd: maxValue,
        Idx: item.dayId + index,
        add: true,
      },
      {
        Day: item.dayId,
        TimeStart: minValue,
        TimeEnd: minValue,
        Idx: item.dayId + index + 1,
        add: false,
      },
    ];
  });

  const initCheck247 = days.map((item: any) => {
    return true;
  });

  const [check, setCheck] = useState(
    detailInfo.Flag247 === "0" ? [] : initCheck247
  );

  const [data, setData] = useState(
    detailInfo.Flag247 === "0" ? initData : initData247
  );

  const reloadData = () => {
    const initList = initData.map((item: any[]) => {
      return item.map((c: any) => {
        let result = list.find((k: any) => {
          return k.Idx === c.Idx;
        });

        if (result) {
          result.add = true;
          return result;
        } else {
          return c;
        }
      });
    });

    const listCheck = days.map((item: any) => {
      return list.some((c: any) => {
        return item.dayId === c.Day;
      });
    });

    const listAdd = initList.map((item: any[]) => {
      if (item[item.length - 1].add === false) return false;
      return true;
    });

    setData(initList);

    setAdd(listAdd);

    setCheck(listCheck);
  };

  useEffect(() => {
    if (detailInfo.Flag247 === "0") {
      setCurrentFlag247(false);
      reloadData();
    } else {
      setCurrentFlag247(true);
    }
  }, [detailInfo]);

  useEffect(() => {
    if (currentFlag247 === true) {
      const listAdd = initData247.map((item: any[]) => {
        if (item[item.length - 1].add === false) return false;
        return true;
      });

      setData(initData247);
      setAdd(listAdd);
      setCheck(initCheck247);
    } else {
      reloadData();
    }
  }, [currentFlag247]);

  useEffect(() => {
    const listData = data.map((item: any[], index: any) => {
      if (add[index]) {
        item[item.length - 1].add = true;
      } else {
        item[item.length - 1].add = false;
      }

      return item;
    });

    setData(listData);
  }, [add]);

  useEffect(() => {
    const listData = data.map((item: any[], index: any) => {
      if (check[index]) {
        item[0].add = true;
      } else {
        item[0].add = false;
        item[item.length - 1].add = false;
      }

      return item;
    });

    setData(listData);

    const listAdd = add.map((item: any, index: any) => {
      if (!check[index]) {
        return false;
      }
      return item;
    });

    setAdd(listAdd);
  }, [check]);

  const takeData = () => {
    const newData = flatArray(
      data.map((item: any[], index: any) => {
        return item.filter((c: any) => {
          return c.add;
        });
      })
    ).map((c: any) => {
      return {
        Day: c.Day,
        TimeStart: c.TimeStart,
        TimeEnd: c.TimeEnd,
        Idx: c.Idx,
        Remark: "",
      };
    });

    return newData;
  };

  useEffect(() => {
    getWorkingTime(takeData());
  }, [data]);

  useEffect(() => {
    getFlag247(currentFlag247);
  }, [currentFlag247]);

  const handleCheck = (index: any) => {
    const listCheck = check.map((item: any, i: any) => {
      return index === i ? !item : item;
    });

    setCheck(listCheck);
  };

  const showTime = (e: any) => {
    return <p>{convertTime(e)}</p>;
  };

  const addSlider = (index: any) => {
    const listAdd = add.map((item: any, i: any) => {
      if (index === i) {
        return !item;
      } else {
        return item;
      }
    });

    setAdd(listAdd);
  };

  const setTime = (value: any, index: any, itemIndex: any) => {
    const listData = data.map((item: any, i: any) => {
      if (i === index) {
        item[itemIndex].TimeStart = value[0];
        item[itemIndex].TimeEnd = value[1];
      }

      return item;
    });

    setData(listData);
  };

  const customizeStyle = {
    backgroundColor: "red",
  };

  return (
    <Grid style={{ display: style === "workingtime" ? "" : "none" }}>
      <Row>
        <Col className="d-flex ">
          <Toggle
            size="sm"
            checked={currentFlag247}
            onClick={() => setCurrentFlag247(!currentFlag247)}
          ></Toggle>
          <span className="font-weight-bold ml-2">
            {_l("24 hours x 7 days")}
          </span>
        </Col>
      </Row>
      {/* <Row>
        <Col md={3}>
          <Button onClick={takeData}>Click me</Button>
        </Col>
      </Row> */}
      <Row>
        <Col md={5}>
          <p className="font-weight-bold"> {_l("Office Hours")}</p>
        </Col>
        <Col md={4}></Col>
        <Col
          md={14}
          className="d-flex align-items-center justify-content-between"
        >
          <span className="font-weight-bold">0h</span>
          <span className="font-weight-bold">12h</span>
          <span className="font-weight-bold">24h</span>
        </Col>
      </Row>

      {data.map((item: any, index: any) => {
        return (
          <Row
            className="d-flex align-items-center pt-2 pb-2"
            key={days[index].dayId}
          >
            <Col md={1}>
              <Checkbox
                checked={check[index] ? true : false}
                onChange={() => {
                  handleCheck(index);
                }}
                disabled={currentFlag247}
              />
            </Col>
            <Col md={4}>
              <p>{days[index].name}</p>
            </Col>
            <Col md={4}>
              <div>
                {item.map((c: any, i: any) => {
                  if (c.add === true) {
                    return (
                      <p key={c.Idx}>
                        {convertTime(c.TimeStart)} - {convertTime(c.TimeEnd)}
                      </p>
                    );
                  }
                })}
              </div>
            </Col>
            <Col
              md={14}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              {item.map((c: any, i: any) => {
                if (c.add === true) {
                  return (
                    <div key={c.Idx} style={{ width: "100%" }}>
                      <RangeSlider
                        style={{ backgroundColor: "green" }}
                        handleClassName="rs-slider-progress-bar"
                        handleStyle={customizeStyle}
                        defaultValue={[minValue, maxValue]}
                        max={maxValue}
                        min={minValue}
                        step={step}
                        value={[c.TimeStart, c.TimeEnd]}
                        tooltip={true}
                        renderTooltip={showTime}
                        disabled={
                          currentFlag247 ? true : check[index] ? false : true
                        }
                        onChange={(value) => {
                          setTime(value, index, i);
                        }}
                      ></RangeSlider>
                    </div>
                  );
                }
              })}
            </Col>
            <Col md={1}>
              <Button
                size="sm"
                onClick={() => {
                  addSlider(index);
                }}
                disabled={currentFlag247 ? true : check[index] ? false : true}
              >
                <Icon
                  as={add[index] ? MdClose : MdAdd}
                  style={{ height: "20px", width: "20px", cursor: "pointer" }}
                ></Icon>
              </Button>
            </Col>
          </Row>
        );
      })}

      <Row className="pb-5"></Row>
    </Grid>
  );
};

export default TableWorkingTime;
