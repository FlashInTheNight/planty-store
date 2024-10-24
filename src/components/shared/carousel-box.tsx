"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { Product } from "@prisma/client";

type Props = {
  products: Product[];
  className?: string;
};

export const CarouselBox = ({ products, className }: Props) => {
  return (
    <Carousel className={cn("", className)}>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem className="basis-1/4" key={product.id}>
            <ProductCard {...product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="h-10 w-10 border-destructive" />
      <CarouselNext className="h-10 w-10 border-destructive" />
    </Carousel>
  );
};
