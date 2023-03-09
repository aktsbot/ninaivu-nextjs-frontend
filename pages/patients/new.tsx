import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Layout from "@/page-components/Layout";

export default function NewPatient() {
  return (
    <Layout title="Add a patient">
      <Typography variant="h4" component="h1" mt={2}>
        Add a patient
      </Typography>

      <Box component="form" noValidate autoComplete="off" mt={2}>
        <TextField
          id="patient-name"
          label="Patient name"
          fullWidth
          margin="dense"
        />
        <TextField
          id="patient-diagnosis"
          label="Diagnosis"
          fullWidth
          margin="dense"
        />
        <TextField
          id="patient-mobile-number"
          label="Mobile number"
          fullWidth
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="patient-message-frequency-label">
            Message frequency
          </InputLabel>
          <Select
            labelId="patient-message-frequency-label"
            id="patient-message-frequency"
            value={10}
            label="Message frequency"
            onChange={() => {}}
          >
            <MenuItem value={10}>Every Sunday</MenuItem>
            <MenuItem value={20}>Every Monday</MenuItem>
            <MenuItem value={30}>Every Tuesday</MenuItem>
          </Select>
        </FormControl>

        <Box mt={2}>
          <Button variant="contained">Create patient</Button>
        </Box>
      </Box>
    </Layout>
  );
}
