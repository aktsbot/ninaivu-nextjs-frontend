import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import MessageIcon from "@mui/icons-material/Message";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Date from "./Date";
import { IMessageReportEntry } from "@/types/Message";
import { IPatient } from "@/types/Patient";

export default function PatientCard({ patient }: { patient: IPatient }) {
  const [allReceipts, setAllReceipts] = useState<IMessageReportEntry[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    count: 0,
    limit: 0,
  });

  const [doSearch, setDoSearch] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getMessageReceipts() {
      const query = new URLSearchParams({
        page: pagination.page.toString(),
        patient: patient.uuid!,
      });
      try {
        const res = await fetch("/api/patients/messages?" + query, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          signal: signal,
        }).then((r) => r.json());

        setAllReceipts((prev) => [...prev, ...res.data.receipts]);
        setPagination((prev) => ({
          ...prev,
          totalPages: res.data.totalPages,
          count: res.data.count,
          limit: res.data.limit,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setDoSearch(false);
      }
    }
    if (pagination.page && doSearch) {
      getMessageReceipts();

      return () => {
        controller.abort();
      };
    }
  }, [pagination.page, doSearch, patient.uuid]);

  useEffect(() => {
    setDoSearch(true);

    return () => setDoSearch(false);
  }, []);

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setAllReceipts([]);
    setPagination((prev) => ({ ...prev, page: value }));
    setDoSearch(true);
  };

  return (
    <>
      <Typography variant="h5" component="h1" mt={2}>
        Message report
        <Box component="span" ml={1}>
          <Badge badgeContent={pagination.count} color="info">
            <MessageIcon color="action" />
          </Badge>
        </Box>
      </Typography>

      <Box
        mt={2}
        mb={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Stack>
          <Pagination
            count={pagination.totalPages}
            page={pagination.page}
            onChange={handlePagination}
          />
        </Stack>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="sms report">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allReceipts.map((row) => (
              <TableRow
                key={row.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Date dateString={row.createdAt as unknown as string} />
                </TableCell>
                <TableCell>{row.message.content}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
