import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Nav from "./Nav";

const theme = createTheme();

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title} | ninaivu</title>
        <meta property="og:title" content={title} key="title" />
      </Head>

      <Nav />
      <CssBaseline />

      <Container maxWidth="md">
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  );
}
