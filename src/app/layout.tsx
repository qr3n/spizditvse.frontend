import "@mantine/core/styles.css";
import "@/src/shared/ui/styles.css";
import React from "react";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { AppProvider } from "./_providers";
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
    title: "Спиздить.всё",
    description: "Все вопросы к Шахназарову Эмилю Кареновичу",
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript forceColorScheme="dark" />
                <link rel="shortcut icon" href="/favicon.svg" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
              <NextTopLoader color="#1A73E8" showSpinner={false} />
              <AppProvider>
                  {children}
              </AppProvider>
            </body>
        </html>
    );
}
