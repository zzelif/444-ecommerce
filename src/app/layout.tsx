import type { Metadata } from "next";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://444-ecommerce.vercel.app"),
  title: {
    default: "444 E-Commerce",
    template: "%s | 444 E-Commerce",
  },
  description: "Committed to delivering exceptional quality and service to meet all your printing and design needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-thumb-slate-700 scrollbar-track-slate-300 scrollbar-thin no-touch touch"
    >
      <body
        className={`${poppinsSans.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
