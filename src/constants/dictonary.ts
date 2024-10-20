import { OmitedCharacteristic } from "@/@types/prisma";

export const CharacteristicDictonary: Record<
  keyof OmitedCharacteristic,
  string
> = {
  lighting: "Свет",
  temperature: "Температура",
  watering: "Полив",
  soil: "Почва",
  material: "Материал",
  type: "Тип",
  diameter: "Диаметр",
  height: "Высота",
  volume: "Объём",
};
