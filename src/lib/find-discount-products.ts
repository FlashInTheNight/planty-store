import { prisma } from "@/prisma/prisma-client";

export async function findDiscountProducts() {
  return prisma.product.findMany({
    where: {
      discount: {
        not: null,
      },
    },
  });
}
