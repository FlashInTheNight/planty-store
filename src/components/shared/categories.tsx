"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const params = useParams<{ category: string }>();
  const decodedCategory = decodeURIComponent(params?.category || "");

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-100 p-1 rounded-2xl", className)}
    >
      {items.map(({ name }, index) => (
        <Link
          className={cn(
            "flex items-center font-semibold h-11 rounded-2xl px-5",
            decodedCategory === name &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/category/${name}`}
          key={index}
        >
          <button>{name}</button>
        </Link>
      ))}
    </div>
  );
};
