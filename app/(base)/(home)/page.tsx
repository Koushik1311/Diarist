import { createClient } from "@/utils/supabase/server";
import GetStartedBtn from "@/components/global/GetStartedBtn";
import Image from "next/image";
import Features from "@/components/home/Features";
import BundlePricing from "@/components/subscription/BundlePricing";
import FAQ from "@/components/global/FAQ";
import { getUser } from "@/data/User";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Index() {
  const user = await getUser();

  return (
    // <div className="flex-1 w-full flex flex-col gap-20 items-center">
    //   <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //     <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
    //       <DeployButton />
    //       {isSupabaseConnected && <AuthButton />}
    //     </div>
    //   </nav>

    //   <p>This is new Home page</p>
    // </div>
    <main className="container">
      <section className="mt-20">
        {/* Hero */}
        <div className="flex flex-col items-center justify-center gap-3 md:gap-5">
          <h1 className="text-[28px] md:text-4xl lg:text-6xl font-semibold text-center flex flex-col -space-y-3 lg:space-y-0 md:gap-2">
            <span className="text-gray-700">Embark</span>
            <span className="text-gray-700">on a Journey with</span>
            <span className="text-violet-500">
              Your Personal Digital Diary.
            </span>
          </h1>
          <p className="text-lg font-normal text-slate-500 text-center">
            Capture Moments, Reflect your Actions, and{" "}
            <span className="font-semibold">Grow from There.</span>
          </p>
        </div>

        {/* Button */}
        {user ? (
          <Link href="/diary">
            <Button className="mt-6 md:mt-8 flex mx-auto px-7 py-6">
              My diary
            </Button>
          </Link>
        ) : (
          <GetStartedBtn className="mt-6 md:mt-8 flex mx-auto px-7 py-6" />
        )}
      </section>

      <section className="flex items-center justify-center mt-12">
        <div className="shadow-[0px_19px_84px_1px_#ddd6fe] w-full h-full lg:w-[80%]">
          <Image
            src="/diary-image.jpg"
            width={1024}
            height={800}
            quality={100}
            alt="Diary Image"
            className="w-full h-full rounded-lg"
          />
        </div>
      </section>

      <Features />

      <section className="mt-24">
        <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-semibold text-violet-500">
          Special Lifetime Offer
        </h2>
        <p className="text-center text-lg md:text-xl text-slate-600 mt-2">
          Capture your memories and thoughts with our exclusive discount.
        </p>

        <div className="mt-8 flex flex-col items-center">
          {/* Lifetime Discount */}
          <div className="discount-box bg-violet-100 p-8 rounded-lg shadow-lg text-center max-w-md">
            <h3 className="text-2xl md:text-3xl font-semibold text-violet-700">
              $10 Off for the First 1000 Lifetime Users
            </h3>
            <p className="text-lg font-normal text-slate-500 mt-4">
              Get a lifetime subscription for just $39 instead of $49. Limited
              time offer for the first 1,000 users.
            </p>
            <ul className="text-left text-lg font-normal text-slate-500 mt-4 list-disc list-inside">
              <li>Lifetime access to all premium features</li>
              <li>Can add a single entry per day</li>
              <li>Unlimited storage for your diary entries</li>
              <li>Access your diary from any device, anytime</li>
              <li>Priority customer support</li>
            </ul>
            <GetStartedBtn className="mt-6 md:mt-8 px-7 py-4" />
          </div>
        </div>
      </section>

      {/* Bundle Pricing Section */}
      <section className="mt-24 flex items-center justify-center">
        <BundlePricing />
      </section>

      <FAQ />
    </main>
  );
}
