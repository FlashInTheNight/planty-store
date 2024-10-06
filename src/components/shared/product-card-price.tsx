import { cn } from "@/lib/utils";

interface Props {
  price: number;
  discountPrice?: number | null;
  className?: string;
}

export const ProductCardPrice: React.FC<Props> = ({
  price,
  discountPrice,
  className,
}) => {
  return (
    <div className={cn("flex gap-x-3", className)}>
      {discountPrice ? (
        <span className="text-[20px] text-red-700">
          <b>{discountPrice} ₽</b>
        </span>
      ) : (
        ""
      )}
      <span
        className={cn(
          // "text-[20px]",
          // { "text-[16px] line-through": discountPrice }
          discountPrice ? "text-[16px] line-through" : "text-[20px] font-semibold" 
        )}
      >
        {price} ₽
      </span>
    </div>
  );
};