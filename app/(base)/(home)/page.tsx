import GetStartedBtn from "@/components/global/GetStartedBtn";
import Image from "next/image";
import BundlePricing from "@/components/subscription/BundlePricing";
import FAQ from "@/components/global/FAQ";
import { getUser } from "@/data/User";
import { redirect } from "next/navigation";
import YourPersonalDiaryApp from "@/components/home/YourPersonalDiaryApp";
import { merriweather } from "@/utils/google-fonts";
import FilterSection from "@/components/home/FilterSection";

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
        {/* <YourPersonalDiaryApp /> */}
        <YourPersonalDiaryApp />
      </section>

      <section className="flex flex-col items-center justify-center mt-20 lg:mt-32 max-w-[980px] mx-auto">
        <p
          className={`${merriweather.className} text-xl font-semibold text-gray-700 md:w-[700px] text-center mt-5`}
        >
          &apos;&apos;Your Journal Adapts to Your Preferences. It&apos;s as
          Focused or as Comprehensive as You Need It to Be.&apos;&apos;
        </p>
        <FilterSection />
      </section>

      {/* <Features /> */}

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
              $100 Off for the First 1000 Lifetime Users
            </h3>
            <p className="text-lg font-normal text-slate-500 mt-4">
              Get a lifetime subscription for just $139 instead of $239. Limited
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
