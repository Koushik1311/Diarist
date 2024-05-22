"use client";

import { GetSingleRecord } from "@/data/getDiary";
import { updateDiaries } from "@/redux/features/diaries-slice";
import { updateDiaryId } from "@/redux/features/diaryId-slice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
  id: number;
};

export default function DiaryIdBtn({ children, id }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  //   const getId = (diaryId: number) => {
  //     dispatch(updateDiaryId(diaryId));
  //   };

  //   useEffect(() => {
  //     const getData = async () => {
  //       GetSingleRecord(2);
  //     };

  //     getData();
  //   });

  return <button className="w-full">{children}</button>;
}
