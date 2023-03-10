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

import Date from "./Date";
import { IMessageReportEntry } from "@/types/Message";

export default function PatientCard({
  messageReport,
}: {
  messageReport: IMessageReportEntry[];
}) {
  return (
    <>
      <Typography variant="h5" component="h1" mt={2}>
        Message report
        <Box component="span" ml={1}>
          <Badge badgeContent={messageReport.length} color="info">
            <MessageIcon color="action" />
          </Badge>
        </Box>
      </Typography>
      <Box mt={2} />
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
            {messageReport.map((row) => (
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
