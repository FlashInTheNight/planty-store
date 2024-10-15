import { Header } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Planty | Главная ",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main>
      <Header />
      {children}
      {modal}
    </main>
  );
}
