import { transformCategoryFilters } from "@/lib";
import { Api } from "@/services/api-client";
import React from "react";

export interface ReturnProps {
  categoryFilters: {
    [k: string]: {
      value: string;
      text: string;
    }[];
  };
  loading: boolean;
}

export const useCategoryFilter = ({
  categoryName,
}: {
  categoryName: string;
}): ReturnProps => {
  const [categoryFilters, setCategoryFilters] = React.useState({});
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const apiCategoryFilters = await Api.categoryFilters.getCategoryFilters(
          categoryName
        );

        // Преобразуем массивы в объектах в требуемый формат
        const transformedCategoryFilters =
          transformCategoryFilters(apiCategoryFilters);

        // Устанавливаем преобразованные данные в состояние
        setCategoryFilters(transformedCategoryFilters);
      } catch (error) {
        console.log(
          "An error has occurred in the useCategoryFilter method:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, [categoryName]);

  return {
    categoryFilters,
    loading,
  };
};
