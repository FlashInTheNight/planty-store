import { Header, TopBar } from "@/components/shared";
import { findCategories } from "@/lib";
import { Category } from "@prisma/client";
import { Metadata } from "next";
import Script from "next/script";

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
    <>
      <Script src="https://yastatic.net/s3/passport-sdk/autofill/v1/sdk-suggest-with-polyfills-latest.js"></Script>
      <main>
        <Header />
        <TopBar categories={categories} />
        {children}
        {modal}
      </main>
    </>
  );
}
