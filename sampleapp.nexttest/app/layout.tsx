import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Приложение SampleApp",
  description: "Мини-твиттер, созданный с помощью Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
