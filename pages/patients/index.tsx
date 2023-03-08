import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Layout from "@/page-components/Layout";

export default function Patients() {
  return (
    <Layout title="Patients">
      <Typography variant="h1">Current patients</Typography>
      <Button variant="contained">Add a patient</Button>
    </Layout>
  );
}
