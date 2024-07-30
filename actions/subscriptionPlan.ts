import { configureLemonSqueezy } from "@/utils/lemonsqueezy";
import { getVariant } from "@lemonsqueezy/lemonsqueezy.js";

export async function getSubscriptionDetails(variantId: number) {
  configureLemonSqueezy();

  const { statusCode, error, data } = await getVariant(variantId, {
    include: ["product"],
  });

  return data?.data.attributes;
}
