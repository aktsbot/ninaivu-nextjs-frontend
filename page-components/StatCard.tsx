import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function StatCard() {
  return (
    <Card sx={{ minWidth: 240 }} variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
          gutterBottom
        >
          23
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          patients
        </Typography>
      </CardContent>
    </Card>
  );
}
