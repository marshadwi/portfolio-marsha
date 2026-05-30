import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-jakarta" 
});

export const metadata: Metadata = {
  title: "Marsha Dwi Lucyana | Professional Portfolio",
  description: "Official portfolio of Marsha Dwi Lucyana, a Backend Developer and Software Engineering Student specializing in Laravel, Python, and API integration.",
  openGraph: {
    title: "Marsha Dwi Lucyana | Professional Portfolio",
    description: "Software Engineer specializing in Backend Development and AI.",
    url: "https://marshadwi.vercel.app",
    siteName: "Marsha Dwi Lucyana Portfolio",
    images: [
      {
        url: "/formal_marsha.png",
        width: 1200,
        height: 630,
        alt: "Marsha Dwi Lucyana",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jakarta.variable} font-sans antialiased text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
