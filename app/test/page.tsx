"use client";

// import { fetchTimeCapsuleEntry } from "@/data/timeCapsule";
import { DateTimePicker } from "@/components/time-capsule/DateTimePicker";
import SaveAlert from "@/components/time-capsule/SaveAlert";
import { fetchLockedTimeCapsule } from "@/data/client/time-capsule";
import { fetchTimeCapsuleEntry } from "@/data/server/timeCapsule";
import { browserClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default async function Page() {
  // const getRecord = async () => {
  // const { data, error } = await fetchTimeCapsuleEntry(
  //   "e34835eb-9fc7-496b-9976-d4ecbf944078"
  // );

  // if (error) console.log(error);

  // console.log(data);
  // };

  useEffect(() => {
    const getdata = async () => {
      const { data, error } = await fetchLockedTimeCapsule();

      if (error) {
        console.log(error);
      }
      console.log(data);
    };

    getdata();
  }, []);

  return (
    <div>
      <h1>hello</h1>
      {/* <TimeCapsule /> */}
      <button>Add</button>
    </div>
  );
}
