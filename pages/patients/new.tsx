import { useState, useMemo } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import DeleteIcon from "@mui/icons-material/Delete";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

import Layout from "@/page-components/Layout";
import Toast from "@/page-components/Toast";
import { AlertColor } from "@mui/material";

const messageFrequencies = [
  { code: "sunday", text: "Sunday" },
  { code: "monday", text: "Monday" },
  { code: "tuesday", text: "Tuesday" },
  { code: "wednesday", text: "Wednesday" },
  { code: "thursday", text: "Thursday" },
  { code: "friday", text: "Friday" },
  { code: "saturday", text: "Saturday" },
];

export default function NewPatient() {
  const [patient, setPatient] = useState({
    patientId: "",
    name: "",
    mobileNumbers: [""],
    notes: "",
    messagesEvery: ["sunday"],
  });

  const [status, setStatus] = useState<{
    type: AlertColor;
    message: string;
    open: boolean;
  }>({
    type: "error",
    message: "",
    open: false,
  });

  const isFormGood = useMemo(() => {
    if (
      patient.patientId &&
      patient.name &&
      patient.mobileNumbers.filter((mn) => mn !== "").length &&
      patient.messagesEvery.length
    ) {
      return true;
    }

    return false;
  }, [
    patient.patientId,
    patient.name,
    patient.mobileNumbers,
    patient.messagesEvery,
    patient.notes,
  ]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setStatus({
      type: "error",
      message: "",
      open: false,
    });
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;

    if (name === "mobileNumbers") {
      const id = target.id;
      const idSplits = id.split("---");
      if (idSplits.length === 2) {
        const idx = Number(idSplits[1]);
        let updatedMobileNumbers = [...patient.mobileNumbers];
        updatedMobileNumbers[idx] = target.value;
        setPatient((prev) => ({
          ...prev,
          mobileNumbers: updatedMobileNumbers,
        }));
      }
      return;
    }

    if (name === "messagesEvery") {
      const isChecked = target.checked;
      let newMessagesEvery = [...patient.messagesEvery];
      if (isChecked) {
        // add it to the array if its not present
        if (!newMessagesEvery.includes(target.value)) {
          newMessagesEvery.push(target.value);
        }
      } else {
        // pop it from the array if its present
        newMessagesEvery = newMessagesEvery.filter((c) => c != target.value);
      }
      setPatient((prev) => ({
        ...prev,
        messagesEvery: newMessagesEvery,
      }));
      return;
    }

    setPatient((prev) => ({
      ...prev,
      [name]: target.value,
    }));
  }

  function handleNewNumberClick() {
    let updatedMobileNumbers = [...patient.mobileNumbers, ""];
    setPatient((prev) => ({
      ...prev,
      mobileNumbers: updatedMobileNumbers,
    }));
  }

  function handleDeleteNumberClick(index: number) {
    let mobileNumbers = [...patient.mobileNumbers];
    mobileNumbers.splice(index, 1);
    setPatient((prev) => ({
      ...prev,
      mobileNumbers: mobileNumbers,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(patient);
  }

  return (
    <Layout title="Add a patient">
      <Typography variant="h4" component="h1" mt={2}>
        Add a patient
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        onSubmit={handleSubmit}
      >
        <TextField
          id="patient-id"
          name="patientId"
          label="Patient id"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={patient.patientId}
          required
        />

        <TextField
          id="patient-name"
          label="Patient name"
          fullWidth
          margin="dense"
          name="name"
          onChange={handleChange}
          value={patient.name}
          required
        />

        {patient.mobileNumbers.map((mn, index) => (
          <Stack direction="row" alignItems="center" gap={1} key={index}>
            <TextField
              id={`patient-mobile-number---${index}`}
              label="Mobile number"
              margin="dense"
              value={mn}
              name="mobileNumbers"
              onChange={handleChange}
              required
            />
            {index != 0 && (
              <IconButton
                aria-label="delete"
                onClick={() => handleDeleteNumberClick(index)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
        ))}

        {patient.mobileNumbers.length < 3 && (
          <Box mt={1} mb={1}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleNewNumberClick}
              startIcon={<ContactPhoneIcon />}
            >
              Another number
            </Button>
          </Box>
        )}

        <Box mt={2} />
        <FormGroup>
          <Typography component="label">Message every</Typography>
          {messageFrequencies.map((mf) => (
            <FormControlLabel
              key={mf.code}
              control={
                <Checkbox
                  checked={patient.messagesEvery.includes(mf.code)}
                  value={mf.code}
                  onChange={handleChange}
                  name="messagesEvery"
                />
              }
              label={mf.text}
            />
          ))}
        </FormGroup>

        <TextField
          id="patient-notes"
          name="notes"
          margin="dense"
          label="Notes"
          placeholder="Extra notes about this patient"
          multiline
          rows={4}
          fullWidth
          onChange={handleChange}
        />

        <Box mt={2}>
          <Button variant="contained" type="submit" disabled={!isFormGood}>
            Create patient
          </Button>
        </Box>
      </Box>

      <Toast
        open={status.open}
        message={status.message}
        type={status.type}
        handleClose={handleClose}
      />
    </Layout>
  );
}
