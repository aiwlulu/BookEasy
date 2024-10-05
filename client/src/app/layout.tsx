import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Easy",
  description:
    "BookEasy is a convenient and efficient room reservation system designed specifically for hotels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="font-sans">
      <body>{children}</body>
    </html>
  );
}
