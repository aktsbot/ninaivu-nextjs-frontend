import { useContext } from "react";
import { useRouter } from "next/router";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { IPatient } from "@/types/Patient";
import { capitalize } from "@mui/material";
import { AppContext } from "@/contexts/AppContext";

export default function PatientCard({
  patient,
  skipActions,
}: {
  patient: IPatient;
  skipActions?: boolean;
}) {
  const router = useRouter();
  const { addAlert } = useContext(AppContext);

  async function updatePatient({ status }: { status: "active" | "inactive" }) {
    try {
      const res = await fetch(`/api/patients/${patient.uuid}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      addAlert({
        message: "Patient has been updated",
        type: "success",
      });
      router.push("/patients");
    } catch (error) {
      addAlert({
        message: "Failed to update patient",
        type: "error",
      });
    }
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box mb={2}>
          <Chip label={patient.patientId} variant="outlined" />
        </Box>
        <Typography variant="body2">{patient.name}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {patient.mobileNumbers.join(", ")}
        </Typography>
        <Typography variant="body2" mt={1}>
          Messages every{" "}
          {patient.messagesEvery.map((d) => capitalize(d)).join(", ")}
        </Typography>

        <Typography variant="body2" mt={1} color="text.secondary">
          {patient.notes}
        </Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => router.push(`/patients/${patient.uuid}/edit`)}
          >
            Edit
          </Button>

          {patient.status && patient.status === "active" ? (
            <Button
              color="error"
              size="small"
              onClick={() => updatePatient({ status: "inactive" })}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              color="success"
              size="small"
              onClick={() => updatePatient({ status: "active" })}
            >
              Activate
            </Button>
          )}
        </Stack>
      </CardContent>
      {!skipActions && (
        <CardActions>
          <Button
            size="small"
            onClick={() => router.push(`/patients/${patient.uuid}`)}
          >
            View details
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
