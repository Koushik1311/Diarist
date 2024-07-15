import { getUser } from "@/data/User";
import { configureLemonSqueezy } from "@/utils/lemonsqueezy";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";

export async function getCheckoutURL(variantId: number, embed = true) {
  configureLemonSqueezy();

  const user = await getUser();

  if (!user) {
    return "";
  }

  const checkout = await createCheckout(
    process.env.LEMONSQUEEZY_STORE_ID!,
    variantId,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email: user.email ?? undefined,
        name: user?.user_metadata.display_name || user?.user_metadata.full_name,
        custom: {
          user_id: user.id,
          name:
            user?.user_metadata.display_name || user?.user_metadata.full_name,
          email: user.email,
        },
      },
      productOptions: {
        enabledVariants: [variantId],
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/diary`,
        // receiptButtonText: "Go to Dashboard",
        // receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
      },
    }
  );

  console.log(checkout.data?.data.attributes.url);

  // return checkout.data?.data.attributes.url;
}
