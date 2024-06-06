"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List } from "lucide-react";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { browserClient } from "@/utils/supabase/client";

export default function Edditor({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  // const debouncedUpdate = debounce(async (content: string) => {
  //   await updateContentField(id, content);
  // }, 10000);

  // useEffect(() => {
  //   const updateData = async () => {
  //     const debouncedUpdate = debounce(async (content: string) => {
  //       const { data, error } = await supabase
  //         .from("diary_entry")
  //         .update({ content: content })
  //         .eq("id", id)
  //         .select();
  //     }, 10000);
  //   };

  //   updateData();
  // }, []);

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
    content: content,
  });

  return (
    <form>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <Italic />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            strike
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <List />
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="flex-1 w-full" />
    </form>
  );
}
