import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import {ClerkProvider} from '@clerk/nextjs'
import { Toaster } from "sonner";
import ReduxProvider from "@/providers/redux-provider";
import ReactQueryProvider from "@/providers/react-query-provider";

const jakrata = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autogram",
  description: "Automates DMs and comments on Instagram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={jakrata.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReduxProvider>
            <ReactQueryProvider>
            {children}

            </ReactQueryProvider>
            </ReduxProvider>
          <Toaster/>
      </ThemeProvider>
      </body>   
    </html>
    </ClerkProvider>
  );
}
