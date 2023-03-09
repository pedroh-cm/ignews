import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
  const stripeJs = await loadStripe("pk_test_51MiomsK4qNKhGxLucwJvGj4y6qk73dIbuHdOgybgQ00Cf0kmqRa1QUytxPvnmZfqF0WdCbeeL9yWEIGyTLBVVd4400UH6kmrXl");

  return stripeJs;
}