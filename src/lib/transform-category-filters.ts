interface FilterItem {
  value: string;
  text: string;
}
interface Props {
  [k: string]: string[] | number[];
}
interface ReturnProps {
  [k: string]: FilterItem[];
}

export const transformCategoryFilters = (
  categoryFilters: Props
): ReturnProps => {
  // Преобразуем массивы в объектах в требуемый формат
  return Object.fromEntries(
    Object.entries(categoryFilters).map(([key, value]) => {
      if (Array.isArray(value)) {
        // Преобразуем каждый элемент массива в объект с `value` и `text`
        const transformedArray: FilterItem[] = value.map((item, index) => ({
          value: String(index),
          text: String(item),
        }));

        return [key, transformedArray];
      }
      return [key, value];
    })
  );
};
