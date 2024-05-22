import {
  Dancing_Script,
  Kalam,
  Noto_Serif,
  Roboto_Mono,
} from "next/font/google";

const dancing_script = Dancing_Script({ subsets: ["latin"] });
const roboto_mono = Roboto_Mono({ subsets: ["latin"] });
const kalam = Kalam({ weight: "400", subsets: ["latin"] });
const noto_serif = Noto_Serif({ subsets: ["latin"] });

export { dancing_script, roboto_mono, kalam, noto_serif };
