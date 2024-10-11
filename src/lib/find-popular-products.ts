import { prisma } from "@/prisma/prisma-client";
import { Product } from "@prisma/client";

export const findPopularProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany({
    where: {
      isPopular: true,
    },
  });
}