import Link from "next/link";
import RoundedBtn from "@/components/global/RoundedBtn";
import { IoPencilOutline } from "react-icons/io5";

export default function Home() {
  return (
    <main className="max-w-[1260px] mx-auto lg:mx-4 xl:mx-auto">
      <section className="flex items-center text-center h-screen justify-center mx-4 lg:mx-0">
        <div className="">
          {/* Left */}
          <h1 className="text-slate-800 text-4xl lg:text-4xl xl:text-5xl font-semibold md:leading-[2.9rem] xl:leading-[4.813rem] md:px-10 lg:px-0 xl:w-[900px]">
            Embark on a Journey with Your Personal Digital Diary.
          </h1>
          <p className="text-base font-medium text-slate-500 mt-4 lg:mx-0 lg:mt-6 mb-4">
            Capture Moments, Reflect your Actions, and Grow from There.
          </p>
          <Link href="/auth" className="flex items-center justify-center">
            <RoundedBtn className="flex items-center space-x-2">
              <IoPencilOutline />
              <span>Start Writing</span>
            </RoundedBtn>
          </Link>
        </div>
      </section>
      {/* <h1>Welcome to Diarist</h1>
      <Link href="my-diary">My Diary</Link> */}
    </main>
  );
}
