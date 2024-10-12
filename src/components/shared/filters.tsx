"use client";

import React from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useCategoryFilter, useFilters, useQueryFilters } from "@/hooks";

interface Props {
  className?: string;
  currentParam: string;
}

export const Filters: React.FC<Props> = ({ className, currentParam }) => {
  const { categoryFilters, loading } = useCategoryFilter({
    categoryName: currentParam,
  });

  const filters = useFilters();

  useQueryFilters(filters);

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  const filtersDictonary: {
    [key: string]: {
      name: string;
      items: Set<string>;
      onClickCheckbox: (value: string) => void;
    };
  } = {
    numberOfArrows: {
      name: "Кол-во стрел",
      items: filters.numberOfArrows,
      onClickCheckbox: filters.setNumberOfArrows,
    },
    sort: {
      name: "Сортировка",
      items: filters.sort,
      onClickCheckbox: filters.setSort,
    },
    brand: {
      name: "Бренд",
      items: filters.brand,
      onClickCheckbox: filters.setBrand,
    },
    countryOfOrigin: {
      name: "Страна производства",
      items: filters.countryOfOrigin,
      onClickCheckbox: filters.setCountryOfOrigin,
    },
  };

  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      {/* Верхние чекбоксы */}

      {!loading &&
        Object.entries(categoryFilters).map(([key, value]) => (
          <CheckboxFiltersGroup
            key={key}
            title={filtersDictonary[key as keyof typeof filters]?.name}
            name={key}
            className="mt-5"
            limit={6}
            defaultItems={value.slice(0, 6)}
            items={value}
            loading={loading}
            onClickCheckbox={
              filtersDictonary[key as keyof typeof filters]?.onClickCheckbox
            }
            selected={filtersDictonary[key as keyof typeof filters].items}
          />
        ))}

      {/* Фильтр цен */}
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={String(filters.prices?.priceFrom)}
            onChange={(e) =>
              filters.setPrices("priceFrom", Number(e.target.value))
            }
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder="1000"
            value={String(filters.prices?.priceTo)}
            onChange={(e) =>
              filters.setPrices("priceTo", Number(e.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[
            filters.prices?.priceFrom || 0,
            filters.prices?.priceTo || 1000,
          ]}
          onValueChange={updatePrices}
        />
      </div>
    </div>
  );
};
