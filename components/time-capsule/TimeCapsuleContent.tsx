"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, Extension, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Save, Underline as UnderlineIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { browserClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/store";

import { Kalam, Gloria_Hallelujah } from "next/font/google";
import { GeistSans } from "geist/font/sans";

const kalam = Kalam({
  weight: "400",
  subsets: ["latin"],
});

const gloriaHallelujah = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
});

type Props = {
  content: string;
};

export default function TimeCapsuleContent({ content }: Props) {
  const [changeFont, setChangeFont] = useState<string>(
    gloriaHallelujah.style.fontFamily
  );
  const [currentContent, setCurrentContent] = useState(content);
  const textSize = useAppSelector((state) => state.textStyleReducer.text_size);
  const textFont = useAppSelector((state) => state.textStyleReducer.text_font);

  useEffect(() => {
    if (textFont === "kalam") {
      setChangeFont(kalam.style.fontFamily);
    } else if (textFont === "gloriaHallelujah") {
      setChangeFont(gloriaHallelujah.style.fontFamily);
    } else if (textFont === "normal") {
      setChangeFont(GeistSans.style.fontFamily);
    }
  }, [textFont]);

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "min-h-[300px] border-none ring-0 focus:outline-none py-5",
      },
    },
    content: content,
    editable: false,
  });

  const newContent = editor?.getHTML();

  return (
    <div>
      <EditorContent
        editor={editor}
        style={{
          fontSize: `${textSize}px`,
          fontFamily: changeFont,
        }}
        className="flex-1 w-full"
      />
    </div>
  );
}
