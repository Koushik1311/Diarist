import React from "react";
import { Check } from "lucide-react";
import GetStartedBtn from "../global/GetStartedBtn";
import { cn } from "@/lib/utils";
import { textSpanOverlapsWith } from "typescript";

export default function BundlePricing() {
  const bundles = [
    {
      entries: 10,
      price: 0.5,
      effectiveCost: 0.05,
      benefits: [
        "Ideal for personal use",
        "Track daily activities",
        "Update entries on the go",
      ],
    },
    {
      entries: 25,
      price: 1.2,
      effectiveCost: 0.048,
      benefits: [
        "More entries for frequent use",
        "Enhanced tracking features",
        "Priority customer support",
      ],
    },
    {
      entries: 50,
      price: 2.4,
      effectiveCost: 0.048,
      benefits: [
        "Maximum entries for extensive use",
        "Advanced analytics",
        "Customizable themes",
      ],
    },
  ];

  return (
    <section className="mt-24">
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
                <p className="text-lg font-normal mt-2">
                  Each entry effectively costs $
                  {bundle.effectiveCost.toFixed(3)}.
                </p>
              </div>
              <ul className="text-base flex flex-col gap-1 mb-12">
                {bundle.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-start justify-center">
                  <p className="text-4xl font-bold">
                    ${bundle.price.toFixed(2)}
                  </p>
                  <p className="text-lg font-normal mt-2">
                    Total for {bundle.entries} entries
                  </p>
                </div>
              </div>
              <GetStartedBtn
                className={cn(
                  "mt-6 md:mt-8 px-7 py-4",
                  index === 1 ? "text-black" : "text-white"
                )}
                variantName={index === 1 ? "outline" : "default"} // Set variantName based on index
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
