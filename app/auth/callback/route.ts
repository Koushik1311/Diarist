import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const cookieStore = cookies();

  const authTokenCodeVerifier = cookieStore.get(
    "sb-cytvltfddmnptpqimndl-auth-token-code-verifier"
  );

  if (!authTokenCodeVerifier) {
    return NextResponse.redirect(`${requestUrl.origin}/login`);
  }

  if (code) {
    const supabase = createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${requestUrl.origin}/login`);
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/diary`);
}
