import { Button, SelectPicker } from "rsuite";

import { Icon } from "@rsuite/icons";
import { useLocalization } from "hooks/useLocalization";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Pagination = ({
  limit,
  setLimit,
  limitOptions,
  page,
  itemCount,
  prev,
  next,
}: {
  limit: number;
  setLimit: Function;
  limitOptions: Array<Number>;
  page: number;
  itemCount: number;
  prev: Function;
  next: Function;
}) => {
  const _l = useLocalization("Pagination");

  const lastPage = Math.ceil(itemCount / limit);

  const handleChange = (value: any) => {
    setLimit(value);
  };

  const goPrev = () => {
    if (page > 1) {
      prev(page - 1);
    }
  };

  const goNext = () => {
    if (page < lastPage) {
      next(page + 1);
    }
  };

  return (
    <div className="filter-box">
      <span className="show-by-number">
        {_l("Show ")}
        <SelectPicker
          size="xs"
          value={limit}
          onChange={handleChange}
          cleanable={false}
          searchable={false}
          data={limitOptions.map((key: any) => ({ value: key, label: key }))}
        />
      </span>
      <span style={{ marginLeft: 10, color: "#0E223D" }}>
        {_l(`${page} - ${lastPage} out of ${lastPage}`)}
      </span>
      <Button
        size="xs"
        appearance="subtle"
        disabled={page === 1 ? true : false}
        onClick={goPrev}
        style={{ opacity: page === 1 ? "0.5" : "1" }}
      >
        <Icon as={GrFormPrevious} style={{ fontSize: "18px" }}></Icon>
      </Button>

      <Button
        size="xs"
        appearance="subtle"
        onClick={goNext}
        disabled={page === lastPage ? true : false}
        style={{ opacity: page === lastPage ? "0.5" : "1" }}
      >
        <Icon as={GrFormNext} style={{ fontSize: "18px" }}></Icon>
      </Button>
    </div>
  );
};

export default Pagination;
