// app/layout.tsx

import type { Metadata } from "next";
import ClientProvider from "@/components/providers/clientprovider";
import { Plus_Jakarta_Sans, Lora, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from 'next-themes';
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const loraSerif = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-lora-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://444-ecommerce.vercel.app"),
  title: {
    default: "444 E-Commerce",
    template: "%s | 444 E-Commerce",
  },
  description:
    "Committed to delivering exceptional quality and service to meet all your printing and design needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${loraSerif.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          storageKey="theme"
          defaultTheme="system"
        >
          <ClientProvider>
            {children}
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
