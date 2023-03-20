import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PeopleIcon from "@mui/icons-material/People";

import Layout from "@/page-components/Layout";
import PatientListTable from "@/page-components/PatientListTable";
import { IPatient } from "@/types/Patient";

export default function Patients() {
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
        <Stack direction="row" alignItems="center" gap={4}>
          <TextField
            id="search-patient-name"
            label="Patient name"
            variant="standard"
          />
          <TextField
            id="search-patient-mobile"
            label="Patient mobile number"
            variant="standard"
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={[
              { t: "active", label: "Active" },
              { t: "inactive", label: "Inactive" },
            ]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Status" variant="standard" />
            )}
          />
          <Button variant="contained">Filter</Button>
        </Stack>
      </Box>

      <Box mt={4}>
        <PatientListTable patients={allPatients} />
      </Box>

      <Box mb={4} />
    </Layout>
  );
}
