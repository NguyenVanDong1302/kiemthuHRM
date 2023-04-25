import { Button } from "rsuite";

type Props = {
  checked: any[];
  handleDelete: Function;
  handleUpdate: Function;
};

function GenButtonWhenChecked(
  checked: any[],
  handleDelete: Function,
  handleUpdate: Function
) {
  const deleteComponent = () => {
    return (
      <Button
        onClick={() => handleDelete(checked)}
        className="mr-2"
        appearance="primary"
        color="green"
      >
        Delete
      </Button>
    );
  };

  const EditComponent = () => {
    return (
      <Button
        onClick={() => handleUpdate(checked)}
        className="mr-2"
        appearance="primary"
        color="orange"
      >
        Edit
      </Button>
    );
  };

  return (
    <div className="d-flex align-items-center">
      {checked.length > 1 ? (
        deleteComponent()
      ) : (
        <>
          {EditComponent()} {deleteComponent()}
        </>
      )}
    </div>
  );
}

export default GenButtonWhenChecked;
