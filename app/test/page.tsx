"use client";

import { getRecordTitle } from "@/data/diary";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";

export default function Page() {
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const cookies = useCookies();
  const authToken = cookies.get();

  useEffect(() => {
    if (authToken) {
      for (const token in authToken) {
        // Check if cookie value contains 'user'
        if (authToken[token].includes("user")) {
          const sbToken = JSON.parse(authToken[token]);
          if (
            sbToken &&
            sbToken.user &&
            sbToken.user.id &&
            sbToken.user.email
          ) {
            setUserId(sbToken.user.id);
            setUserEmail(sbToken.user.email);
          }
        }
      }
    }
  }, [authToken]);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const record = await getRecordTitle(3);
        console.log(record?.title);
      } catch (error) {
        console.error("Error fetching record title:", error);
      }
    };

    fetchTitle();
  });

  return (
    <div>
      <h1>Hello World!</h1>
      <p>Email: {userEmail}</p>
      <p>User ID: {userId}</p>
    </div>
  );
}
