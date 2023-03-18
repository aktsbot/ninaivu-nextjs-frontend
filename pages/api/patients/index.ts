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

  // console.log("session in handler ", session);
  const loggedInUser = session.user;

  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const patients = await Patient.find(
          {}
        ); /* find all the data in our database */
        res.status(200).json({ success: true, data: patients });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const patient = await Patient.create({
          ...req.body,
          createdBy: loggedInUser.dbUserId,
        }); /* create a new model in the database */
        res.status(201).json({ success: true, data: patient });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
