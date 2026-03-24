import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Career Architect",
  description: "Editorial job tracking workspace for managing applications with intention."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}