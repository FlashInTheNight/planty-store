
export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = params.id;
  return <div>Product {id}</div>;
}