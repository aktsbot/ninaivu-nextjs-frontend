import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import Message from "@/models/Message";

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
      try {
        let query: {
          [key: string]: any;
        } = {
          status: "active",
        };
        let page = 1;
        if (req.query.page) {
          page = parseInt(req.query.page as string);
        }

        // console.log("query ", query);

        const limit = 20;
        const skip = page * limit - limit;
        const [messageCount, allMessageCount] = await Promise.all([
          Message.countDocuments({
            ...query,
          }),
          Message.countDocuments({
            status: "active",
          }),
        ]);
        const messages = await Message.find(
          { ...query },
          {
            uuid: 1,
            content: 1,
            createdAt: 1,
          },
          {
            skip,
            limit,
          }
        ); /* find all the data in our database */
        const totalPages = Math.ceil(messageCount / limit);
        res.status(200).json({
          success: true,
          data: {
            records: messages,
            count: messageCount,
            page,
            totalPages,
            allCount: allMessageCount,
            limit,
          },
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const message = await Message.create({
          ...req.body,
          createdBy: loggedInUser.dbUserId,
        });
        res.status(201).json({ success: true, data: message });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
