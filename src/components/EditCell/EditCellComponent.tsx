import { Icon } from "@rsuite/icons";
import PermissionContainer from "components/PermissionContainer";
import { ReactNode } from "react";
import { BiEditAlt } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import { EditComponentContainer } from "./styled";

function EditComponent(
  handleEdit: any,
  handleDeleteSingle: any,
  data: any,
  permissionEdit?: string,
  permissionDelete?: string,
  custom?: ReactNode
) {
  return (
    <EditComponentContainer>
      <div className="listEdit" style={{ display: "flex" }}>
        <PermissionContainer permission={permissionEdit ? permissionEdit : ""}>
          <Icon
            className="listEdit__item listEdit__item--edit"
            onClick={() => handleEdit(data)}
            as={BiEditAlt}
          ></Icon>
        </PermissionContainer>
        <PermissionContainer
          permission={permissionDelete ? permissionDelete : ""}
        >
          <Icon
            className="listEdit__item listEdit__item--delete"
            onClick={() => handleDeleteSingle(data)}
            as={FiTrash}
          ></Icon>
        </PermissionContainer>
        {custom}
      </div>
    </EditComponentContainer>
  );
}

export default EditComponent;
