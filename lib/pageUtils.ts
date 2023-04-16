import { AlertColor } from "@mui/material";
import { v4 as uuid4 } from "uuid";
import { parseISO, format } from "date-fns";

export const makeAlertObj = ({
  type,
  message,
}: {
  type: AlertColor;
  message: string;
}) => {
  return {
    id: uuid4(),
    type,
    message,
  };
};

export const getFormattedDate = ({ date }: { date: Date }) => {
  let objectDate = new Date(date);
  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  let year = objectDate.getFullYear();

  let strMonth = month.toString();
  if (month < 10) {
    strMonth = `0${month}`;
  }

  let strDay = day.toString();
  if (day < 10) {
    strDay = `0${day}`;
  }
  return `${year}-${strMonth}-${strDay}`;
};

export const getFormattedDateTime = ({
  dateString,
}: {
  dateString: string | null;
}) => {
  if (!dateString) {
    return "";
  }
  const date = parseISO(dateString);
  return format(date, "dd/LL/yyyy hh:mm aaa");
};
