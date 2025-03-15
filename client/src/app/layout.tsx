import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Easy",
  description:
    "BookEasy is a convenient and efficient room reservation system designed specifically for hotels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className="font-sans">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
