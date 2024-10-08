import React from 'react';
import { Filters } from './use-filters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        numberOfArrows: Array.from(filters.numberOfArrows),
        sort: Array.from(filters.sort),
        brand: Array.from(filters.brand),
        countryOfOrigin: Array.from(filters.countryOfOrigin),
        // pizzaTypes: Array.from(filters.selectedPizzaTypes),
        // sizes: Array.from(filters.sizes),
        // ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      router.push(`?${query}`, {
        scroll: false,
      });

      console.log(filters, 999);
    }

    isMounted.current = true;
  }, [filters]);
};
