export const convertTime = (time: string) => {
  let currentTime = Number(time);
  let hour: number = Math.floor(currentTime / 60);
  let minute: number = currentTime - hour * 60;
  let cvHour = hour < 10 ? `0${hour}` : `${hour}`;
  let cvMinute = minute < 10 ? `0${minute}` : `${minute}`;
  return `${cvHour}:${cvMinute}`;
};
