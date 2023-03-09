import { fauna } from "../../../services/fauna";

import { query } from "faunadb";
import { stripe } from "../../../services/stripe";


export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createdAction = false,
) {
  const userRefFauna = await fauna.query(
    query.Select(
      "ref",
      query.Get(
        query.Match(
          query.Index("user_by_customer_id"),
          customerId,
        )
      )
    )
  );

  const allDataSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  const subscriptionData = {
    id: allDataSubscription.id,
    userId: userRefFauna,
    status: allDataSubscription.status,
    price_id: allDataSubscription.items.data[0].price.id,
  };

  if (createdAction) {
    await fauna.query(
      query.Create(
        query.Collection("subscriptions"),
        {
          data: subscriptionData
        }
      )
    )
  } else {
    await fauna.query(
      query.Replace(
        query.Select(
          "ref",
          query.Get(
            query.Match(
              query.Index("subscription_by_id"),
              subscriptionId,
            )
          )
        ),
        { data: subscriptionData }
      )
    )
  }
}