"use server";

import db from "@/db/db";

interface CreateProductData {
  name: string;
  priceInCents: number;
  description: string;
}

async function getProductData() {
  const products = await db.product.findMany();

  const productCount = products.length;

  const activeProductCount = products.filter(
    (product) => product.isAvailableForPurchase,
  ).length;

  return {
    productCount,
    activeProductCount,
  };
}

async function getAllProducts() {
  const allProducts = await db.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      description: true,
      isAvailableForPurchase: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: "asc" },
  });

  return allProducts;
}

async function createProduct(data: CreateProductData) {
  const createdProduct = await db.product.create({ data });

  return createdProduct;
}

async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean,
) {
  const updatedProduct = await db.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  return updatedProduct;
}

async function deleteProduct(id: string) {
  return db.product.delete({ where: { id } });
}

export {
  getProductData,
  getAllProducts,
  createProduct,
  toggleProductAvailability,
  deleteProduct,
};
