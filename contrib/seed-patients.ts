import mongoose from "mongoose";

import User from "../models/User";
import Patient from "../models/Patient";

if (!process.env.MONGODB_URI) {
  console.error(`env MONGODB_URI is not set`);
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("DB connection failed", error.message));

const names = [
  "Donnell Dunn",
  "Lyle Mckinney",
  "Gregory Bailey",
  "Alicia Cunningham",
  "Emory Goodwin",
  "Tod Ortiz",
  "Shauna Guerrero",
  "Ricardo Williamson",
  "Saundra Bowman",
  "Bryant Carter",
  "Terence Pruitt",
  "Bernadine Dickerson",
  "Man Jensen",
  "Julio Andrade",
  "Eula Lang",
  "Coleen Lamb",
  "Michael Ayala",
  "Imelda Huynh",
  "Kirk Church",
  "Julianne Wagner",
  "Toney Gilmore",
  "Gail Wall",
  "Daisy Anderson",
  "Juana Turner",
  "Marlon Evans",
];

const mobileNumbers = ["+919999999999"];

const generatePatientList = ({ userId }: { userId: string }) => {
  const list = [];
  for (const index in names) {
    const n = names[index];
    const o = {
      patientId: `PT${1000 + index}`,
      name: n,
      notes: "test-user",
      messagesEvery: ["monday", "tuesday"],
      createdBy: userId,
      mobileNumbers,
    };
    list.push(o);
  }
  return list;
};

async function main() {
  const activeUser = await User.findOne({
    status: "active",
  });

  if (!activeUser) {
    console.error("No active user found in db");
    process.exit(1);
  }

  const dummyPatients = generatePatientList({ userId: activeUser._id });
  await Patient.insertMany(dummyPatients);
  console.log("Patients inserted");
  process.exit(0);
}

main();
