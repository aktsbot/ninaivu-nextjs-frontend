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
