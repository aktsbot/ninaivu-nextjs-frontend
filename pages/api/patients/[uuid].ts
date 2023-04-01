import type { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import dbConnect from "@/lib/dbConnect";
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
        const { uuid } = req.query;

        const patientInfo = await Patient.findOne({
          uuid,
        });

        if (!patientInfo) {
          return res
            .status(404)
            .json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({
          success: true,
          data: patientInfo,
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
