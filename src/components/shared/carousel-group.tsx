import { Title } from "./title";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { CarouselBox } from "./carousel-box";

interface Props {
  className?: string;
  titleText: string;
  products: Product[];
}

export const CarouselGroup: React.FC<Props> = ({
  className,
  titleText,
  products,
}) => {
  return (
    <div className={cn("my-10", className)}>
      <Title text={titleText} size="lg" />
      <CarouselBox products={products} className="mt-6" />
    </div>
  );
};
