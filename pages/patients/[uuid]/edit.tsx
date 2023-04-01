import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Layout from "@/page-components/Layout";

export default function PatientEdit() {
  return (
    <Layout title="Edit patient">
      <Typography variant="h4" component="h1" mt={2}>
        Editing ...
      </Typography>

      <Box mt={2} />

      <Box mb={4} />
    </Layout>
  );
}
