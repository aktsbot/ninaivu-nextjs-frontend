import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Layout from "@/page-components/Layout";

export default function NewMessage() {
  return (
    <Layout title="Add a message">
      <Typography variant="h4" component="h1" mt={2}>
        Add a message
      </Typography>

      <Box component="form" noValidate autoComplete="off" mt={2}>
        <TextField
          id="message-content"
          label="Message content"
          multiline
          rows={4}
          fullWidth
        />

        <Box mt={2}>
          <Button variant="contained">Create message</Button>
        </Box>
      </Box>
    </Layout>
  );
}
