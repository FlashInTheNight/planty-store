import { CarouselGroup, Container, ProductForm } from "@/components/shared";
import { findPopularProducts, omitFields } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      description: true,
      characteristic: true,
    },
  });

  if (!product) {
    return notFound();
  }

  // Исключаем поля id, createdAt, updatedAt
  const sanitizedCharacteristic = omitFields(product.characteristic, [
    "id",
    "createdAt",
    "updatedAt",
  ]);

  const filteredProduct = {
    ...product,
    characteristic: sanitizedCharacteristic,
  };
  const popularProducts: Product[] = await findPopularProducts();

  return (
    <Container className="py-10">
      <ProductForm product={filteredProduct} />
      <CarouselGroup titleText="Популярные товары" products={popularProducts} />
    </Container>
  );
}
