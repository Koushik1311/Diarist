import GetStartedBtn from "@/components/global/GetStartedBtn";
import Image from "next/image";
import BundlePricing from "@/components/subscription/BundlePricing";
import FAQ from "@/components/global/FAQ";
import { getUser } from "@/data/User";
import { redirect } from "next/navigation";
import YourPersonalDiaryApp from "@/components/home/YourPersonalDiaryApp";
import { merriweather } from "@/utils/google-fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CalendarHeart, FileStack, MoveRight } from "lucide-react";

export default async function Index() {
  const user = await getUser();

  if (user) {
    redirect("/diary");
  }

  return (
    <main className="container px-10 md:px-16 lg:px-0 max-w-[1150px]">
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

        <GetStartedBtn className="mt-6 md:mt-8 flex mx-auto px-7 py-6" />
      </section>

      {/* App Image */}
      <section className="flex items-center justify-center mt-12">
        <div className="shadow-[0px_19px_84px_1px_#ddd6fe] w-full h-full lg:w-[900px]">
          <Image
            src="/font.png"
            width={2879}
            height={1574}
            quality={100}
            priority
            alt="Diary Image"
            className="w-[900px] h-auto rounded-lg"
          />
        </div>
      </section>

      <section className="flex items-center justify-center mt-20 lg:mt-32">
        <YourPersonalDiaryApp />
      </section>

      <section className="flex flex-col items-center justify-center mt-20 lg:mt-32 max-w-[980px] mx-auto">
        <p
          className={`${merriweather.className} text-xl font-semibold text-violet-500 md:w-[700px] text-center mt-5`}
        >
          “Your Journal Adapts to Your Preferences. It&apos;s as Focused or as
          Comprehensive as You Need It to Be.”
        </p>
      </section>

      {/* <Features /> */}

      <section className="mt-16 bg-gray-50 py-12 px-4 md:px-8 lg:px-16">
        <div className="text-center">
          <h2 className="text-[28px] md:text-3xl lg:text-4xl font-semibold text-violet-500 mb-8">
            Special Lifetime Offer
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16">
          <Image
            src="/offer_11545137.png"
            width={200}
            height={200}
            quality={100}
            priority={true}
            alt="Discount"
            className="w-32 lg:w-48 h-auto"
          />
          <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700">
              $100 off for the first 1000 Lifetime Users
            </p>
            <p className="text-sm md:text-base text-slate-500">
              Sign up today for a lifetime membership!
            </p>
            <GetStartedBtn className="" />
          </div>
        </div>
      </section>

      <section className="mt-16 bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
        <div className="text-left">
          <h2 className="text-[28px] md:text-3xl lg:text-4xl font-semibold text-violet-500 mb-3">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-700 font-medium mb-8">
            Get started with our bundle system or purches lifetime plan!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Lifetime Membership Card */}
          <div className="bg-white p-6 w-full lg:w-1/2 flex flex-col">
            <CalendarHeart className="w-16 h-16 text-violet-500 mb-3" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Lifetime
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              One-time payment for lifetime access.
            </p>
            <Link
              href="/pricing/lifetime"
              className="hover:text-violet-500 transition-all flex items-center gap-3"
            >
              <span className="font-medium">Explore Lifetime Options</span>
              <MoveRight />
            </Link>
          </div>

          {/* Bundle Options Card */}
          <div className="bg-white p-6 w-full lg:w-1/2 flex flex-col">
            <FileStack className="w-16 h-16 text-violet-500 mb-3" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Bundle Options
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Choose from flexible bundles.
            </p>
            <Link
              href="/pricing/bundle"
              className="hover:text-violet-500 transition-all flex items-center gap-3"
            >
              <span className="font-medium">Explore Bundle Options</span>
              <MoveRight />
            </Link>
          </div>
        </div>
      </section>

      <FAQ />
    </main>
  );
}
