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
      diagnosis: "Trauma related disorders",
    },
  ];

  return (
    <Layout title="Patients">
      <Typography variant="h4" component="h1" mt={2}>
        Current patients
        <Badge badgeContent={patients.length} color="info">
          <PeopleIcon color="action" />
        </Badge>
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="search-patient-name"
          label="Search with patient name"
          variant="standard"
          fullWidth
        />
      </Box>

      <Grid
        container
        mt={2}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {patients.map((p) => (
          <Grid item xs={6} key={p.uuid}>
            <PatientCard patient={p} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
