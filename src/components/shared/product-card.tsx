'use client';
import Link from "next/link";
import { Title } from "./title";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductCardPrice } from "./product-card-price";
import { CustomButton } from "./custom-buttom";
import { useBtnCartLogic } from "@/hooks";

type Props = {
  id: number;
  name: string;
  price: number;
  discount?: number | null;
  discountPrice?: number | null;
  imageUrl: string[];
  className?: string;
};

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  discount,
  discountPrice,
  imageUrl,
  className,
}) => {

  const { loading, onSubmit } = useBtnCartLogic(id, name);


  return (
    <div
      className={cn(
        "grid grid-cols-[130px_100px] grid-rows-[300px_1fr] gap-x-2",
        className
      )}
    >
      <Link href={`/product/${id}`} className="cursor-pointer col-span-2 row-span-1">
        <div
          className="flex justify-center bg-secondary rounded-lg 
        transition ease-in-out delay-150 hover:translate-y-1 hover:scale-105 duration-300 relative"
        >
          {discount && (
            <div className="absolute top-2 left-2">
              <div className="bg-red-700 text-white text-xs font-bold rounded-full px-2 py-1">
                {discount} %
              </div>
            </div>
          )}
          <img className="w-content h-content" src={imageUrl[0]} alt={name} />
        </div>

        <Title
          text={name}
          size="xs"
          className="col-span-2 row-span-1 font-semibold mt-2"
        />
      </Link>
      <ProductCardPrice
        price={price}
        discountPrice={discountPrice}
        className="col-span-1 row-span-1 items-center"
      />
      <CustomButton
        onClick={onSubmit}
        loading={loading}
        variant="secondary"
        className="text-base font-bold col-span-1 row-span-1"
      >
        <Plus size={20} className="mr-1" />
        Добавить
      </CustomButton>
    </div>
  );
};
