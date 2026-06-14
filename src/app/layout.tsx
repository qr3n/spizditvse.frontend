import "@mantine/core/styles.css";
import React from "react";
import {
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { AppProvider } from "./_providers";

export const metadata = {
  title: "VPN Subscription Manager",
  description: "Admin panel for managing VPN subscriptions",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <AppProvider>
            {children}
        </AppProvider>
      </body>
    </html>
  );
}
