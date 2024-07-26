import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log("I am alive");
    console.log(error);

    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/login`);
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/diary`);
}
