'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../product-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  console.log("product in ProductModal: ", product);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white',
          className,
        )}>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
