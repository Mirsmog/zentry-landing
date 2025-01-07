import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zentry - Metagame",
  description: "Zentry: The Metagame, The Game of Games To Elevate Gaming Culture | Zentry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
