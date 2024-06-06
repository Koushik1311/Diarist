"use client";

import { getAllRecords } from "@/data/client/diary";
import { DiaryTypes } from "@/types/diary.types";
import React, { useEffect, useState } from "react";

export default function page() {
  const [diaryData, setDiaryData] = useState<DiaryTypes[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await getAllRecords();
      setDiaryData(result);
    };

    getData();
  }, [setDiaryData]);

  console.log(diaryData);

  return <div>page</div>;
}
