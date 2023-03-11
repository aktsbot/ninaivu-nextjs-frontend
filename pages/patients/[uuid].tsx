import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

import Layout from "@/page-components/Layout";
import PatientCard from "@/page-components/PatientCard";
import PatientMessageReport from "@/page-components/PatientMessageReport";

import { IPatient } from "@/types/Patient";
import { IMessageReportEntry } from "@/types/Message";

interface QParams extends ParsedUrlQuery {
  uuid?: string;
}

export default function PatientInfo({
  patient,
  messageReport,
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
      <PatientMessageReport messageReport={messageReport} />
      <Box mb={4} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { uuid } = ctx.params as QParams;
  // const profile = await getProfileData(username);
  // if (!profile) {
  //   return { notFound: true };
  // }
  return {
    props: {
      patient: {
        uuid: "1234",
        patientId: "1",
        name: "Hari Lal",
        mobileNumber: "+917890987678",
        diagnosis: "Schizophrenia",
      },
      messageReport: [
        {
          uuid: "abc",
          message: {
            uuid: "def",
            content: "This is a test sms",
            createdAt: "2023-03-10T19:23:31.961Z",
            updatedAt: "2023-03-10T19:23:31.961Z",
          },
          status: "sent", // pending, sent, failed
          createdAt: "2023-03-10T19:23:31.961Z",
          updatedAt: "2023-03-10T19:23:31.961Z",
        },
        {
          uuid: "def",
          message: {
            uuid: "ghi",
            content:
              "மார்கழி பூவே மார்கழி பூவே உன் மடி மேலே ஓர் இடம் வேண்டும் மெத்தை மேல் கண்கள் மூடவும் இல்லை உன்மடி சேர்ந்தால் கனவுகள் கொள்ளை",
            createdAt: "2023-03-09T19:23:31.961Z",
            updatedAt: "2023-03-09T19:23:31.961Z",
          },
          status: "failed", // pending, sent, failed
          createdAt: "2023-03-09T19:23:31.961Z",
          updatedAt: "2023-03-09T19:23:31.961Z",
        },
      ],
    },
  };
};
