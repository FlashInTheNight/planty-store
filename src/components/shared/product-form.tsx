"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from '@/store';
import React from "react";
import toast from 'react-hot-toast';
import { ChooseProductForm } from "@/components/shared";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

  const onSubmit = async () => {
    try {

      await  addCartItem({
        productId: product.id,
      });

      toast.success(product.name + " добавлена в корзину");

      _onSubmit?.();
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      // onSubmit={_onSubmit}
      price={product.price}
      discountPrice={product.discountPrice}
      loading={loading}
      characteristic={product.characteristic}
      description={product.description}
    />
  );
};
