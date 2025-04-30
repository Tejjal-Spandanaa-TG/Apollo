import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // ✅ this works if globals.css is in the same folder

import Header from "../components/header";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Apollo 247 Clone - Find the Best Doctors Near You",
  description:
    "Find and book appointments with the best doctors in your city. Filter by speciality, experience, and consultation fees.",
  keywords: "doctors, physician, medical, healthcare, appointment, consultation, Apollo 247",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
