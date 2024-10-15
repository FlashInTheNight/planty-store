import { cn } from "@/lib/utils";
import React from "react";
import { Title } from "./title";
import { CustomButton } from "./custom-buttom";
import { CarouselProduct } from "@/components/shared";

interface Props {
  imageUrl: string[];
  name: string;
  price: number;
  loading?: boolean;
  onSubmit?: VoidFunction;
  className?: string;
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
}) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <CarouselProduct className="" imageUrls={imageUrl} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <CustomButton
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10 "
        >
          Добавить в корзину за {price} ₽
        </CustomButton>
      </div>
    </div>
  );
};
