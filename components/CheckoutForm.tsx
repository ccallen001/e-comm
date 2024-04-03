'use client';

import { FormEvent, useState } from 'react';

import { Product } from '@/types';
import { loadStripe } from '@stripe/stripe-js';
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/formatters';

interface CheckoutFormProps {
  productToPurchase: Product;
  clientSecret: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
);

function CheckoutFormForm({ priceInCents }: { priceInCents: number }) {
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    // TODO :: check for existing order

    // stripe.confirmPayment({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription className="text-destructive">Error</CardDescription>
        </CardHeader>

        <CardContent>
          <PaymentElement />
        </CardContent>

        <CardFooter>
          <Button
            className="w-full font-bold"
            size="lg"
            disabled={!stripe || !elements || isLoading}
          >
            {isLoading
              ? 'Processing...'
              : `Purchase - ${formatCurrency(priceInCents / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

function CheckoutForm({ productToPurchase, clientSecret }: CheckoutFormProps) {
  const { priceInCents, name, description } = productToPurchase;

  return (
    <>
      <div className="max-w-5xl mx-auto mb-8 p-8 bg-slate-100 rounded-sm shadow-md">
        <div className="flex gap-4 justify-center items-center">
          <div>
            <header className="text-2xl font-bold">
              {formatCurrency(priceInCents / 100)}
            </header>
            <p className="font-bold">{name}</p>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutFormForm {...{ priceInCents }} />
      </Elements>
    </>
  );
}

export default CheckoutForm;
