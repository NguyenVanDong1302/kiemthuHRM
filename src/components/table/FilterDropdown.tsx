import React, { useState } from "react";
import { Divider, Whisper, Popover } from "rsuite";

import Dropdown from "components/dropdown/DropdownDiv";

import Icon from "@rsuite/icons/lib/Icon";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import { useLocalization } from "hooks/useLocalization";
export default function FilterDropdown({
  genFilterFunction,
}: {
  genFilterFunction: any;
}) {
  const _l = useLocalization("StandardTable");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const close = () => {
    setDropdownOpen(false);
  };

  return genFilterFunction ? (
    <>
      <Dropdown
        closeWhenClickOutside={false}
        isOpen={dropdownOpen}
        onChange={(open: any) => setDropdownOpen(open)}
        className="pr-2"
        menuContainerTag="div"
        buttonTemplate={
          <span className="filterContainer">
            {_l("Filter")} <Icon as={FaAngleDown} className="ml-1" />
          </span>
        }
        menuTemplate={<div>{genFilterFunction(close)}</div>}
      />
    </>
  ) : (
    <></>
  );
}
