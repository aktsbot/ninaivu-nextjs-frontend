import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

export default function ReportTable() {
  const data = [
    {
      id: 1,
      patient: "Rami Malek",
      message: "Foobar is gold",
      status: "sent",
      date: "2021-09-08",
    },
    {
      id: 2,
      patient: "James Malek",
      message: "No, foobar is not gold",
      status: "failed",
      date: "2021-09-07",
    },
  ];

  return (
    <>
      <Typography variant="h4" component="h2" my={2}>
        Report
      </Typography>

      <Box>
        <label htmlFor="fromDate">From</label>
        <input type="date" id="fromDate" />

        <label htmlFor="toDate">To</label>
        <input type="date" id="toDate" />

        <Button>Filter</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="report list">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow
                key={d.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {d.date}
                </TableCell>
                <TableCell>{d.patient}</TableCell>
                <TableCell>{d.message}</TableCell>
                <TableCell>{d.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
