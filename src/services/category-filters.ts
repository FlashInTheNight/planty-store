import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getCategoryFilters = async (
  categoryName: string
): Promise<{
  [key: string]: string[] | number[];
}> => {
  return (
    await axiosInstance.get(
      `${ApiRoutes.CATEGORY_FILTERS}?categoryName=${categoryName}`
    )
  ).data;
};
