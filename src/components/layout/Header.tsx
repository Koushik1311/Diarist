import React from "react";
import RoundedBtn from "../global/RoundedBtn";
import Link from "next/link";
import Logout from "../auth/Logout";
import GetUser from "./GetUser";
import { createClient } from "@/utils/supabase/server";

export default async function Header() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="max-w-[1250px] mx-auto flex items-center justify-between">
      <div>Diarist</div>
      <div>
        <Link href="/123123sds">Diary</Link>
      </div>
      <GetUser />
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
