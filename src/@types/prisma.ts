import { Category, Filter, Product } from "@prisma/client";

export type CategoryWithProductsAndFilters = Category & {
  products: Product[] & {
    filters: Filter[];
  };
};
