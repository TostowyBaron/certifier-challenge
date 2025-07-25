import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import Navbar from "@/components/sections/Navbar";

const tt_firs = localFont({
  src: [
    {
      path: "../public/fonts/tt_firs/TTFirsNeue-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/tt_firs/TTFirsNeue-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-tt-firs",
});

export const metadata: Metadata = {
  title: "Certificate Maker Online - Create & Send Digital Certificates",
  description:
    "Certifier is a digital credentials infrastructure. Easily make, share and verify digital certificates on autopilot. All-in-one platform for generation certificates and mass sending emails to recipients. Certificate maker with user friendly interface, ready-made templates, and delivery emails.",
  openGraph: {
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/certifier/image/upload/v1745403347/Certifier_-_Create_distribute_and_manage_digital_credentials_OpenGraph_dvkn5i.jpg",
        alt: "Certifier - Create, distribute, and manage digital credentials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${tt_firs.variable} ${tt_firs.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
