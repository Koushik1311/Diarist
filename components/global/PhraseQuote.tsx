import { merriweather } from "@/utils/google-fonts";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function PhraseQuote({ children, className }: Props) {
  return (
    <p
      className={`${merriweather.className} ${className} text-xl font-semibold text-gray-700 md:w-[550px] text-center mt-5`}
    >
      {children}
    </p>
  );
}
