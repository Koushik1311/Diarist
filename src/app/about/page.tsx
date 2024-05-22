import { GetSingleRecord, getRecords } from "@/data/getDiary";
import React from "react";

export default async function page() {
  const records = await getRecords();

  const record = GetSingleRecord(2);
  return (
    <div>
      {/* 
        id: 1,
        created_at: '2024-05-21T05:50:58.62815+00:00',
        content: 'This is a record',
        user_id: '799a2d65-38b9-48a1-adb7-d11f8704ac23'
      */}
      <h1>Hi there</h1>
      {records?.map((diary, index) => (
        <div key={index}>
          <p>{diary.content}</p>
          <p>{diary.created_at}</p>
        </div>
      ))}

      <div>
        <h1>{(await record).content}</h1>
      </div>
    </div>
  );
}
