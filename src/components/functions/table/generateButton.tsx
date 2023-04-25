import { Icon } from "@rsuite/icons";
import { FiTarget, FiEdit2, FiTrash } from "react-icons/fi";
import { Stack, IconButton } from "rsuite";
import { useLocalization } from "hooks/useLocalization";

export const generateButton = ({
  checkedKeys,
  handleDetail,
  handleEdit,
  handleDelete,
}: {
  checkedKeys: string[];
  handleDetail: Function;
  handleEdit: Function;
  handleDelete: Function;
}) => {
  const _l = useLocalization("");

  if (checkedKeys.length == 1) {
    return (
      <Stack spacing={6}>
        <IconButton
          size="xs"
          appearance="primary"
          onClick={() => handleDetail(checkedKeys)}
          color="green"
        >
          <Icon as={FiTarget}></Icon>
          {_l("View")}
        </IconButton>
        <IconButton
          size="xs"
          appearance="primary"
          onClick={() => handleEdit(checkedKeys)}
        >
          <Icon as={FiEdit2}></Icon>
          {_l("Edit")}
        </IconButton>
        <IconButton
          size="xs"
          appearance="primary"
          color="orange"
          onClick={() => handleDelete(checkedKeys)}
        >
          <Icon as={FiTrash}></Icon>
          {_l("Delete")}
        </IconButton>
      </Stack>
    );
  }
  if (checkedKeys.length > 1) {
    return (
      <Stack spacing={6}>
        <IconButton
          size="xs"
          appearance="primary"
          color="orange"
          onClick={() => handleDelete(checkedKeys)}
        >
          <Icon as={FiTrash}></Icon>
          {_l("Delete")}
        </IconButton>
      </Stack>
    );
  }
};
