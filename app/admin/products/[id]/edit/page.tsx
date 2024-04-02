import { getProductById } from "@/actions";
import PageHeader from "@/components/PageHeader";
import ProductForm from "@/components/ProductForm";

interface AdminProductsEditPageProps {
  params: {
    id: string;
  };
}

async function AdminProductsEditPage({
  params: { id },
}: AdminProductsEditPageProps) {
  const product = await getProductById(id);

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm {...{ product }} />
    </>
  );
}

export default AdminProductsEditPage;
