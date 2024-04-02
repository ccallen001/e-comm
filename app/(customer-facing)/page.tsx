import { Product } from '@/types';
import { getProductsByQuery } from '@/actions';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

async function getMostPopularAndNewestProducts() {
  return await Promise.all([
    getProductsByQuery({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: 'desc' } },
      take: 6,
    }),
    getProductsByQuery({
      where: { isAvailableForPurchase: true },
      orderBy: { updatedAt: 'desc' },
      take: 6,
    }),
  ]);
}

function ProductGridSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <>
      <div className="flex items-center gap-4">
        <h2 className="text-4xl font-bold">{title}</h2>
        <Button variant="outline" size="sm" asChild>
          <Link className="flex gap-2" href="/products">
            View All
            <ArrowRight />
          </Link>
        </Button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}

async function CustomerFacingHome() {
  const [mostPopularProducts, newestProducts] =
    await getMostPopularAndNewestProducts();

  return (
    <main className="space-y-6">
      <ProductGridSection title="Popular" products={mostPopularProducts} />
      <ProductGridSection title="Newest" products={newestProducts} />
    </main>
  );
}

export default CustomerFacingHome;
