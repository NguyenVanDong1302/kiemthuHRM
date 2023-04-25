import { Button, Popover, Whisper } from "rsuite";

type Props = {
  children: any;
};

function TooltipComponent({ children }: Props) {
  return (
    <Whisper
      followCursor
      placement="top"
      enterable={true}
      preventOverflow={true}
      speaker={
        <Popover arrow={false}>
          <p
            style={{
              fontSize: "13px",
              padding: "7px",
              borderRadius: "5px",
              color: "#fff",
              // overflow: "hidden",
              opacity: "0.85",
              backgroundColor: "#000",
              maxWidth: "700px",
              wordBreak: "break-all",
            }}
          >
            {children.props.children}
          </p>
        </Popover>
      }
    >
      <p>{children.props.children}</p>
    </Whisper>
  );
}

export default TooltipComponent;
