import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function page() {
  const socialAuthentication = async () => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error.message);
    } else {
      return redirect(data.url);
    }
  };

  return (
    <form action={socialAuthentication}>
      <button>github</button>
    </form>
  );
}
