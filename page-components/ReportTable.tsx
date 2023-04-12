import { useState, useEffect } from "react";

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

import { getFormattedDate } from "@/lib/pageUtils";

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

  const [doSearch, setDoSearch] = useState(false);

  const now = new Date();
  const [filters, setFilters] = useState({
    fromDate: getFormattedDate({ date: new Date() }),
    toDate: getFormattedDate({
      date: new Date(now.setDate(now.getDate() - 7)),
    }),
  });
  const [reportItems, setReportItems] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getReports() {
      const query = new URLSearchParams({
        fromDate: filters.fromDate.toString(),
        toDate: filters.toDate.toString(),
      });

      try {
        const res = await fetch("/api/message_receipts?" + query, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          signal: signal,
        }).then((r) => r.json());
      } catch (error) {
        console.log(error);
      } finally {
        setDoSearch(false);
      }
    }

    if (doSearch) {
      getReports();

      return () => {
        controller.abort();
      };
    }
  }, [doSearch, filters.fromDate, filters.toDate]);

  useEffect(() => {
    setDoSearch(true);

    return () => setDoSearch(false);
  }, []);

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
