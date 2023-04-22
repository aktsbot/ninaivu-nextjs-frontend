import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Roboto } from "next/font/google";

import AppContextProvider from "@/contexts/AppContext";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AppContextProvider>
          <Component {...pageProps} />
        </AppContextProvider>
      </LocalizationProvider>
    </SessionProvider>
  );
}
