"use client";

import { cn } from "@/lib/utils";
// import { useCategoryStore } from '@/store/category';
import { Category } from "@prisma/client";
import React from "react";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  // const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-100 p-1 rounded-2xl", className)}
    >
      {items.map(({ name }, index) => (
        <a
          className={cn(
            "flex items-center font-semibold h-11 rounded-2xl px-5",
            1 === index && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/category/${name}`}
          key={index}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
