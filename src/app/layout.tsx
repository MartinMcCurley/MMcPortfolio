import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Martin McCurley - Software Developer",
  description: "Martin McCurley's portfolio showcasing modern web development projects, clean code practices, and exceptional user interfaces.",
  keywords: ["Martin McCurley", "Software Developer", "Web Developer", "Portfolio", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Martin McCurley" }],
  creator: "Martin McCurley",
  openGraph: {
    title: "Martin McCurley - Software Developer",
    description: "Portfolio showcasing modern web development projects and clean code practices.",
    url: "https://martinmccurley.com",
    siteName: "Martin McCurley Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Martin McCurley - Software Developer",
    description: "Portfolio showcasing modern web development projects and clean code practices.",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
