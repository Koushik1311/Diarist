import { createClient } from "@/utils/supabase/server";
import GetStartedBtn from "@/components/global/GetStartedBtn";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

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
      <section className="mt-36">
        {/* Hero */}
        <div className="flex flex-col items-center justify-center gap-3 md:gap-5">
          <h1 className="text-[28px] md:text-4xl lg:text-6xl font-semibold text-center flex flex-col -space-y-3 lg:space-y-0 md:gap-2">
            <span className="text-gray-700">Embark</span>
            <span className="text-fuchsia-500">on a Journey with</span>
            <span className="text-purple-500">
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

      <section id="features">
        <div className="container">
          <h2>Features</h2>
          <div className="feature">
            <h3>Secure Entries</h3>
            <p>Keep your entries safe with top-notch security.</p>
          </div>
          <div className="feature">
            <h3>Easy to Use</h3>
            <p>Intuitive interface designed for simplicity.</p>
          </div>
          <div className="feature">
            <h3>Anywhere Access</h3>
            <p>Access your diary from any device, anytime.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
