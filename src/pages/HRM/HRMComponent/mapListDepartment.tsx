import useSelectListDepartment from "hooks/Select/useSelectListDepartment";
import useSelectListPosition from "hooks/Select/useSelectListPosition";
import useSelectStoreDepartment from "hooks/Select/useSelectStoreDepartment";
import useSelectStorePosition from "hooks/Select/useSelectStorePosition";
import React, { useState, useEffect, FC, memo, useRef } from "react";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { Button, Col, Form, IconButton, Row, SelectPicker } from "rsuite";

type Props = {
  item: any[];
  index?: number;
  flag?: string;
  showButton?: boolean;
  setDepartmentList?: any
};

const MapListDepartmentItem: FC<Props> = ({
  item,
  index,
  flag,
  showButton = true,
  setDepartmentList
}: Props) => {
  const formRef: any = useRef();
  const selectListDepartment: any[] = useSelectStoreDepartment();
  const selectListPosition: any[] = useSelectStorePosition();
  const formValue = {
    DepartmentCode: "",
    PositionCode: "",
    md_DepartmentName: '',
    mp_PositionName: ""
  }
  const [selectList, setSelectList] = useState([formValue]);

  const handleAdd = () => {
    setSelectList([formValue, ...selectList]);
  };

  const handleRemove = (index: number) => {
    const list = [...selectList];
    list.splice(index, 1);
    setSelectList(list);
    setDepartmentList(list)
  };

  const handleChangeValue = (value: string | number | null, event: React.SyntheticEvent, index: any, type: any) => {
    const list: any = [...selectList];
    list[index][type] = value;
    setSelectList(list);
    setDepartmentList(list)
  };
  useEffect(() => {
    if (item.length != 0) {
      setSelectList(item)
    }
  }, [item])

  return (
    <div className="map-department-item">
      {selectList.map((item, index) => {
        if (flag == 'detail') {
          return <div key={index}>
            <span>{item.md_DepartmentName}</span> -
            <span>{item.mp_PositionName}</span>
          </div>
        } else {
          return <div key={index} className="list-select d-flex py-1">
            <SelectPicker
              data={selectListDepartment}
              value={item.DepartmentCode}
              onChange={(value, event) => handleChangeValue(value, event, index, "DepartmentCode")}
              valueKey="DepartmentCode"
              labelKey="DepartmentName"
              style={{ width: '170px' }}
            />
            <span style={{ paddingLeft: 10, paddingRight: 10 }}>-</span>
            <SelectPicker
              data={selectListPosition}
              value={item.PositionCode}
              onChange={(value, event) => handleChangeValue(value, event, index, "PositionCode")}
              valueKey="PositionCode"
              labelKey="PositionName"
              style={{ width: '170px' }}
            />
            <IconButton
              icon={index === 0 ? <FiPlus /> : <FiMinus />}
              onClick={() => (index === 0 ? handleAdd() : handleRemove(index))}
            />
          </div>
        }
      })}
    </div>
  )
}


export default memo(MapListDepartmentItem);
