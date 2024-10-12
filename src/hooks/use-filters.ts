import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  numberOfArrows: string;
  sort: string;
  brand: string;
  countryOfOrigin: string;
}

export interface Filters {
  numberOfArrows: Set<string>;
  sort: Set<string>;
  brand: Set<string>;
  countryOfOrigin: Set<string>;
  prices?: PriceProps;
}
export interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setNumberOfArrows: (value: string) => void;
  setSort: (value: string) => void;
  setBrand: (value: string) => void;
  setCountryOfOrigin: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedNumberOfArrows, { toggle: toggleNumberOfArrows }] = useSet(
    new Set<string>(searchParams.get("numberOfArrows")?.split(","))
  );

  const [selectedSort, { toggle: toggleSort }] = useSet(
    new Set<string>(searchParams.get("sort")?.split(","))
  );

  const [selectedBrand, { toggle: toggleBrand }] = useSet(
    new Set<string>(searchParams.get("brand")?.split(","))
  );

  const [selectedCountryOfOrigin, { toggle: toggleCountryOfOrigin }] = useSet(
    new Set<string>(searchParams.get("countryOfOrigin")?.split(","))
  );

  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return React.useMemo(
    () => ({
      numberOfArrows: selectedNumberOfArrows,
      sort: selectedSort,
      brand: selectedBrand,
      countryOfOrigin: selectedCountryOfOrigin,
      prices,
      setPrices: updatePrice,
      setNumberOfArrows: toggleNumberOfArrows,
      setSort: toggleSort,
      setBrand: toggleBrand,
      setCountryOfOrigin: toggleCountryOfOrigin,
    }),
    [
      selectedNumberOfArrows,
      selectedSort,
      selectedBrand,
      selectedCountryOfOrigin,
      prices,
    ]
  );
};
