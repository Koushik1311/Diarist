import { AppDispatch, RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useYears() {
  const year = useSelector((state: RootState) => state.yearReducer.value);

  const dispatch = useDispatch<AppDispatch>();
  return year;
}
