import React from "react";
import { Check } from "lucide-react";
import Checkout from "./Checkout";
import { getUser } from "@/data/User";

export default async function LifetimeAccess() {
  const price = {
    title: "Life-time access",
    description: "Start your personal diary journey",
    benefits: [
      "Access from anywhere",
      "Track your daily activity",
      "Reflect on your action",
      "Single diary entry everyday",
      "Update your entry on the go",
    ],
    amount: 39,
    priceId: "price_1PLIILSFtb4t8pCU8nnVHMqD",
  };

  const user = await getUser();

  const user_email = user?.email;

  return (
    <section className="bg-violet-500 text-white px-8 py-8 rounded-lg">
      <h2 className="text-3xl font-medium">{price.title}</h2>
      <p className="my-4 text-base text-violet-300 font-semibold">
        {price.description}
      </p>
      <ul className="text-base flex flex-col gap-3 mb-10">
        {price.benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-3">
            <Check className="w-5 h-5 p-1 bg-white rounded-full text-violet-500" />
            {benefit}
          </li>
        ))}
      </ul>

      <p className="text-4xl font-medium mb-5">${price.amount}</p>

      <Checkout priceId={price.priceId} userEmail={user_email!} />
    </section>
  );
}
