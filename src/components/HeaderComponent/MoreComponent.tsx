import PermissionContainer from "components/PermissionContainer";
import { memo, useState } from "react";
import { Button, Dropdown, Uploader } from "rsuite";
import { v4 as uuid } from "uuid";

import { MoreInterface } from "components/interface";
import { buildHeaders, buildUrl } from "./buidheaders";

interface Props {
  listButton: MoreInterface[];
}
function MoreComponent(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChangeOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="more-wrapper">
      <Dropdown
        title={
          <div
            className="more-wrapper__button"
            onClick={handleChangeOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17.999"
              height="4"
              viewBox="0 0 17.999 4"
            >
              <path
                id="ic_more"
                d="M1495,6278a2,2,0,1,1,2,2A2,2,0,0,1,1495,6278Zm-7,0a2,2,0,1,1,2,2A2,2,0,0,1,1488,6278Zm-7,0a2,2,0,1,1,2,2A2,2,0,0,1,1481,6278Z"
                transform="translate(-1481.001 -6276)"
                fill="#0e223d"
              />
            </svg>
          </div>
        }
      >
        <div className="more-wrapper__list-button">
          {props.listButton.map((item: MoreInterface) => {
            if (item.upload) {
              return (
                <PermissionContainer
                  key={uuid()}
                  permission={item?.permission ? item.permission : ""}
                >
                  <Uploader
                    key={uuid()}
                    className={`${item.upload.class ? item.upload.class : ""
                      } button-uploader`}
                    action={buildUrl(item.upload.action)}
                    headers={buildHeaders()}
                    onSuccess={item.event}
                    multiple={false}
                    fileListVisible={false}
                  >
                    <button>{item.label}</button>
                  </Uploader>
                </PermissionContainer>
              );
            } else {
              return (
                <PermissionContainer
                  key={uuid()}
                  permission={item?.permission ? item.permission : ""}
                >
                  <button
                    onClick={item.event}
                    className="more-wrapper__item-button"
                  >
                    {item.label}
                  </button>
                </PermissionContainer>
              );
            }
          })}
        </div>
      </Dropdown>
    </div>
  );
}

export default memo(MoreComponent);
