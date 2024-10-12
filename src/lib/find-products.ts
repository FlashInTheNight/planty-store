import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";

export interface GetSearchParams {
  numberOfArrows?: string;
  sort?: string;
  brand?: string;
  countryOfOrigin?: string;

  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const findProducts = async (
  categoryName: string,
  searchParams: GetSearchParams
) => {
  const numberOfArrows = searchParams.numberOfArrows?.split(",").map(Number);
  const sort = searchParams.sort?.split(",").map(String);
  const brands = searchParams.brand?.split(",").map(String);
  const countryOfOrigin = searchParams.countryOfOrigin?.split(",").map(String);

  const minPrice = Number(searchParams.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(searchParams.priceTo) || DEFAULT_MAX_PRICE;

  console.log('minPrice', minPrice);
  console.log('maxPrice', maxPrice);

  const filterConditions = [
    // Фильтр по брендам
    brands && brands.length
      ? {
          filters: {
            brand: {
              in: brands, // Используем оператор in для фильтрации по списку брендов
            },
          },
        }
      : undefined,

    // Фильтр по странам происхождения
    countryOfOrigin && countryOfOrigin.length
      ? {
          filters: {
            countryOfOrigin: {
              in: countryOfOrigin, // Используем оператор in для списка стран
            },
          },
        }
      : undefined,

    // Фильтр по количеству стрел
    numberOfArrows && numberOfArrows.length
      ? {
          filters: {
            numberOfArrows: {
              in: numberOfArrows, // Фильтрация по количеству стрел
            },
          },
        }
      : undefined,

    // Фильтр по сортам растений
    sort && sort.length
      ? {
          filters: {
            sort: {
              in: sort, // Фильтрация по сортам
            },
          },
        }
      : undefined,

    // Фильтр по цене
    {
      price: {
        gte: minPrice, // Цена больше или равна minPrice
        lte: maxPrice, // Цена меньше или равна maxPrice
      },
    },
  ].filter(Boolean); // Убираем undefined из массива

  const categoryProducts = await prisma.category.findUnique({
    where: {
      name: categoryName,
    },
    include: {
      products: {
        orderBy: {
          id: "desc",
        },
        where: {
          AND: filterConditions as Prisma.ProductWhereInput[], // Передаем уже отфильтрованные условия
        },
        include: {
          filters: true, // Включаем связанные фильтры для продуктов
        },
      },
    },
  });

  return categoryProducts?.products;
};
