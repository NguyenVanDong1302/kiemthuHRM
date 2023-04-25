export const convertHMtoTime = (time: Date) => {
  if (!time) {
    return 0;
  }
  const hour = time.getHours();
  const minute = time.getMinutes();
  const calcTime = hour * 60 + minute;
  return calcTime;
};
