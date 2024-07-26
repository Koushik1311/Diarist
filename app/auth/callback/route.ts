import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error during code exchange:", error);
      console.error("Error during code exchange:", error.cause);
      return NextResponse.redirect(`${requestUrl.origin}/login`);
    }
  } else {
    console.warn("No code found in request URL");
  }

  return NextResponse.redirect(`${requestUrl.origin}/diary`);
}
