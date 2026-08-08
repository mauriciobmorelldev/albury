import type { Metadata } from "next";
import PropertyLoader from "@/components/PropertyLoader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Albury | Recorrido inmobiliario inmersivo",
  description:
    "Home cinematográfica para recorrer una propiedad premium con renders arquitectónicos.",
  icons: {
    icon: {
      url: "/albury-favicon.svg?v=2",
      type: "image/svg+xml",
      sizes: "any",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <PropertyLoader />
        {children}
      </body>
    </html>
  );
}
