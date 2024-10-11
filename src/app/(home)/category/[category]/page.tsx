import { Container, Filters, ProductCard, Title } from "@/components/shared";
import { findProducts } from "@/lib";
import { type GetSearchParams } from "@/lib/find-products";
// import { Filter, Product } from "@prisma/client";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams:  GetSearchParams;
}) {
  const decodedCategory = decodeURIComponent(params.category);
  const categoryProducts = await findProducts(decodedCategory, searchParams);

  return (
    <>
      <Container className="mt-10 pb-14">
        <Title text={decodedCategory} size="lg" className="font-extrabold" />

        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters currentParam={decodedCategory}  />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-16">
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
