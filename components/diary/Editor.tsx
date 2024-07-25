"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, Extension, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Save,
  Underline as UnderlineIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { browserClient } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/store";

type Props = {
  id: number;
  content: string;
};

export default function Editor({ id, content }: Props) {
  const supabase = browserClient();
  const [currentContent, setCurrentContent] = useState(content);
  const textSize = useAppSelector((state) => state.textStyleReducer.text_size);

  const updateContentField = (id: number, content: string) => {
    return supabase
      .from("diary_entries")
      .update({ content: content })
      .eq("id", id)
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error updating content:", error);
        } else {
          setCurrentContent(content); // Update the current content after successful save
        }
      });
  };

  const CustomTabExtension = Extension.create({
    addKeyboardShortcuts() {
      return {
        Tab: () => {
          const { state, dispatch } = this.editor.view;
          const { tr } = state;
          tr.insertText("          ");
          dispatch(tr);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      CustomTabExtension,
    ],
    editorProps: {
      attributes: {
        class: "min-h-[300px] border-none ring-0 focus:outline-none py-5",
      },
    },
    content: currentContent,
  });

  // useEffect(() => {
  //   if (lockedState) {
  //     editor?.setOptions({ editable: false, });
  //   } else {
  //     editor?.setOptions({ editable: true });
  //   }
  // }, [editor, lockedState]);

  useEffect(() => {
    const handleContentUpdate = debounce(() => {
      if (editor) {
        const newContent = editor.getHTML();
        if (newContent !== currentContent) {
          updateContentField(id, newContent);
        }
      }
    }, 1000);

    window.addEventListener("mousemove", handleContentUpdate);

    return () => {
      window.removeEventListener("mousemove", handleContentUpdate);
    };
  }, [editor, currentContent]);

  const newContent = editor?.getHTML();

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-zinc-800 text-zinc-100 border border-zinc-600 rounded-lg shadow-lg p-2"
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 rounded ${
              editor.isActive("bold") ? "bg-zinc-600" : "hover:bg-zinc-700"
            }`}
          >
            <Bold className="text-zinc-100" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 rounded ${
              editor.isActive("italic") ? "bg-zinc-600" : "hover:bg-zinc-700"
            }`}
          >
            <Italic className="text-zinc-100" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleMark("underline").run()}
            className={`p-1 rounded ${
              editor.isActive("underline") ? "bg-zinc-600" : "hover:bg-zinc-700"
            }`}
          >
            <UnderlineIcon className="text-zinc-100" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 rounded ${
              editor.isActive("bulletList")
                ? "bg-zinc-600"
                : "hover:bg-zinc-700"
            }`}
          >
            <List className="text-zinc-100" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1 rounded ${
              editor.isActive("orderedList")
                ? "bg-zinc-600"
                : "hover:bg-zinc-700"
            }`}
          >
            <ListOrdered className="text-zinc-100" />
          </button>
        </BubbleMenu>
      )}
      <EditorContent
        editor={editor}
        style={{ fontSize: `${textSize}px` }}
        className="flex-1 w-full"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: newContent !== currentContent ? 1 : 0,
          transition: { duration: 0.9 },
        }}
        style={{
          cursor: newContent !== currentContent ? "pointer" : "none",
          zIndex: newContent !== currentContent ? 1 : -5,
        }}
        className="fixed bottom-5 right-7 md:bottom-12 md:right-16 w-14 h-14 bg-zinc-200 hover:bg-zinc-300 transition-colors flex items-center justify-center rounded-full"
      >
        <Save className="text-zinc-800" />
      </motion.div>
    </>
  );
}
