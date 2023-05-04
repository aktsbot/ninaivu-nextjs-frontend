import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import ReportTable from "@/page-components/ReportTable";
import StatCard from "@/page-components/StatCard";
import Layout from "@/page-components/Layout";
import { Box } from "@mui/material";
import { getFormattedDateTime } from "@/lib/pageUtils";

export default function Home() {
  const [doSearch, setDoSearch] = useState(false);
  const [stats, setStats] = useState({
    patients: 0,
    messages: 0,
    ranOn: null,
    credits: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getStats() {
      try {
        const res = await fetch("/api/stats?", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          signal: signal,
        }).then((r) => r.json());
        setStats({ ...res.data });
      } catch (error) {
        console.log(error);
      }
    }

    if (doSearch) {
      getStats();

      return () => {
        controller.abort();
      };
    }
  }, [doSearch]);

  useEffect(() => {
    setDoSearch(true);

    return () => setDoSearch(false);
  }, []);

  return (
    <Layout title="Home">
      <Typography variant="h4" component="h1" mt={2}>
        Stats
      </Typography>

      <Grid container spacing={4} mt={2}>
        <Grid item xs={6}>
          <StatCard
            itemHead={stats.patients.toString()}
            itemText={"patients added"}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            itemHead={stats.messages.toString()}
            itemText={"messages added"}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard
            itemHead={
              stats.ranOn
                ? getFormattedDateTime({ dateString: stats.ranOn })
                : "-"
            }
            itemText={"last run"}
          />
        </Grid>
        <Grid item xs={6}>
          <StatCard itemHead={stats.credits.toString()} itemText={"USD left"} />
        </Grid>
      </Grid>

      <Box mt={4} />
      <ReportTable />
    </Layout>
  );
}
