import React from "react";
import { Check } from "lucide-react";
import GetStartedBtn from "../global/GetStartedBtn";
import { cn } from "@/lib/utils";
import { getUser } from "@/data/User";
import Link from "next/link";
import { Button } from "../ui/button";
import { getLSSingleProduct } from "@/data/lemonsqueezy/getProducts";
import { notFound } from "next/navigation";

export default async function BundlePricing() {
  const user = await getUser();
  const get10BundleProduct = await getLSSingleProduct(
    Number(process.env.LEMONSQUEEZY_10ENTRY_PRODUCT_ID)
  );
  const get25BundleProduct = await getLSSingleProduct(
    Number(process.env.LEMONSQUEEZY_25ENTRY_PRODUCT_ID)
  );
  const get50BundleProduct = await getLSSingleProduct(
    Number(process.env.LEMONSQUEEZY_50ENTRY_PRODUCT_ID)
  );

  const bundles = [
    {
      entries: 10,
      price: 0.5,
      url: get10BundleProduct?.attributes.buy_now_url || "#",
      benefits: [
        "Get 10 entries",
        "Track daily activities",
        "Update entries on the go",
      ],
    },
    {
      entries: 25,
      price: 1.2,
      url: get25BundleProduct?.attributes.buy_now_url || "#",
      benefits: [
        "Get 25 entries",
        "Track daily activities",
        "Update entries on the go",
      ],
    },
    {
      entries: 50,
      price: 2.4,
      url: get50BundleProduct?.attributes.buy_now_url || "#",
      benefits: [
        "Get 50 entries",
        "Track daily activities",
        "Update entries on the go",
      ],
    },
  ];

  if (!get10BundleProduct && !get25BundleProduct && !get50BundleProduct) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-semibold text-violet-500">
        Bundle Pricing
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full max-w-6xl">
        {bundles.map((bundle, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg flex flex-col items-start justify-start ${
              index === 1
                ? "bg-violet-500 shadow-md text-white border border-violet-500"
                : "bg-white shadow-lg text-gray-700 border border-gray-200"
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold">
                {bundle.entries} Entries
              </h3>
            </div>
            <ul className="text-base flex flex-col gap-3 mb-12">
              {bundle.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check
                    className={cn(
                      "w-5 h-5 p-1 rounded-full",
                      index === 1
                        ? "bg-white text-violet-500"
                        : "bg-violet-500 text-white"
                    )}
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-start justify-center">
                <p className="text-4xl font-bold">${bundle.price.toFixed(2)}</p>
              </div>
            </div>
            {!user ? (
              <GetStartedBtn
                className={cn(
                  "w-full mt-5 px-7 py-4",
                  index === 1
                    ? "text-violet-600 hover:text-violet-600"
                    : "text-white"
                )}
                variantName={index === 1 ? "outline" : "default"} // Set variantName based on index
              />
            ) : (
              <Link href={bundle.url!} className="w-full">
                <Button
                  className={cn(
                    "w-full mt-5 px-7 py-4",
                    index === 1
                      ? "text-violet-600 hover:text-violet-600"
                      : "text-white"
                  )}
                  variant={index === 1 ? "outline" : "default"}
                >
                  Buy now
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
