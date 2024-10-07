import { CategoryWithProducts } from "@/@types/prisma";
import { Container, ProductCard, Title } from "@/components/shared";
import { findProducts } from "@/lib";
import { products } from "@/prisma/constants";

export default async function CategoryPage({
  params,
}: // searchParams,
{
  params: { category: string };
  // searchParams: unknown;
}) {
  const decodedCategory = decodeURIComponent(params.category);
  const categoryProducts: CategoryWithProducts | null = await findProducts(
    decodedCategory
  );
  console.log("products", categoryProducts);
  return (
    <>
      <Container className="mt-10 pb-14">
        <Title text={decodedCategory} size="lg" className="font-extrabold" />

        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          {/* <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div> */}

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
