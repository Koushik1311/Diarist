import React from "react";
import { Check } from "lucide-react";
import GetStartedBtn from "../global/GetStartedBtn";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
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

export default async function LifetimeAccess({
  isUser,
  userId,
}: {
  isUser: boolean;
  userId: string;
}) {
  const basicUrl = await getCheckoutURL(basicVarientId, checkoutCode);
  const premiumUrl = await getCheckoutURL(premiumVarientId, checkoutCode);
  const eliteUrl = await getCheckoutURL(eliteVarientId, checkoutCode);

  const lifetimes = [
    {
      title: "Basic Lifetime Plan",
      url: basicUrl || "#",
      benefits: [
        "1 entry per day",
        "5 additional entries per year",
        "Time Capsule: Included, counts towards the daily entry limit",
        "Private Memory Vault: Included, with a limit of 50 encrypted entries",
      ],
      amount: "$239",
      discountAmount: "$139",
    },
    {
      title: "Premium Lifetime Plan",
      url: premiumUrl || "#",
      benefits: [
        "2 entry per day",
        "10 additional entries per year",
        "Time Capsule: Included, counts towards the daily entry limit",
        "Private Memory Vault: Included, with a limit of 100 encrypted entries",
      ],
      amount: "$399",
      discountAmount: "$299",
    },
    {
      title: "Elite Lifetime Plan",
      url: eliteUrl || "#",
      benefits: [
        "3 entry per day",
        "25 additional entries per year",
        "Time Capsule: Included, counts towards the daily entry limit",
        "Private Memory Vault: Included, with a limit of 200 encrypted entries",
      ],
      amount: "$599",
      discountAmount: "$499",
    },
  ];

  const { lifetimeStatus } = await fetchLifetimeStatus(userId);

  if (
    basicUrl === undefined ||
    premiumUrl === undefined ||
    eliteUrl === undefined
  ) {
    return notFound();
  }

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
              <>
                {(lifetimeStatus?.lifetime === "basic" && index === 1) ||
                (lifetimeStatus?.lifetime === "premium" && index === 2) ||
                (lifetimeStatus?.lifetime === "elite" && index === 3) ? (
                  <div className="cursor-not-allowed">
                    <Button
                      className={cn(
                        "w-full mt-5 px-7 py-4",
                        index === 1
                          ? "text-violet-600 hover:text-violet-600"
                          : "text-white"
                      )}
                      variant={index === 1 ? "outline" : "default"}
                      disabled
                    >
                      Active
                    </Button>
                  </div>
                ) : (
                  <Link href={lifetime.url}>
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
