import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

import Layout from "@/page-components/Layout";
import PatientCard from "@/page-components/PatientCard";
import PatientMessageReport from "@/page-components/PatientMessageReport";

import { IPatient } from "@/types/Patient";
import { IMessageReportEntry } from "@/types/Message";
import dbConnect from "@/lib/dbConnect";
import Patient from "@/models/Patient";

interface QParams extends ParsedUrlQuery {
  uuid?: string;
}

export default function PatientInfo({
  patient,
}: {
  patient: IPatient;
  messageReport: IMessageReportEntry[];
}) {
  return (
    <Layout title="Patient Info">
      <Typography variant="h4" component="h1" mt={2}>
        Patient Info
      </Typography>

      <Box mt={2} />
      <PatientCard patient={patient} skipActions />

      <Box mt={2} />
      <PatientMessageReport patient={patient} />
      <Box mb={4} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  await dbConnect();
  const { uuid } = ctx.params as QParams;
  const patientInfo = await Patient.findOne(
    {
      uuid,
    },
    {
      uuid: 1,
      patientId: 1,
      name: 1,
      mobileNumbers: 1,
      notes: 1,
      messagesEvery: 1,
      updatedAt: 1,
      status: 1,
    }
  ).lean();

  if (!patientInfo) {
    return { notFound: true };
  }

  patientInfo._id = patientInfo._id.toString();
  patientInfo.updatedAt = patientInfo.updatedAt.toString();
  // console.log(patientInfo);

  return {
    props: {
      patient: {
        ...patientInfo,
      },
    },
  };
};
