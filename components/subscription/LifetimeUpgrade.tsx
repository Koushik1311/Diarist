import { getCheckoutURL } from "@/actions/lsCheckout";
import { fetchLifetimeStatus } from "@/data/server/subscription";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const basicToPremiumUpgradeVarientId = Number(
  process.env.LEMONSQUEEZY_BASIC_TO_PREMIUM_UPGRADE_VARIENT_ID
);
const basicToEliteUpgradeVarientId = Number(
  process.env.LEMONSQUEEZY_BASIC_TO_ELITE_UPGRADE_VARIENT_ID
);
const premiumToEliteUpgradeVarientId = Number(
  process.env.LEMONSQUEEZY_PREMIUM_TO_ELITE_UPGRADE_VARIENT_ID
);

export default async function LifetimeUpgrade({ userId }: { userId: string }) {
  const basicToPremiumUpgradeUrl = await getCheckoutURL(
    basicToPremiumUpgradeVarientId
  );
  const basicToEliteUpgradeUrl = await getCheckoutURL(
    basicToEliteUpgradeVarientId
  );
  const premiumToEliteUpgradeUrl = await getCheckoutURL(
    premiumToEliteUpgradeVarientId
  );

  const { lifetimeStatus } = await fetchLifetimeStatus(userId);

  const lifetimes = [
    {
      title: "Basic Lifetime Plan",
      url: "#",
      benefits: [
        "1 entry per day",
        "10 additional entries per year",
        "Additional entries can be used to create Time Capsules",
        "Time Capsule: Included, counts towards the daily entry limit",
      ],
      amount: "$169",
    },
    {
      title: "Premium Lifetime Plan",
      url: basicToPremiumUpgradeUrl || "#",
      benefits: [
        "2 entries per day",
        "20 additional entries per year",
        "Additional entries can be used to create Time Capsules",
        "Time Capsule: Included, counts towards the daily entry limit",
      ],
      amount: "$269",
    },
    {
      title: "Elite Lifetime Plan",
      url:
        lifetimeStatus?.lifetime! === "basic"
          ? basicToEliteUpgradeUrl
          : premiumToEliteUpgradeUrl || "#",
      benefits: [
        "3 entries per day",
        "50 additional entries per year",
        "Additional entries can be used to create Time Capsules",
        "Time Capsule: Included, counts towards the daily entry limit",
      ],
      amount: "$369",
    },
  ];

  const { lifetimeStatus: userLifetimeStatus } = await fetchLifetimeStatus(
    userId
  );

  console.log("User ", userLifetimeStatus);
  console.log("Lifetime ", lifetimeStatus);

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
              <div className="flex flex-col items-start justify-center ml-3">
                <p className="text-4xl font-bold">{lifetime.amount}</p>
              </div>
            </div>

            {userLifetimeStatus?.lifetime === "basic" ? (
              index === 0 ? (
                // If user has Basic plan and the current index is 0 (Basic)
                <div className="cursor-not-allowed">
                  <Button className="w-full mt-5 px-7 py-4 text-white" disabled>
                    Active
                  </Button>
                </div>
              ) : (
                // If user has Basic plan and the current index is 1 (Premium) or 2 (Elite)
                <Link href={lifetime.url!}>
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
              )
            ) : userLifetimeStatus?.lifetime === "premium" ? (
              index === 1 ? (
                // If user has Premium plan and the current index is 1 (Premium)
                <div className="cursor-not-allowed">
                  <Button
                    className="w-full mt-5 px-7 py-4 text-violet-600 hover:text-violet-600"
                    variant="outline"
                    disabled
                  >
                    Active
                  </Button>
                </div>
              ) : index === 2 ? (
                // If user has Premium plan and the current index is 2 (Elite)
                <Link href={lifetime.url!}>
                  <Button
                    className="w-full mt-5 px-7 py-4 text-white"
                    variant="default"
                  >
                    Purchase Now
                  </Button>
                </Link>
              ) : (
                // If user has Premium plan and the current index is 0 (Basic)
                <div className="cursor-not-allowed">
                  <Button
                    className="w-full mt-5 px-7 py-4 text-gray-400"
                    disabled
                  >
                    Not Applicable
                  </Button>
                </div>
              )
            ) : userLifetimeStatus?.lifetime === "elite" ? (
              index === 2 ? (
                // If user has Elite plan and the current index is 2 (Elite)
                <div className="cursor-not-allowed">
                  <Button className="w-full mt-5 px-7 py-4 text-white" disabled>
                    Active
                  </Button>
                </div>
              ) : (
                // If user has Elite plan and the current index is 0 (Basic) or 1 (Premium)
                <div className="cursor-not-allowed">
                  <Button
                    className="w-full mt-5 px-7 py-4 text-gray-400"
                    disabled
                  >
                    Not Applicable
                  </Button>
                </div>
              )
            ) : (
              // Default case, if the user's status is not recognized
              <Link href={lifetime.url!}>
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
