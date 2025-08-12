import React from "react";

const hariList = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const bulanList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

interface DateFormatProps {
  dateString: string;
}

const DateFormat: React.FC<DateFormatProps> = ({ dateString }) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  const hari = hariList[date.getDay()];
  const dd = String(date.getDate()).padStart(2, "0");
  const mmm = bulanList[date.getMonth()];
  const yyyy = date.getFullYear();
  return <span>{`${hh}:${mm}:${ss} - ${hari}, ${dd} ${mmm} ${yyyy}`}</span>;
};

export default DateFormat;
