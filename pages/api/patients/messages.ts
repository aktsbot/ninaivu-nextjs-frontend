import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import MessageReceipt from "@/models/MessageReceipt";
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
    case "GET":
      console.log("getting called");
      try {
        let patientUuid = req.query.patient;
        console.log(patientUuid);
        if (!patientUuid) {
          return res.status(400).json({ success: false });
        }

        const patientInfo = await Patient.findOne(
          {
            uuid: patientUuid,
          },
          { _id: 1 }
        );

        // TODO:
        // fix this
        const receipts = await MessageReceipt.find({
          patient: patientInfo._id,
        }).populate("message");
        res.status(200).json({
          success: true,
          data: {
            receipts,
          },
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
