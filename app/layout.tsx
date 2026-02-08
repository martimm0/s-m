import type { Metadata } from "next";
import { Fredoka, Kalam } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-body",
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Valentine's Day Ask for Shakota",
  description: "A playful Valentine's Day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${kalam.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
