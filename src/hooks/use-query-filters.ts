import React from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';

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
        material: Array.from(filters.material),
        type: Array.from(filters.type),
      };

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      // Возможно, надо будет добавить параметр category
      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [filters]);
};
