import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import Patient from "@/models/Patient";
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

  const { method } = req;

  await dbConnect();

  switch (method) {
    case "get":
      try {
        let patientUuid = req.query.patient;
        if (!patientUuid) {
          return res.status(400).json({ success: false });
        }

        // TODO:
        // fix this
        res.status(200).json({
          success: true,
          data: {},
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
