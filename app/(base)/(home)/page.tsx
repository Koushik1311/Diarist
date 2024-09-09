import GetStartedBtn from "@/components/global/GetStartedBtn";
import Image from "next/image";
import FAQ from "@/components/global/FAQ";
import { getUser } from "@/data/User";
import { redirect } from "next/navigation";
import YourPersonalDiaryApp from "@/components/home/YourPersonalDiaryApp";
import Link from "next/link";
import { CalendarHeart, FileStack, MoveRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faBullseye,
  faCalendarAlt,
  faCameraRetro,
  faClock,
  faFaceSmile,
  faLock,
  faPen,
  faSearch,
  faSeedling,
  faSmile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { merriweather } from "@/utils/google-fonts";

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
        <p className="text-center font-medium mt-4 text-violet-700">
          First 1000 users will get 20 bonus entries!
        </p>
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

      {/* Add moods */}
      <section className="mt-28">
        <h2 className="text-[28px] md:text-3xl lg:text-4xl font-semibold text-violet-500 mt-5 text-center">
          Add Moods to Your Entry
        </h2>
        <p
          className={`${merriweather.className} mx-auto text-center text-xl font-medium text-violet-500 mt-6 lg:w-[60%]`}
        >
          “Embrace the shades of your feelings, for each mood is a chapter in
          the story of your journey.”
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-between mt-12">
          <div className="px-6 py-6 h-auto bg-violet-400 flex items-center justify-center rounded-lg">
            <Image
              src="/mood-diary.png"
              width={2879}
              height={1574}
              quality={100}
              priority
              alt="Diary Image"
              className="w-[600px] h-auto rounded-lg shadow-lg"
            />
          </div>

          <p className="mt-2 text-lg font-medium lg:max-w-[40%] text-center lg:text-left">
            When writing a diary entry, choose a mood that reflects how you're
            feeling. It's a simple way to track your emotions as you journal,
            allowing you to look back and see your emotional journey over time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10 mt-10">
          <div className="px-6 py-6 h-auto bg-violet-400 flex items-center justify-center rounded-lg">
            <Image
              src="/mood-diary.png"
              width={2879}
              height={1574}
              quality={100}
              priority
              alt="Diary Image"
              className="w-[600px] h-auto rounded-lg shadow-lg"
            />
          </div>
          <p className="mt-2 text-lg font-medium lg:max-w-[40%] text-center lg:text-left">
            For the time capsule, select a mood to capture your state of mind
            and pick a future date for it to unlock. It's a way to share your
            thoughts and feelings with your future self, preserving a piece of
            your present.
          </p>
        </div>
      </section>

      {/* Journal */}

      <section className="mt-20 md:mt-28">
        <span className="bg-violet-200 font-semibold rounded-md px-3 py-1">
          Journal
        </span>
        <h2 className="text-[28px] md:text-3xl lg:text-4xl font-semibold text-violet-500 mt-5">
          Daily Journal
        </h2>
        <p className="mt-2 font-semibold text-slate-500 lg:max-w-[50%]">
          Capture today&apos;s events and reflections in your journal. Describe
          what happened, how you felt, and save your entry on Diarist. Your
          thoughts are valuable, and recording them will help you keep track of
          your journey and emotions.
        </p>
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faSeedling}
              className="w-auto h-20 md:h-24 mt-1 text-orange-500"
            />
            <p className="font-semibold md:text-center">
              <span>Reflect on Personal Growth</span>
              <br />
              <span className="text-slate-500">
                Track your progress and personal development over time.
              </span>
            </p>
          </li>
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faBrain}
              className="w-auto h-20 md:h-24 mt-1 text-amber-500"
            />
            <p className="font-semibold md:text-center">
              <span>Manage Stress</span>
              <br />
              <span className="text-slate-500">
                Use journaling as a therapeutic outlet to reduce stress and gain
                clarity.
              </span>
            </p>
          </li>
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faCameraRetro}
              className="w-auto h-20 md:h-24 mt-1 text-yellow-500"
            />
            <p className="font-semibold md:text-center">
              <span>Preserve Memories</span>
              <br />
              <span className="text-slate-500">
                Capture moments and experiences to look back on in the future.
              </span>
            </p>
          </li>
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faBullseye}
              className="w-auto h-20 md:h-24 mt-1 text-yellow-600"
            />
            <p className="font-semibold md:text-center">
              <span>Set and Achieve Goals</span>
              <br />
              <span className="text-slate-500">
                Write down your goals and track your steps towards achieving
                them.
              </span>
            </p>
          </li>
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faSearch}
              className="w-auto h-20 md:h-24 mt-1 text-amber-600"
            />
            <p className="font-semibold md:text-center">
              <span>Enhance Self-Awareness</span>
              <br />
              <span className="text-slate-500">
                Explore your thoughts and feelings to gain deeper insights into
                yourself.
              </span>
            </p>
          </li>
        </ul>
      </section>

      {/* Time capsule */}

      <section className="mt-20">
        <span className="bg-violet-200 font-semibold rounded-md px-3 py-1">
          Time Capsule
        </span>
        <h2 className="text-[28px] md:text-3xl lg:text-4xl font-semibold text-violet-500 mt-5">
          Your Time Capsule
        </h2>
        <p className="mt-2 font-semibold text-slate-500 lg:max-w-[50%]">
          Write a message to your future self, reflecting on what you want to
          share. Add your current mood and select a date for when you'd like the
          time capsule to be unlocked. Once you're done, save your entry.
        </p>
        <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faUser}
              className="w-auto h-24 mt-1 text-orange-500"
            />
            <p className="font-semibold md:text-center">
              <span>For Self-Reflection</span>
              <br />
              <span className="text-slate-500">
                Ideal for individuals who want to reflect on their growth and
                experiences over time.
              </span>
            </p>
          </li>
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="w-auto h-24 mt-1 text-amber-500"
            />
            <p className="font-semibold md:text-center">
              <span>For Goal Setting</span>
              <br />
              <span className="text-slate-500">
                Useful for those who want to set goals and track their progress
                by revisiting their past aspirations.
              </span>
            </p>
          </li>
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faLock}
              className="w-auto h-24 mt-1 text-yellow-500"
            />
            <p className="font-semibold md:text-center">
              <span>For Personal Privacy</span>
              <br />
              <span className="text-slate-500">
                Perfect for keeping private thoughts and messages secure until
                you choose to unlock them.
              </span>
            </p>
          </li>
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faSmile}
              className="w-auto h-24 mt-1 text-yellow-600"
            />
            <p className="font-semibold md:text-center">
              <span>For Emotional Expression</span>
              <br />
              <span className="text-slate-500">
                Ideal for expressing your current feelings and emotions,
                creating a personal snapshot of your state of mind.
              </span>
            </p>
          </li>
          <li className="flex items-start gap-4 md:flex-col md:items-center">
            <FontAwesomeIcon
              icon={faClock}
              className="w-auto h-24 mt-1 text-amber-600"
            />
            <p className="font-semibold md:text-center">
              <span>For Future Planning</span>
              <br />
              <span className="text-slate-500">
                Great for planning future events or milestones and revisiting
                your plans at a later date.
              </span>
            </p>
          </li>
        </ul>
      </section>

      {/* Spetial limited time offer */}
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

      <section className="mt-16 py-12 px-4 md:px-8 lg:px-16">
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
