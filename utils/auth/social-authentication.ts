import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { headers } from "next/headers";

const googleAuth = async () => {
  "use server";

  const origin = headers().get("origin");
  const supabase = createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
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

const twitterAuth = async () => {
  "use server";

  const origin = headers().get("origin");
  const supabase = createClient();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "twitter",
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

export { googleAuth, twitterAuth };
