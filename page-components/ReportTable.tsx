import { useState, useEffect } from "react";

import Link from "next/link";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link as MUILink } from "@mui/material";
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
import Grid from "@mui/material/Grid";

import { DateTime } from "./Date";
import { getFormattedDate } from "@/lib/pageUtils";
import { IMessageReportEntry } from "@/types/Message";

export default function ReportTable() {
  const [doSearch, setDoSearch] = useState(false);

  const now = new Date();
  const [filters, setFilters] = useState({
    fromDate: new Date(
      getFormattedDate({
        date: new Date(now.setDate(now.getDate() - 7)),
      })
    ),
    toDate: new Date(getFormattedDate({ date: new Date() })),
  });
  const [reportItems, setReportItems] = useState<IMessageReportEntry[]>([]);

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

        setReportItems(res.data.records);
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

      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="From"
              format="dd/MM/yyyy"
              value={filters.fromDate}
              onChange={(newValue) => {
                setFilters((prev) => ({ ...prev, fromDate: newValue! }));
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <DatePicker
              label="To"
              value={filters.toDate}
              format="dd/MM/yyyy"
              onChange={(newValue) => {
                setFilters((prev) => ({ ...prev, toDate: newValue! }));
              }}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Button onClick={() => setDoSearch(true)} variant="outlined">
              Filter
            </Button>
            {!doSearch && reportItems.length !== 0 && (
              <Typography component="span" pl={2}>
                <small>{reportItems.length} records found</small>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      {!doSearch && reportItems.length === 0 ? (
        <Typography component="span">
          No records found for this filter{" "}
        </Typography>
      ) : null}

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
            {reportItems.map((ri) => (
              <TableRow
                key={ri.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <DateTime dateString={ri.date as unknown as string} />
                </TableCell>
                <TableCell>
                  <Link href={`/patients/${ri.patient?.uuid}`} passHref>
                    <MUILink>{ri.patient?.name}</MUILink>
                  </Link>
                </TableCell>
                <TableCell>{ri.message?.content}</TableCell>
                <TableCell>{ri.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mb={4} />
    </>
  );
}
