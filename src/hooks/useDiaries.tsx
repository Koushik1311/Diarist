"use client";

import { getRecords } from "@/data/getDiary";
import { updateDiaries } from "@/redux/features/diaries-slice";
import { RootState } from "@/redux/store";
import { DiaryTypes } from "@/types/diary-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default async function useDiaries() {
  const dispatch = useDispatch();

  const diaries: DiaryTypes[] = useSelector(
    (state: RootState) => state.diariesReducer.value
  );

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const records = await getRecords();
        if (records) {
          dispatch(updateDiaries(records));
        }
      } catch (error) {
        console.error("Failed to fetch records:", error);
      }
    };

    fetchRecords();
  }, [dispatch]);

  return diaries;
}
