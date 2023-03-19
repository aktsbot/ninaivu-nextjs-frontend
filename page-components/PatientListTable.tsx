import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Date from "./Date";
import { IPatient } from "@/types/Patient";

export default function PatientCard({ patients }: { patients: IPatient[] }) {
  const router = useRouter();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="patient list">
          <TableHead>
            <TableRow>
              <TableCell>Patient Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile numbers</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {patient.patientId}
                </TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.mobileNumbers.join(", ")}</TableCell>
                <TableCell>{patient.notes}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => router.push(`/patients/${patient.uuid}`)}
                  >
                    View details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
