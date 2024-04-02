import { Product } from '@/types';

import Link from 'next/link';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from './ui/button';

import { formatCurrency } from '@/lib/formatters';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { id, name, priceInCents, description } = product;

  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>

      <CardContent>
        <p>{description}</p>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg" asChild>
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="bg-slate-100 animate-pulse">
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 bg-slate-200 rounded" />
        </CardTitle>
        <CardDescription>
          <span className="block w-1/4 h-4 bg-slate-200 rounded" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="mb-2 w-3/4 h-5 bg-slate-200 rounded"></p>
      </CardContent>

      <CardFooter>
        <Button size="lg" asChild>
          <div className="w-full h-11 bg-slate-300 rounded" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
