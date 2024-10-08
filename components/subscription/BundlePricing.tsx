import React from "react";
import { Check } from "lucide-react";
import GetStartedBtn from "../global/GetStartedBtn";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { getCheckoutURL } from "@/actions/lsCheckout";

export default async function BundlePricing({ isUser }: { isUser?: boolean }) {
  const urlEntry10 = await getCheckoutURL(
    Number(process.env.LEMONSQUEEZY_10ENTRY_VARIENT_ID)
  );
  const urlEntry25 = await getCheckoutURL(
    Number(process.env.LEMONSQUEEZY_25ENTRY_VARIENT_ID)
  );
  const urlEntry50 = await getCheckoutURL(
    Number(process.env.LEMONSQUEEZY_50ENTRY_VARIENT_ID)
  );

  const bundles = [
    {
      entries: 10,
      amount: "$0.50",
      url: urlEntry10 || "#",
      benefits: [
        "Get 10 entries",
        "Entries can be used in Time Capsule",
        "Purchase more entries as needed",
      ],
    },
    {
      entries: 25,
      amount: "$1.20",
      url: urlEntry25 || "#",
      benefits: [
        "Get 25 entries",
        "Entries can be used in Time Capsule",
        "Purchase more entries as needed",
      ],
    },
    {
      entries: 50,
      amount: "$2.40",
      url: urlEntry50 || "#",
      benefits: [
        "Get 50 entries",
        "Entries can be used in Time Capsule",
        "Purchase more entries as needed",
      ],
    },
  ];

  if (
    urlEntry10 === undefined ||
    urlEntry25 === undefined ||
    urlEntry50 === undefined
  ) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-lg md:text-2xl mt-10 lg:text-2xl font-medium text-violet-500 md:w-[700px] mx-auto">
        Flexible Bundles to Suit Your Needs—Choose the Right Amount of Entries
        for Your Personal Journey.
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
                <p className="text-4xl font-bold">{bundle.amount}</p>
              </div>
            </div>
            {!isUser ? (
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
              <Link href={bundle.url}>
                <Button
                  className={cn(
                    "w-full mt-5 px-7 py-4",
                    index === 1
                      ? "text-violet-600 hover:text-violet-600"
                      : "text-white"
                  )}
                  variant={index === 1 ? "outline" : "default"}
                >
                  Purchase Now
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
