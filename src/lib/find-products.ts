import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  numberOfArrows?: string;
  sort?: string;
  brand?: string;
  countryOfOrigin?: string;

  minPrice?: string;
  maxPrice?: string;

  // page?: string;
  // sortBy?: string;
}

// const DEFAULT_MIN_PRICE = 0;
// const DEFAULT_MAX_PRICE = 1000;

export const findProducts = async (
  categoryName: string,
  // searchParams: GetSearchParams
) => {
  // const numberOfArrows = searchParams.numberOfArrows?.split(",").map(Number);
  // const sort = searchParams.sort?.split(",");
  // const brand = searchParams.brand?.split(",");
  // const countryOfOrigin = searchParams.countryOfOrigin?.split(",");

  // const minPrice = Number(searchParams.minPrice) || DEFAULT_MIN_PRICE;
  // const maxPrice = Number(searchParams.maxPrice) || DEFAULT_MAX_PRICE;

  const categoryProducts = await prisma.category.findUnique({
    where: {
      name: categoryName,
    },
    include: {
      products: true,
    }
  })

  // const categoryId = await prisma.category.findUnique({
  //   where: {
  //     name: categoryName,
  //   },
  //   select: {
  //     id: true,
  //   }
  // })

  // const products = await prisma.product.findMany({
  //   orderBy: {
  //     // price: sort?.includes("asc") ? "asc" : "desc",
  //     id: "desc",
  //   },
  //   where: {
  //     categoryId: categoryId?.id,
  //     // price: {
  //     //   gte: minPrice,
  //     //   lte: maxPrice,
  //     // },
  //   },
  // });
  return categoryProducts;
};
