import { GetStaticProps } from 'next';
import { stripe } from '../services/stripe';

import { Home } from "../templates/Home";

interface IndexProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1MiopmK4qNKhGxLuAsBn2ih0', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}

export default function index({ product }: IndexProps) {
 return (
  <Home product={product} />
 )
}
