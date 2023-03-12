import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${roboto.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />
    </SessionProvider>
  );
}
