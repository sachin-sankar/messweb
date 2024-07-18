// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ReactQueryClientProvider } from "./components/ReactQueryProvider";

export const metadata = {
  title: "messWeb",
  description: "Messit on the Web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript defaultColorScheme="dark" />
        </head>
        <body>
          <MantineProvider defaultColorScheme="dark">
            {children}
          </MantineProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
