import { Header, TopBar } from "@/components/shared";
import { findCategories } from "@/lib";
import { Category } from "@prisma/client";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: " Planty | Главная ",
};

export default async function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const categories: Category[] = await findCategories();
  return (
    <main>
      <Suspense>
        <Header />
      </Suspense>
      <TopBar categories={categories} />
      {children}
      {modal}
    </main>
  );
}
