import { prisma } from "@/prisma/prisma-client";
import { Category } from "@prisma/client";

export const findCategories = async (): Promise<Category[]> => {
  return await prisma.category.findMany();
}