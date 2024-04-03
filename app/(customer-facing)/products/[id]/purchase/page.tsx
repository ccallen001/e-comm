import { notFound } from 'next/navigation';
import Stripe from 'stripe';
import { getProductById } from '@/actions';
import CheckoutForm from '@/components/CheckoutForm';

interface ProductPurchasePageProps {
  params: {
    id: string;
  };
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

async function ProductPurchasePage(props: ProductPurchasePageProps) {
  const productToPurchase = await getProductById(props.params.id);

  if (!productToPurchase) return notFound();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: productToPurchase.priceInCents,
    currency: 'usd',
    metadata: {
      productId: productToPurchase.id,
    },
  });
  const clientSecret = paymentIntent.client_secret;

  if (!clientSecret) {
    throw Error('Stripe failed to create payment intent');
  }

  return <CheckoutForm {...{ productToPurchase, clientSecret }} />;
}

export default ProductPurchasePage;
