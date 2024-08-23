import { pacifico } from "@/utils/google-fonts";
import Image from "next/image";
import GetStartedBtn from "../global/GetStartedBtn";
import PhraseQuote from "../global/PhraseQuote"; // Assuming you have this component

export default function About() {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
        <div className="space-y-12">
          <PhraseQuote className="mt-4 lg:mt-6 relative before:content-['“'] before:absolute before:left-0 before:-top-[1px] after:content-['”'] after:absolute after:right-[120px] after:bottom-0">
            Your Story, Your Way. Capture Every Moment, Big or Small, with Ease
            and Clarity.
          </PhraseQuote>
          <div>
            <h3 className="text-violet-600 font-bold text-xl">
              Your thoughts are your own.
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Diarist keeps your journal entries private and secure, allowing
              you to write freely and confidently. Only you have access to your
              entries.
            </p>
          </div>
          <div>
            <h3 className="text-violet-600 font-bold text-xl">
              Your moments, always accessible.
            </h3>
            <p className="mt-2 text-base text-gray-600">
              With Diarist, you can journal anytime, anywhere. Your entries are
              always at your fingertips when you need them.
            </p>
          </div>
          <div>
            <h3 className="text-violet-600 font-bold text-xl">
              Your memories should be preserved.
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Diarist uses open, standard formats to store your entries,
              ensuring you can always access your data and keep your memories
              safe for years to come.
            </p>
          </div>
        </div>
        <div className="mt-10 lg:mt-0 flex flex-col items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={300}
            height={300}
            quality={100}
            priority
            className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px]"
          />
          <span
            className={`text-4xl lg:text-6xl text-gray-700 ${pacifico.className} mt-4`}
          >
            Diarist
          </span>
          <GetStartedBtn className="mt-6 md:mt-8 flex mx-auto px-7 py-6" />
        </div>
      </div>
    </div>
  );
}
