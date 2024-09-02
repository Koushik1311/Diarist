import {
  fetchEntries,
  updateSubscriptionData,
} from "@/data/client/subscription";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const basicLifetimeVarientId = Number(
      process.env.LEMONSQUEEZY_BASIC_LIFETIME_VARIENT_ID
    );
    const premiumLifetimeVarientId = Number(
      process.env.LEMONSQUEEZY_PREMIUM_LIFETIME_VARIENT_ID
    );
    const eliteLifetimeVarientId = Number(
      process.env.LEMONSQUEEZY_ELITE_LIFETIME_VARIENT_ID
    );

    const entry10VarientId = Number(
      process.env.LEMONSQUEEZY_10ENTRY_VARIENT_ID
    );
    const entry25VarientId = Number(
      process.env.LEMONSQUEEZY_25ENTRY_VARIENT_ID
    );
    const entry50VarientId = Number(
      process.env.LEMONSQUEEZY_50ENTRY_VARIENT_ID
    );

    // Catch the event type
    const clonedReq = req.clone();
    const eventType = req.headers.get("X-Event-Name");
    const body = await req.json();

    // Check signature
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET as string;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    // Logic according to event
    if (eventType === "order_created") {
      const isSuccessful = body.data.attributes.status === "paid";
      const userId: string = body.meta.custom_data.user_id;
      const varientId: number =
        body.data.attributes.first_order_item.variant_id;
      if (isSuccessful) {
        const { entriesData } = await fetchEntries(userId);

        if (varientId === basicLifetimeVarientId) {
          await updateSubscriptionData({
            userId: userId,
            dailyEntryLimit: 1,
            entries: entriesData?.entries! + 10,
            lifetime: "basic",
          });
        } else if (varientId === premiumLifetimeVarientId) {
          await updateSubscriptionData({
            userId: userId,
            dailyEntryLimit: 2,
            entries: entriesData?.entries! + 20,
            lifetime: "premium",
          });
        } else if (varientId === eliteLifetimeVarientId) {
          await updateSubscriptionData({
            userId: userId,
            dailyEntryLimit: 3,
            entries: entriesData?.entries! + 50,
            lifetime: "elite",
          });
        } else if (varientId === entry10VarientId) {
          await updateSubscriptionData({
            userId: userId,
            entries: entriesData?.entries! + 10,
            lifetime: "none",
          });
        } else if (varientId === entry25VarientId) {
          await updateSubscriptionData({
            userId: userId,
            entries: entriesData?.entries! + 25,
            lifetime: "none",
          });
        } else if (varientId === entry50VarientId) {
          await updateSubscriptionData({
            userId: userId,
            entries: entriesData?.entries! + 50,
            lifetime: "none",
          });
        }
      }
    }

    return new Response(JSON.stringify({ message: "Webhook received" }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
