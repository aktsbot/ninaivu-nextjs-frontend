import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IStat {
  count: number;
  itemText: string;
}

export default function StatCard({ count, itemText }: IStat) {
  return (
    <Card sx={{ minWidth: 240 }} variant="outlined">
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          color="text.secondary"
          gutterBottom
        >
          {count}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {itemText}
        </Typography>
      </CardContent>
    </Card>
  );
}
