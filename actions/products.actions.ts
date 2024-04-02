'use server';

import { Product } from '@/types';

import db from '@/db/db';
import { cache } from '@/lib/cache';
import { revalidateTag } from 'next/cache';

interface Query {
  select?: Record<string, unknown>;
  where?: Record<string, unknown>;
  orderBy?: Record<string, unknown>;
  take?: number;
}

interface CreateOrUpdateProductParams {
  id?: string;
  name: string;
  priceInCents: number;
  description: string;
  isAvailableForPurchase?: boolean;
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

// what in the world is this caching stuff? https://youtu.be/iqrgggs0Qk0?t=7674

async function getAllProducts() {
  return cache(
    () =>
      db.product.findMany({
        select: {
          id: true,
          name: true,
          priceInCents: true,
          description: true,
          isAvailableForPurchase: true,
          _count: { select: { orders: true } },
        },
        orderBy: { updatedAt: 'desc' },
      }),
    ['getAllProducts'],
  ) as Promise<Product[]>;
}

async function getProductsByQuery(query: Query) {
  return cache(() => db.product.findMany(query), ['getProductsByQuery'], {
    revalidate: 60 * 60 * 24,
  }) as Promise<Product[]>;
}

async function getProductById(id: string) {
  const product = await db.product.findUnique({
    where: { id },
  });

  return product;
}

// TODO :: create and update could probably be an upsert

async function createProduct(data: CreateOrUpdateProductParams) {
  const createdProduct = await db.product.create({ data });

  revalidateTag('getAllProducts');

  return createdProduct;
}

async function updateProduct(data: CreateOrUpdateProductParams) {
  const { id } = data;

  if (!id) {
    throw new Error('product id is required');
  }

  const updatedProduct = await db.product.update({
    where: { id },
    data,
  });

  revalidateTag('getAllProducts');

  return updatedProduct;
}

// TODO :: let update handle this
async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean,
) {
  const updatedProduct = await db.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  revalidateTag('getAllProducts');

  return updatedProduct;
}

async function deleteProduct(id: string) {
  await db.product.delete({ where: { id } });

  revalidateTag('getAllProducts');

  return { message: 'success' };
}

export {
  getProductData,
  getAllProducts,
  getProductsByQuery,
  getProductById,
  createProduct,
  updateProduct,
  toggleProductAvailability,
  deleteProduct,
};
