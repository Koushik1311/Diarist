import { updateSubscription } from "@/data/subscription";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const lifetimeVarientId = Number(
      process.env.LEMONSQUEEZY_LIFETIME_VARIENT_ID
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
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SIGNATURE as string;
    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(
      hmac.update(await clonedReq.text()).digest("hex"),
      "utf8"
    );
    const signature = Buffer.from(req.headers.get("X-Signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      throw new Error("Invalid signature.");
    }

    // TODO: Remove me
    // console.log(body);

    // Logic according to event
    if (eventType === "order_created") {
      const isSuccessful = body.data.attributes.status === "paid";
      const userId: string = body.meta.custom_data.user_id;
      const varientId: number =
        body.data.attributes.first_order_item.variant_id;
      if (isSuccessful) {
        if (varientId === lifetimeVarientId) {
          await updateSubscription(userId, { lifetime: true });
        } else if (varientId === entry10VarientId) {
          await updateSubscription(userId, { entries: 10 });
        } else if (varientId === entry25VarientId) {
          await updateSubscription(userId, { entries: 25 });
        } else if (varientId === entry50VarientId) {
          await updateSubscription(userId, { entries: 50 });
        }
      }
    }

    return Response.json({ message: "Webhook received" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
