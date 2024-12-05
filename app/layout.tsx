import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthButton from './components/AuthButton';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
    title: "Cheat Sheet Generator",
    description: "Generate concise cheat sheets from your documents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="fixed top-0 left-0 right-0 p-4 bg-slate-900/80 backdrop-blur-sm z-50">
          <AuthButton />
        </nav>
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
