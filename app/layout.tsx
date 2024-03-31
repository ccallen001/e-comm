import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ReactChildren } from "@/types";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "E-Comm",
  description: "e-Commerce for all",
};

function RootLayout({ children }: Readonly<ReactChildren>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
