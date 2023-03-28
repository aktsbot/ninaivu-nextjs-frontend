import dbConnect from "./lib/dbConnect";
import User from "./models/User";

export const getUserFromDb = async ({ email }: { email: string }) => {
  await dbConnect();
  const user = await User.findOne({ email, status: "active" });
  return user;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
