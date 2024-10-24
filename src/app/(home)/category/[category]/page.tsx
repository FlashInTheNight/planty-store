import { Container, Filters, ProductCard, Title } from "@/components/shared";
import { findProducts } from "@/lib";
import { type GetSearchParams } from "@/lib/find-products";
import { Suspense } from "react";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: GetSearchParams;
}) {
  const decodedCategory = decodeURIComponent(params.category);
  const categoryProducts = await findProducts(decodedCategory, searchParams);

  return (
    <>
      <Container className="mt-10 pb-14">
        <Title text={decodedCategory} size="lg" className="font-extrabold mb-2" />

        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters currentParam={decodedCategory} />
            </Suspense>
          </div>

          {/* Список товаров */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-12">
                {categoryProducts?.map((product) => (
                  <ProductCard {...product} key={product.id} />
                ))}
              </div>
            </div>
        </div>
      </Container>
    </>
  );
}
