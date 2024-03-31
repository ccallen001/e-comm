import db from '@/db/db';

async function getProductData() {
  const products = await db.product.findMany();

  const productCount = products.length;

  const activeProductCount = products.filter(
    (product) => product.isAvailableForPurchase
  ).length;

  return {
    productCount,
    activeProductCount
  };
}

export { getProductData };
