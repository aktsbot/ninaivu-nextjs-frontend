import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
import Patient from "@/models/Patient";
import Message from "@/models/Message";
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

        let page = 1;
        if (req.query.page) {
          page = parseInt(req.query.page as string);
        }
        const limit = 20;
        const skip = page * limit - limit;

        const count = await MessageReceipt.countDocuments({
          patient: patientInfo._id,
        });
        // TODO:
        // fix this
        const receipts = await MessageReceipt.find(
          {
            patient: patientInfo._id,
          },
          {},
          { skip, limit }
        ).populate("message");

        const totalPages = Math.ceil(count / limit);
        res.status(200).json({
          success: true,
          data: {
            receipts,
            count,
            page,
            totalPages,
            limit,
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
