import React from "react";
import RoundedBtn from "../global/RoundedBtn";
import Link from "next/link";
import Logout from "../auth/Logout";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="max-w-[1260px] mx-auto flex items-center justify-between">
      <div>Diarist</div>
      <div>
        <Link href="/diary">Diary</Link>
      </div>
      {user !== null ? (
        <>
          <p>{user.email}</p>
          <Logout />
        </>
      ) : (
        <Link href="/auth">Log in</Link>
      )}
      {/* <div>
        <RoundedBtn>Register</RoundedBtn>
      </div> */}
    </div>
  );
}
