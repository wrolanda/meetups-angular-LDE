export function getDateString (time: string): string { // '2022-11-11'
  let meetupDate = new Date(time);
  let meetupDateString = meetupDate.getFullYear()+'-'+(meetupDate.getMonth()+1)+'-'+meetupDate.getDate();
  return meetupDateString;
}

export function getTimeString (time: string | number): string { // "16:08"
  let meetupDate = new Date(time);
  let meetupTimeString = ((meetupDate.getHours() < 10) ? "0" : "") + meetupDate.getHours() + ":" 
  + ((meetupDate.getMinutes() < 10) ? "0" : "") + meetupDate.getMinutes();
  return meetupTimeString;
}

export function durationCalculation(date: string, startTime: string, endTime: string): number {
  let date1 = date + ' ' + startTime;
  let date2 = date + ' ' + endTime;
  return (Date.parse(date2) - Date.parse(date1)) / 1000 / 60;
}

export function getEndTime(startTime: string, date: string, duration: number): string {
  let endTimeNumber = Date.parse(startTime + ' ' + date) + (duration * 1000 * 60);
  return getTimeString(endTimeNumber);
}

export function getISODate(time: string, date: string) {
  let newDate = new Date (date + " " + time);
  return newDate.toISOString();
}

