import { useRouter } from "next/router";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";

import { IPatient } from "@/types/Patient";

export default function PatientCard({ patient }: { patient: IPatient }) {
  const router = useRouter();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <PersonIcon />
        <Typography variant="h5" component="div">
          {patient.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {patient.mobileNumber}
        </Typography>
        <Typography variant="body2">{patient.diagnosis}</Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => router.push(`/patients/${patient.uuid}`)}
        >
          View details
        </Button>
      </CardActions>
    </Card>
  );
}
