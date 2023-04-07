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

      <Grid container spacing={1} mt={2}>
        <Grid item>
          <StatCard count={12} itemText={"patients"} />
        </Grid>
        <Grid item>
          <StatCard count={9} itemText={"messages"} />
        </Grid>
        <Grid item>
          <StatCard count={54} itemText={"credits left"} />
        </Grid>
      </Grid>
    </Layout>
  );
}
