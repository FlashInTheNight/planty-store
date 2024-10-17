import { ProductModal } from "@/components/shared";
import { omitFields } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModalPage({
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

  return <ProductModal product={filteredProduct} />;
}
