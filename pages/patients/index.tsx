import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import PeopleIcon from "@mui/icons-material/People";

import Layout from "@/page-components/Layout";
import PatientListTable from "@/page-components/PatientListTable";
import { IPatient } from "@/types/Patient";

export default function Patients() {
  const patients = [
    {
      uuid: "1234",
      patientId: "1",
      name: "Hari Lal",
      mobileNumber: "+917890987678",
      diagnosis: "Schizophrenia",
    },
    {
      uuid: "1235",
      patientId: "2",
      name: "Kurudi",
      mobileNumber: "+918345678982",
      diagnosis: "Somatic symptom disorder",
    },
    {
      uuid: "1236",
      patientId: "3",
      name: "Geethu",
      mobileNumber: "+918789567898",
      diagnosis: "Insomnia",
    },
    {
      uuid: "1237",
      patientId: "4",
      name: "Chaver Vavachan",
      mobileNumber: "+917867909876",
      diagnosis: "PTSD",
    },
  ];

  const [allPatients, setAllPatients] = useState<IPatient[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    count: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getPatients() {
      const query = new URLSearchParams({
        page: pagination.page.toString(),
      });
      try {
        const res = await fetch("/api/patients?" + query, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          signal: signal,
        }).then((r) => r.json());

        setAllPatients((prev) => [...prev, ...res.data.records]);
        setPagination((prev) => ({
          ...prev,
          totalPages: res.data.totalPages,
          count: res.data.count,
        }));
      } catch (error) {
        console.log(error);
      }
    }
    if (pagination.page) {
      getPatients();

      return () => {
        controller.abort();
      };
    }
  }, [pagination.page]);

  return (
    <Layout title="Patients">
      <Typography variant="h4" component="h1" mt={2}>
        Current patients
        <Box component="span" ml={1}>
          <Badge badgeContent={pagination.count} color="info">
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

      <Box mt={2}>
        <PatientListTable patients={allPatients} />
      </Box>

      <Box mb={4} />
    </Layout>
  );
}
