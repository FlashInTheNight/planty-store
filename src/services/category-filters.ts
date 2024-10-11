import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { CategoryFilters } from "@prisma/client";

export const getCategoryFilters = async (
  categoryName: string
): Promise<CategoryFilters> => {
  return (
    await axiosInstance.get<CategoryFilters>(
      `${ApiRoutes.CATEGORY_FILTERS}?categoryName=${categoryName}`
    )
  ).data;
};
