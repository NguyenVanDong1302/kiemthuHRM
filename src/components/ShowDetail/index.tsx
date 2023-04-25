import { FC } from "react";

type Props = {
  label: any;
  event: any;
  className?: string;
};

const ShowDetail: FC<Props> = ({ label, event, className }: Props) => {
  return (
    <div
      className={`table-show-detail ${className ? className : ""} `}
      onClick={event}
    >
      {label}
    </div>
  );
};

export default ShowDetail;
