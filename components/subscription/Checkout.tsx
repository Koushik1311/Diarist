"use client";

import React from "react";
import { Button } from "../ui/button";
import { checkout } from "@/lib/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

export default function Checkout({
  priceId,
  userEmail,
}: {
  priceId: string;
  userEmail: string;
}) {
  const handleCheckout = async () => {
    const data = JSON.parse(
      await checkout(userEmail, priceId, location.origin)
    );

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    const res = await stripe?.redirectToCheckout({ sessionId: data.id });

    if (res?.error) {
      console.log("Fail to checkout");
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      className="text-violet-500 bg-white hover:bg-violet-100 font-bold w-full transition-colors"
    >
      Get started
    </Button>
  );
}
