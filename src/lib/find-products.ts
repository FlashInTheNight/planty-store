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
  searchParams: GetSearchParams
) => {
  // const numberOfArrows = searchParams.numberOfArrows?.split(",").map(Number);
  // const sort = searchParams.sort?.split(",").map(String);
  const brands = searchParams.brand?.split(",").map(String);
  // const countryOfOrigin = searchParams.countryOfOrigin?.split(",").map(String);

  // const minPrice = Number(searchParams.minPrice) || DEFAULT_MIN_PRICE;
  // const maxPrice = Number(searchParams.maxPrice) || DEFAULT_MAX_PRICE;

  const categoryProducts = await prisma.category.findUnique({
    where: {
        name: categoryName,
    },
    include: {
        products: {
            where: {
                AND: brands
                    ? brands.map((brand) => ({
                          filters: {
                              brand: brand,
                          },
                      }))
                    : undefined,
            },
            include: {
                filters: true,
            },
        },
    },
});


  // const categoryProducts = await prisma.category.findUnique({
  //   where: {
  //     name: categoryName,
  //   },
  //   include: {
  //     products: {
  //       where: {
  //         filters: brands
  //           ? {
  //               some: {
  //                 brand: {
  //                   in: brands,
  //                 },
  //               },
  //             }
  //           : undefined,
  //       },
  //       include: {
  //         filters: true,
  //       },
  //     },
  //   },
  // });

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
