import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tanu Chapter 26",
  description: "A digital birthday story crafted with love.",
  openGraph: {
    title: "Tanu Chapter 26",
    description: "A digital birthday story crafted with love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased overflow-x-hidden" style={{ background: "#070410", color: "#fdf4ff" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
