import { CarouselGroup, Container, TopBar } from "@/components/shared";
import { findPopularProducts, findDiscountProducts } from "@/lib";
import { findCategories } from "@/lib/find-categories";
import { type Product, type Category } from "@prisma/client";

export default async function Home() {
  const categories: Category[] = await findCategories();
  const popularProducts: Product[] = await findPopularProducts();
  const productsWithDiscount: Product[] = await findDiscountProducts();

  return (
    <>
      <TopBar categories={categories} />

      <Container className="py-10">
        <CarouselGroup
          titleText="Популярные товары"
          products={popularProducts}
        />
        <CarouselGroup titleText="Скидка дня" products={productsWithDiscount} />
      </Container>
    </>
  );
}
