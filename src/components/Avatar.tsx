import { Avatar as RA, AvatarProps } from "rsuite";

export interface MAvatarProps extends AvatarProps {
  text?: string;
  src?: string;
  className?: string;
}
export default function Avatar({ text, src, ...props }: MAvatarProps) {
  if (src) return <RA src={src} {...props}></RA>;
  if (text && text.length > 0) {
    let av = "";
    let arr = text.split(" ");
    if (arr.length == 1) {
      av = text.substring(0, 1);
    } else if (arr.length > 1) av = `${arr[0][0]}${arr[arr.length - 1][0]}`;

    return <RA {...props}>{av.toUpperCase()}</RA>;
  }

  return <></>;
}
