/**
 * Функция для исключения указанных полей из объекта.
 *
 * @param obj The object to omit fields from.
 * @param fields The fields to omit.
 * @returns A new object with the specified fields omitted.
 */
export function omitFields<T extends Record<string, unknown>>(
  obj: T,
  fields: string[]
): Omit<T, keyof typeof fields> {
  const result = { ...obj };
  fields.forEach((field) => {
    delete result[field];
  });
  return result;
}
