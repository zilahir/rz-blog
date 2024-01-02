import React from "react";

import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";

import "../styles/main.css";
import "../styles/prism-a11y-dark.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="class">
    <Component {...pageProps} />
  </ThemeProvider>
);

export default MyApp;
