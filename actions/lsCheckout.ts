import { getUser } from "@/data/User";
import { configureLemonSqueezy } from "@/utils/lemonsqueezy";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

export async function getCheckoutURL(variantId: number, discountCode?: string) {
  configureLemonSqueezy();

  const user = await getUser();

  if (!user) {
    // throw new Error("User is not authenticated.");
    return "";
  }

  const checkoutOptions = {
    checkoutOptions: {
      embed: false,
      media: false,
      logo: true,
    },
    checkoutData: {
      email: user.email ?? undefined,
      name: user?.user_metadata.display_name || user?.user_metadata.full_name,
      custom: {
        user_id: user.id,
        name: user?.user_metadata.display_name || user?.user_metadata.full_name,
        email: user.email,
      },
    },
    productOptions: {
      enabledVariants: [variantId],
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/diary`,
      // receiptButtonText: "Go to Dashboard",
      // receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
    },
  };

  if (discountCode) {
    (checkoutOptions.checkoutData as any).discountCode = discountCode;
  }

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    checkoutOptions
  );

  // console.log(checkout.data?.data.attributes.url);
  // console.log("Check: ", `${process.env.NEXT_PUBLIC_APP_URL}/diary`);

  return checkout.data?.data.attributes.url;
}
