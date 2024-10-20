import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}><Providers>{children}</Providers></body>
    </html>
  );
}
