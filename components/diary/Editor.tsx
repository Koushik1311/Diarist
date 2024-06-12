"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { BubbleMenu, EditorContent, Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List } from "lucide-react";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import { browserClient } from "@/utils/supabase/client";

export default function Editor({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const supabase = browserClient();
  const [currentContent, setCurrentContent] = useState(content);

  const updateContentField = (id: number, content: string) => {
    return supabase
      .from("diary_entry")
      .update({ content: content })
      .eq("id", id)
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error updating content:", error);
        } else {
          console.log("Content updated successfully:", data);
          setCurrentContent(content); // Update the current content after successful save
        }
      });
  };

  // const debouncedUpdate = debounce((content: string) => {
  //   if (editor) {
  //     const newContent = editor.getHTML();
  //     if (newContent !== currentContent) {
  //       updateContentField(id, content);
  //     }
  //   }
  // }, 300000);

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
    content: currentContent,
    // onUpdate: ({ editor }) => {
    //   debouncedUpdate(editor.getHTML());
    // },
  });

  useEffect(() => {
    const handleMouseMove = debounce(() => {
      if (editor) {
        const newContent = editor.getHTML();
        if (newContent !== currentContent) {
          updateContentField(id, newContent);
        }
      }
    }, 1000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [editor, currentContent]);

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <Bold />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <Italic />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            strike
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <List />
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} className="flex-1 w-full" />
    </>
  );
}
