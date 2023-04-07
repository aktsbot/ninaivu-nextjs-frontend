import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import StatCard from "@/page-components/StatCard";
import Layout from "@/page-components/Layout";

export default function Home() {
  return (
    <Layout title="Home">
      <Typography variant="h4" component="h1" mt={2}>
        Stats
      </Typography>

      <Grid container spacing={4} mt={2}>
        <Grid item xs={6}>
          <StatCard itemHead={"12"} itemText={"patients added"} />
        </Grid>
        <Grid item xs={6}>
          <StatCard itemHead={"9"} itemText={"messages added"} />
        </Grid>
        <Grid item xs={6}>
          <StatCard itemHead={"07/04/2023 at 04:50 pm"} itemText={"last run"} />
        </Grid>
        <Grid item xs={6}>
          <StatCard itemHead={"54"} itemText={"credits left"} />
        </Grid>
      </Grid>
    </Layout>
  );
}
