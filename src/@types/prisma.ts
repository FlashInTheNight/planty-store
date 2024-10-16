import { Characteristic, Description, Product } from "@prisma/client";

export type ProductWithRelations = Product & {
  description: Description;
  characteristic: Omit<Characteristic, "id" | "createdAt" | "updatedAt">;
};

export type OmitedCharacteristic = Omit<
  Characteristic,
  "id" | "createdAt" | "updatedAt"
>;
