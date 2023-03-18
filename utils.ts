import { AlertColor } from "@mui/material";
import { v4 as uuid4 } from "uuid";

import dbConnect from "./lib/dbConnect";
import User from "./models/User";

export const getUserFromDb = async ({ email }: { email: string }) => {
  await dbConnect();
  const user = await User.findOne({ email, status: "active" });
  return user;
};

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
