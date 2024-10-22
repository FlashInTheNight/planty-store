"use client";

import { ProductWithRelations } from "@/@types/prisma";
import React from "react";
import { ChooseProductForm } from "@/components/shared";
import { useBtnCartLogic } from "@/hooks";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
}) => {
  const { loading, onSubmit } = useBtnCartLogic(
    product.id,
    product.name,
    _onSubmit
  );

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
