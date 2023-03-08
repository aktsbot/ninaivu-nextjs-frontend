import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Nav from "./Nav";

const theme = createTheme();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Nav />
      <CssBaseline />

      <Container maxWidth="md">
        <main>{children}</main>
      </Container>
    </ThemeProvider>
  );
}
