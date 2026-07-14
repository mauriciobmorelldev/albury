import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Albury | Recorrido inmobiliario inmersivo",
  description:
    "Home cinematográfica para recorrer una propiedad premium con renders arquitectónicos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
