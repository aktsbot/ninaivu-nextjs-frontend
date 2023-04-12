import { AlertColor } from "@mui/material";
import { v4 as uuid4 } from "uuid";

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
  let month = objectDate.getMonth();
  let year = objectDate.getFullYear();
  return `${year}-${month}-${day}`;
};
