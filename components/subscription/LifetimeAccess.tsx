import React from "react";
import { Check } from "lucide-react";
import GetStartedBtn from "../global/GetStartedBtn";
import { notFound } from "next/navigation";
import { getCheckoutURL } from "@/actions/lsCheckout";
import { cn } from "@/lib/utils";
import { fetchLifetimeStatus } from "@/data/server/subscription";

const basicVarientId = Number(
  process.env.LEMONSQUEEZY_BASIC_LIFETIME_VARIENT_ID
);
const premiumVarientId = Number(
  process.env.LEMONSQUEEZY_PREMIUM_LIFETIME_VARIENT_ID
);
const eliteVarientId = Number(
  process.env.LEMONSQUEEZY_ELITE_LIFETIME_VARIENT_ID
);

const checkoutCode = process.env.LEMONSQUEEZY_LIFETIME_DISCOUNT_CODE;

export default async function LifetimeAccess() {
  const basicUrl = await getCheckoutURL(basicVarientId, checkoutCode);
  const premiumUrl = await getCheckoutURL(premiumVarientId, checkoutCode);
  const eliteUrl = await getCheckoutURL(eliteVarientId, checkoutCode);

  const lifetimes = [
    {
      title: "Basic Lifetime Plan",
      url: basicUrl || "#",
      benefits: [
        "1 entry per day",
        "10 additional entries per year",
        "Additional entries can be used to create Time Capsules",
        "Time Capsule: Included, counts towards the daily entry limit",
      ],
      amount: "$169",
      discountAmount: "$69", // Discounted price for the first 1000 users
    },
    {
      title: "Premium Lifetime Plan",
      url: premiumUrl || "#",
      benefits: [
        "2 entries per day",
        "20 additional entries per year",
        "Additional entries can be used to create Time Capsules",
        "Time Capsule: Included, counts towards the daily entry limit",
      ],
      amount: "$269",
      discountAmount: "$169", // Discounted price for the first 1000 users
    },
    {
      title: "Elite Lifetime Plan",
      url: eliteUrl || "#",
      benefits: [
        "3 entries per day",
        "50 additional entries per year",
        "Additional entries can be used to create Time Capsules",
        "Time Capsule: Included, counts towards the daily entry limit",
      ],
      amount: "$369",
      discountAmount: "$269", // Discounted price for the first 1000 users
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-lg md:text-2xl mt-10 lg:text-2xl font-medium text-violet-500 md:w-[700px] mx-auto">
        Your Lifetime Plan, Tailored to Your Needs—Whether You Seek Essential
        Access or Comprehensive Benefits.
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full max-w-6xl">
        {lifetimes.map((lifetime, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg flex flex-col items-start justify-start ${
              index === 1
                ? "bg-violet-500 shadow-md text-white border border-violet-500"
                : "bg-white shadow-lg text-gray-700 border border-gray-200"
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold">{lifetime.title}</h3>
            </div>
            <ul className="text-base flex flex-col gap-3 mb-12">
              {lifetime.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check
                    className={cn(
                      "w-5 h-5 p-1 rounded-full mt-[2px]",
                      index === 1
                        ? "bg-white text-violet-500"
                        : "bg-violet-500 text-white"
                    )}
                  />
                  <p className="flex-1">{benefit}</p>
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-end">
              <div className="flex flex-col items-start justify-center">
                <p className="text-xl font-normal line-through ">
                  {lifetime.amount}
                </p>
              </div>
              <div className="flex flex-col items-start justify-center ml-3">
                <p className="text-4xl font-bold">{lifetime.discountAmount}</p>
              </div>
            </div>
            <GetStartedBtn
              className={cn(
                "w-full mt-5 px-7 py-4",
                index === 1
                  ? "text-violet-600 hover:text-violet-600"
                  : "text-white"
              )}
              variantName={index === 1 ? "outline" : "default"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
