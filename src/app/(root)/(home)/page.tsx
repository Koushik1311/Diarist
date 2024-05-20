import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import RoundedBtn from "@/components/global/RoundedBtn";

const playfair_display = Playfair_Display({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="max-w-[1250px] mx-auto lg:mx-4 xl:mx-auto">
      <section className="flex flex-col lg:flex-row items-center text-center lg:text-left h-screen justify-center lg:h-auto lg:justify-between mx-4 lg:mx-0">
        <div className="order-2 lg:order-1">
          {/* Left */}
          <h1
            className={`${playfair_display.className} text-4xl lg:text-4xl xl:text-6xl font-bold md:px-10 lg:px-0 xl:w-[700px]`}
          >
            Embark on a Journey with Your Personal{" "}
            <span className="underline underline-offset-8 lg:underline-offset-[15px] decoration-[#e87755]">
              Digital Diary.
            </span>
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-7 lg:mx-0 lg:mt-10 mb-1">
            Capture Moments, Reflect your Actions, and Grow from There.
          </p>
          <RoundedBtn>Get Started Now</RoundedBtn>
        </div>

        <div className="order-1 lg:order-2">
          {/* Right */}
          {/* ATTRIBUTE: <a href="https://storyset.com/work">Work illustrations by Storyset</a> */}
          <Image
            src="./Notebook-amico.svg"
            width={500}
            height={500}
            quality={100}
            priority
            alt="hero-image"
            className="w-[580px] h-auto lg:h-[580px]"
          />
        </div>
      </section>
      {/* <h1>Welcome to Diarist</h1>
      <Link href="my-diary">My Diary</Link> */}
    </main>
  );
}
