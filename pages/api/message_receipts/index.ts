import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import MessageReceipt from "@/models/MessageReceipt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  // console.log("session in handler ", session);
  const loggedInUser = session.user;

  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      let fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 7);
      let toDate = new Date();
      try {
        const records = await MessageReceipt.find({
          date: {
            $gt: fromDate,
            $lte: toDate,
          },
        });
        res.status(200).json({
          data: {
            records,
          },
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      res.status(400).json({ success: false });
      break;
  }
}
