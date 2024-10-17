import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { CustomButton } from "./custom-buttom";
import { CarouselProduct } from "@/components/shared";
import { ProductInfo } from "./product-info";
import { Characteristic, Description } from "@prisma/client";

interface Props {
  imageUrl: string[];
  name: string;
  price: number;
  discountPrice?: number | null;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
  characteristic: Omit<Characteristic, "id" | "createdAt" | "updatedAt">;
  description: Description;
}

/**
 * Форма выбора ПРОДУКТА
 *
 * @param imageUrl Ссылка на изображение
 */
export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  price,
  onSubmit,
  className,
  loading = false,
  characteristic,
  description,
  discountPrice,
}) => {
  console.log("description in ChooseProductForm: ", description);
  return (
    <div className={cn(className, "flex flex-1 h-[600px]")}>
      <CarouselProduct imageUrls={imageUrl} />

      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <ProductInfo
          className="flex-1"
          characteristic={characteristic}
          description={description}
        />

        <CustomButton
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5"
        >
          Добавить в корзину за {discountPrice ?? price} ₽
        </CustomButton>
      </div>
    </div>
  );
};
