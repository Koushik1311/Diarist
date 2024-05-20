"use client";

import { RootState } from "@/redux/store";
import { Item } from "@/types/items-types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useItems() {
  const { id: pageId } = useParams<{ id: string }>();
  const [page, setPage] = useState<Item>({
    id: pageId,
    body: "",
    date: null,
  });

  const items: Item[] = useSelector(
    (state: RootState) => state.itemsReducer.value
  );

  useEffect(() => {
    const item = items.find((item) => item.id === pageId);
    if (item) {
      setPage({
        id: item.id,
        body: item.body,
        date: item.date,
      });
    }
  }, [pageId, items, page]);

  return { page, setPage, pageId, items };
}
