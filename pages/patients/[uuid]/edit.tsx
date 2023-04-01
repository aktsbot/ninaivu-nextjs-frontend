import { useRouter } from "next/router";
import useSWR from "swr";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Layout from "@/page-components/Layout";
import PatientForm from "@/page-components/PatientForm";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

export default function PatientEdit() {
  const router = useRouter();
  const { uuid } = router.query;

  const {
    data: patientInfo,
    error,
    isLoading,
  } = useSWR(uuid ? `/api/patients/${uuid}` : null, fetcher);

  if (error) return <p>Failed to load patient</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!patientInfo) return null;

  const patient = {
    uuid: patientInfo.uuid,
    patientId: patientInfo.patientId,
    name: patientInfo.name,
    mobileNumbers: patientInfo.mobileNumbers,
    notes: patientInfo.notes,
    messagesEvery: patientInfo.messagesEvery,
  };

  return (
    <Layout title={`Edit ${patient.name}`}>
      <Typography variant="h4" component="h1" mt={2}>
        Editing {patient.name}
      </Typography>

      <Box mt={2} />

      <PatientForm patientInfo={patient} />
    </Layout>
  );
}
