import type { Metadata } from "next";
import localFont from "next/font/local";
import Navigation from "./components/layout/Navigation";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Super Todo",
  description: "The last todo you'll ever needs",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
          {children}
        </main>
      </body>
    </html>
  );
}
