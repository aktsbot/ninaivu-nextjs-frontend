import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Layout from "@/page-components/Layout";

export default function Home() {
  return (
    <Layout title="Home">
      <Typography variant="h1">Hey there</Typography>
      <Button variant="contained">Hello World</Button>
    </Layout>
  );
}
