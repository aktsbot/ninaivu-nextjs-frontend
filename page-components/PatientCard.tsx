import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { IPatient } from "@/types/Patient";

export default function PatientCard({
  patient,
  skipActions,
}: {
  patient: IPatient;
  skipActions?: boolean;
}) {
  const router = useRouter();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box mb={2}>
          <Chip label={patient.patientId} variant="outlined" />
        </Box>
        <Typography variant="body2">{patient.name}</Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {patient.mobileNumbers.join(",")}
        </Typography>
        <Typography variant="body2">{patient.notes}</Typography>
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
