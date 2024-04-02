type Product = {
  id?: string;
  name: string;
  priceInCents: number;
  description: string;
  isAvailableForPurchase: boolean;
  _count?: {
    orders: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
};

interface ReactChildren {
  children: React.ReactNode;
}

export type { Product, ReactChildren };
