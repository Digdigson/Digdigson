import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Portfolio",
  description: "Professional music for media portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

