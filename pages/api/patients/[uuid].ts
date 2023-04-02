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

  const { uuid } = req.query;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
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
    case "PUT":
      try {
        let updatePayload = {};
        if (req.body.patientId) {
          updatePayload = { ...updatePayload, patientId: req.body.patientId };
        }
        if (req.body.name) {
          updatePayload = { ...updatePayload, name: req.body.name };
        }
        if (req.body.mobileNumbers) {
          updatePayload = {
            ...updatePayload,
            mobileNumbers: req.body.mobileNumbers,
          };
        }
        if (req.body.notes) {
          updatePayload = { ...updatePayload, notes: req.body.notes };
        }
        if (req.body.messagesEvery) {
          updatePayload = {
            ...updatePayload,
            messagesEvery: req.body.messagesEvery,
          };
        }
        if (req.body.status) {
          updatePayload = { ...updatePayload, status: req.body.status };
        }

        const updateStatus = await Patient.findOneAndUpdate(
          {
            uuid,
          },
          {
            $set: {
              ...updatePayload,
            },
          },
          {
            new: true,
          }
        );

        res.status(200).json({
          success: true,
          data: updateStatus,
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
