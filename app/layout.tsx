import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Булат Ихсанов — Backend Developer",
  description: "Junior .NET Backend Developer. ASP.NET Core, Entity Framework, PostgreSQL, Docker.",
  keywords: [".NET", "Backend", "C#", "ASP.NET Core", "Entity Framework", "PostgreSQL", "Docker", "Flutter", "FastAPI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
