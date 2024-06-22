import React from "react";
import { Check } from "lucide-react";
import GetStartedBtn from "../global/GetStartedBtn";
import { getLSSingleProduct } from "@/data/lemonsqueezy/getProducts";
import { notFound } from "next/navigation";

const productId = Number(process.env.LEMONSQUEEZY_LIFETIME_PRODUCT_ID);

export default async function LifetimeAccess() {
  const lifetimeProduct = await getLSSingleProduct(productId);

  const price = {
    title: "Lifetime Access",
    description: "Start your personal diary journey",
    benefits: [
      "Access from anywhere",
      "Track your daily activity",
      "Reflect on your action",
      "Single diary entry everyday",
      "Update your entry on the go",
    ],
    amount: lifetimeProduct?.attributes.price_formatted,
    priceId: "price_1PLIILSFtb4t8pCU8nnVHMqD",
  };

  if (!lifetimeProduct) {
    return notFound();
  }

  return (
    <section className="flex flex-col items-center mt-24">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold text-violet-500 mb-8">
        {price.title}
      </h2>
      <div className="p-6 rounded-lg flex flex-col items-start justify-start bg-violet-500 shadow-lg text-white border border-violet-500">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">One-Time Payment</h3>
        </div>
        <ul className="text-base flex flex-col gap-3 mb-12">
          {price.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 p-1 rounded-full bg-white text-violet-500" />
              {benefit}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-start justify-center">
            <p className="text-4xl font-bold">{price.amount}</p>
          </div>
        </div>

        <GetStartedBtn
          className="w-full mt-5 px-7 py-4 text-violet-600 hover:text-violet-600"
          variantName="outline"
        />
      </div>
    </section>
  );
}
