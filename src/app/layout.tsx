import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Employer | Premium Workforce Management",
  description: "A state-of-the-art platform for managing your workforce with ease and elegance.",
  keywords: ["employer", "management", "workforce", "premium", "dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body style={{ backgroundColor: 'var(--background)' }}>
        <Sidebar />
        <Header />
        <main style={{ marginLeft: '240px', paddingTop: '70px', minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}


