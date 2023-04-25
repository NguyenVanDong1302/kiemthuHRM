export const setTime = (time: string) => {
  let currentTime = Number(time);
  let hour: number = Math.floor(currentTime / 60);
  let minute: number = currentTime - hour * 60;
  let newTime = new Date();
  newTime.setHours(hour, minute, 0);
  return newTime;
};
