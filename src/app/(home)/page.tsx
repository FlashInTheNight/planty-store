import { CarouselGroup, Container, Stories } from "@/components/shared";
import { findPopularProducts, findDiscountProducts } from "@/lib";
import { type Product } from "@prisma/client";

export default async function Home() {
  const popularProducts: Product[] = await findPopularProducts();
  const productsWithDiscount: Product[] = await findDiscountProducts();

  return (
    <>
      <Container>
        <Stories />
        <CarouselGroup
          titleText="Популярные товары"
          products={popularProducts}
        />
        <CarouselGroup titleText="Скидка дня" products={productsWithDiscount} />
      </Container>
    </>
  );
}
