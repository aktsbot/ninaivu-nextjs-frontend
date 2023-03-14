import { useState } from 'react';

import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import DeleteIcon from '@mui/icons-material/Delete';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

import Layout from "@/page-components/Layout";

export default function NewPatient() {

  const [patient, setPatient] = useState({
    patientId: '',
    name: '',
    mobileNumbers: [''],
    notes: '',
    messagesEvery: ['sunday']
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;

    if (name === 'mobileNumbers') {
      const id = target.id;
      const idSplits = id.split('---')
      if (idSplits.length === 2) {
        const idx = Number(idSplits[1]);
        let updatedMobileNumbers = [...patient.mobileNumbers];
        updatedMobileNumbers[idx] = target.value;
        setPatient(prev => ({
          ...prev,
          mobileNumbers: updatedMobileNumbers
        }))
      }
      return;
    }

    setPatient((prev) => ({
      ...prev,
      [name]: target.value
    }))
  }

  function handleNewNumberClick() {
    let updatedMobileNumbers = [...patient.mobileNumbers, ''];
    setPatient(prev => ({
      ...prev,
      mobileNumbers: updatedMobileNumbers
    }))
  }

  function handleDeleteNumberClick(index: number) {
    let mobileNumbers = [...patient.mobileNumbers]
    mobileNumbers.splice(index, 1);
    setPatient(prev => ({
      ...prev,
      mobileNumbers: mobileNumbers
    }))
  }

  return (
    <Layout title="Add a patient">
      <Typography variant="h4" component="h1" mt={2}>
        Add a patient
      </Typography>

      <Box component="form" noValidate autoComplete="off" mt={2}>
        <TextField
          id="patient-id"
          name="patientId"
          label="Patient id"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={patient.patientId}
        />

        <TextField
          id="patient-name"
          label="Patient name"
          fullWidth
          margin="dense"
          name="name"
          onChange={handleChange}
          value={patient.name}
        />

        {
          patient.mobileNumbers.map((mn, index) => <Stack direction="row" alignItems="center" gap={1} key={index}>
            <TextField
              id={`patient-mobile-number---${index}`}
              label="Mobile number"
              margin="dense"
              value={mn}
              name="mobileNumbers"
              onChange={handleChange}
            />
            {index != 0 &&
              <IconButton aria-label="delete" onClick={() => handleDeleteNumberClick(index)}>
                <DeleteIcon />
              </IconButton>
            }
          </Stack>)
        }

        {patient.mobileNumbers.length < 3 &&

          <Box mt={1} mb={1}>
            <Button size="small" variant="outlined" onClick={handleNewNumberClick} startIcon={<ContactPhoneIcon />}>Another number</Button>
          </Box>
        }


        <FormControl fullWidth margin="dense">
          <InputLabel id="patient-message-frequency-label">
            Message frequency
          </InputLabel>
          <Select
            labelId="patient-message-frequency-label"
            id="patient-message-frequency"
            value={10}
            label="Message frequency"
            onChange={() => { }}
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
