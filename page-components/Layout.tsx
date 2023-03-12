import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Nav from "./Nav";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const pageTitle = `${title} | ninaivu`;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{pageTitle}</title>
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
