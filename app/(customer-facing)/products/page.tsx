import { getProductsByQuery } from '@/actions';
import ProductCard, { ProductCardSkeleton } from '@/components/ProductCard';
import { Suspense } from 'react';

async function CustomerFacingProductsPage() {
  const allProducts = await getProductsByQuery({
    where: { isAvailableForPurchase: true },
  });

  return (
    <main className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-4xl font-bold">Products</h2>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={Array.from({ length: 6 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        >
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Suspense>
      </section>
    </main>
  );
}

export default CustomerFacingProductsPage;
