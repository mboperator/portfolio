import type { Metadata } from "next";
import { Istok_Web } from "next/font/google";
import "./globals.css";

const istok = Istok_Web({
  weight: ["400", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Marcus Bernales",
  description: "Disciple of Jesus | Husband | Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={istok.className}>{children}</body>
    </html>
  );
}
