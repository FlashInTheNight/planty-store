import { Header } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Planty | Главная ",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
