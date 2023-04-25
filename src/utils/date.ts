export const convertWorkingTime = (time: any, sign?: any) => {
  if (time < 0) {
    return "0h00";
  }
  let currentTime = Math.floor(Number(time));
  let hour: number = Math.floor(currentTime / 60);
  let minute: number = currentTime - hour * 60;
  let cvHour = hour < 10 ? `0${hour}` : `${hour}`;
  let cvMinute = minute < 10 ? `0${minute}` : `${minute}`;
  return `${cvHour}${sign ? sign : `:`}${cvMinute}`;
};

export const convertWorkingTimeToHM = (time: any) => {
  let currentTime = Number(time);
  let hour: number = Math.floor(currentTime / 60);
  let minute: number = currentTime - hour * 60;
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  return date;
};

export const convertDateToHM = (time: any, sign?: any) => {
  const date = new Date(time);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${hours}${sign ? sign : `:`}${minutes}`;
};

export const convertDateToString = (dateString: any) => {
  if (!dateString) {
    return null;
  }
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const convertStringToDate = (date: any) => {
  if (!date) {
    return null;
  }
  return new Date(date);
};

export const convertHMToWorkingTime = (hour: any, minute: any) => {
  return hour * 60 + minute;
};

export const pad = (d: number) => {
  return d < 10 ? "0" + d.toString() : d.toString();
};

export const convertHMS = (param: Date) => {
  const date = new Date(param);
  const dataString = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
  return dataString;
};

export const getValueHM = (param: Date) => {
  const date = new Date(param);
  const dataString = date.getHours() * 60 + date.getMinutes();
  return dataString;
};

export const ConvertToNumber = (param: Date) => {
  const date = new Date(param);
  return date.getHours() * 60 + date.getMinutes();
};

export const ConvertNumberToDate = (param: number) => {
  const hour = param / 60;
  const minute = param % 60;
  const date = new Date();
  return new Date(date.setHours(hour, minute));
};

export const convertDate = (param: Date) => {
  var date = new Date(param);
  var dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  return dateString;
};

export const convertDateToYMDHMS = (time: any) => {
  const dateObject = new Date(time);
  const year = dateObject.getUTCFullYear();
  const month = `0${dateObject.getMonth() + 1}`.slice(-2);
  const day = `0${dateObject.getDate()}`.slice(-2);
  const hour = `0${dateObject.getHours()}`.slice(-2);
  const minute = `0${dateObject.getMinutes()}`.slice(-2);
  const second = `0${dateObject.getSeconds()}`.slice(-2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};
