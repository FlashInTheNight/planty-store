import { ProductModal } from "@/components/shared";
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

    /**
   * Функция для исключения указанных полей из объекта.
   *
   * @param obj The object to omit fields from.
   * @param fields The fields to omit.
   * @returns A new object with the specified fields omitted.
   */
  function omitFields<T extends Record<string, unknown>>(
    obj: T,
    fields: string[]
  ): Omit<T, keyof typeof fields> {
    const result = { ...obj };
    fields.forEach((field) => {
      delete result[field];
    });
    return result;
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
