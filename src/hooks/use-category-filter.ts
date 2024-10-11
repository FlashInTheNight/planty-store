import { Api } from "@/services/api-client";
import { type CategoryFilters } from "@prisma/client";
import React from "react";

export const useCategoryFilter = ({
  categoryName,
}: {
  categoryName: string;
}): { categoryFilters: CategoryFilters; loading: boolean } => {
  const [categoryFilters, setCategoryFilters] = React.useState<CategoryFilters>(
    {} as CategoryFilters
  );
  const [loading, setLoading] = React.useState(false);
  console.log("\x1b[33m%s\x1b[0m", 'zhopech')

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        console.log("\x1b[33m%s\x1b[0m", 'kek puk')
        setLoading(true);
        const apiCategoryFilters = await Api.categoryFilters.getCategoryFilters(
          categoryName
        );
        setCategoryFilters(apiCategoryFilters);
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


  console.log('the end')

  return {
    categoryFilters,
    loading,
  };
};
