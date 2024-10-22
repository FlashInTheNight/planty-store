import { useCartStore } from "@/store";
import toast from "react-hot-toast";

interface ReturnProps {
  loading: boolean;
  onSubmit: () => void;
}

export const useBtnCartLogic = (
  productId: number,
  productName: string,
  optionalCallback?: () => void
): ReturnProps => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const onSubmit = async () => {
    try {
      await addCartItem({
        productId,
      });
      toast.success(productName + " добавлена в корзину");

      optionalCallback?.();
    } catch (err) {
      toast.error("Не удалось добавить товар в корзину");
      console.error(err);
    }
  };

  return {
    loading,
    onSubmit,
  };
};
