import Typography from "@mui/material/Typography";

import PatientForm from "@/page-components/PatientForm";
import Layout from "@/page-components/Layout";

export default function NewPatient() {
  const patient = {
    patientId: "",
    name: "",
    mobileNumbers: [""],
    notes: "",
    messagesEvery: ["sunday"],
  };

  return (
    <Layout title="Add a patient">
      <Typography variant="h4" component="h1" mt={2}>
        Add a patient
      </Typography>

      <PatientForm patientInfo={patient} />
    </Layout>
  );
}
