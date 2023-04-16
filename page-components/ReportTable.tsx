import { useState, useEffect } from "react";

import Link from "next/link";

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
import { DateTime } from "./Date";
import { getFormattedDate } from "@/lib/pageUtils";
import { IMessageReportEntry } from "@/types/Message";

export default function ReportTable() {
  const [doSearch, setDoSearch] = useState(false);

  const now = new Date();
  const [filters, setFilters] = useState({
    fromDate: getFormattedDate({
      date: new Date(now.setDate(now.getDate() - 7)),
    }),
    toDate: getFormattedDate({ date: new Date() }),
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
        <label htmlFor="fromDate">From</label>
        <input
          type="date"
          id="fromDate"
          value={filters.fromDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, fromDate: e.target.value }))
          }
        />

        <label htmlFor="toDate">To</label>
        <input
          type="date"
          id="toDate"
          value={filters.toDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, toDate: e.target.value }))
          }
        />

        <Button onClick={() => setDoSearch(true)}>Filter</Button>

        {!doSearch && reportItems.length !== 0 && (
          <Typography component="span" pl={2}>
            <small>{reportItems.length} records found</small>
          </Typography>
        )}
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
                  <Link href={`/patients/${ri.patient?.uuid}`}>
                    {ri.patient?.name}
                  </Link>
                </TableCell>
                <TableCell>{ri.message?.content}</TableCell>
                <TableCell>{ri.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
