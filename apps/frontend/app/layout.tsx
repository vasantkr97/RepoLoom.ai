import type { Metadata } from "next";
import { DM_Sans, Manrope, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Providers from "./providers";
import Toasters from "./toasters";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RepoLoom.ai — Repository intelligence that ships",
  description:
    "Turn GitHub issues and engineering tasks into validated, review-ready pull requests.",
  icons: {
    icon: "/finallogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${manrope.variable} ${plusJakartaSans.variable} ${dmSans.variable}`}
    >
      <body className="font-sans">
        <AuthProvider>
          <Providers>
            {children}
            <Toasters />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
