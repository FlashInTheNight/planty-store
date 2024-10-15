import { Characteristic, Description, Product } from "@prisma/client";

export type ProductWithRelations = Product & {
  description: Description;
  characteristic: Characteristic;
};
