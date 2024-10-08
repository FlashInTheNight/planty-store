import { CategoryWithProducts } from "@/@types/prisma";
import { Container, Filters, ProductCard, Title } from "@/components/shared";
import { findProducts } from "@/lib";
import { GetSearchParams } from "@/lib/find-products";
// import { Filter, Product } from "@prisma/client";

export default async function CategoryPage({
  params,
  searchParams,
}: // searchParams,
{
  params: { category: string };
  searchParams: { searchParams: GetSearchParams};
}) {
  const decodedCategory = decodeURIComponent(params.category);
  const categoryProducts: CategoryWithProducts | null = await findProducts(
    decodedCategory,
    searchParams
  );
  // console.log("categoryProducts", categoryProducts);

  const filtersArray = categoryProducts?.products.map(
    (product) => product.filters
  );

  return (
    <>
      <Container className="mt-10 pb-14">
        <Title text={decodedCategory} size="lg" className="font-extrabold" />

        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters filtersArray={filtersArray || []} />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-16">
              {categoryProducts?.products.map((product) => (
                <ProductCard {...product} key={product.id} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
