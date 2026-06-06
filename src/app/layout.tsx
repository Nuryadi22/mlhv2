import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Madrasah Link Hub - Penyimpanan Akun & Sandi Madrasah",
  description: "Aplikasi penyimpanan akun, sandi, dan tautan portal Madrasah secara aman, cepat, dan terorganisir untuk MI Cikembulan.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

