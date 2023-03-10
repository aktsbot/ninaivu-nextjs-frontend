import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PeopleIcon from "@mui/icons-material/People";

import Layout from "@/page-components/Layout";
import PatientCard from "@/page-components/PatientCard";

export default function Patients() {
  const patients = [
    {
      uuid: "1234",
      name: "Hari Lal",
      mobileNumber: "+917890987678",
      diagnosis: "Schizophrenia",
    },
    {
      uuid: "1235",
      name: "Kurudi",
      mobileNumber: "+918345678982",
      diagnosis: "Somatic symptom disorder",
    },
    {
      uuid: "1236",
      name: "Geethu",
      mobileNumber: "+91865437890982",
      diagnosis: "Insomnia",
    },
    {
      uuid: "1237",
      name: "Chaver Vavachan",
      mobileNumber: "+917867909876",
      diagnosis: "PTSD",
    },
  ];

  return (
    <Layout title="Patients">
      <Typography variant="h4" component="h1" mt={2}>
        Current patients
        <Box component="span" ml={1}>
          <Badge badgeContent={patients.length} color="info">
            <PeopleIcon color="action" />
          </Badge>
        </Box>
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="search-patient-name"
          label="Search with patient name"
          variant="standard"
          fullWidth
        />
      </Box>

      <Grid container mt={2} spacing={1}>
        {patients.map((p) => (
          <Grid item key={p.uuid}>
            <PatientCard patient={p} />
          </Grid>
        ))}
      </Grid>

      <Box mb={4} />
    </Layout>
  );
}
