import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import Scheduler from "@/models/Scheduler";
import Message from "@/models/Message";
import Patient from "@/models/Patient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const stats = {
          messages: 0,
          patients: 0,
          ranOn: null,
          credits: 0,
        };

        const promises = [
          Message.countDocuments({}),
          Patient.countDocuments({}),
          Scheduler.findOne({}, null, { sort: { _id: -1 }, limit: 1 }),
        ];

        const [messages, patients, scheduler] = await Promise.all(promises);
        stats.messages = messages;
        stats.patients = patients;

        if (scheduler.ranOn) {
          stats.ranOn = scheduler.ranOn;
        }

        if (scheduler.credits) {
          stats.credits = scheduler.credits;
        }

        res.status(200).json({
          success: true,
          data: stats,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
