"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { browserClient } from "@/utils/supabase/client";
import { HardDriveUpload } from "lucide-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { debounce } from "lodash";

export default function TitleInputCopy({
  id,
  title,
}: {
  id: number;
  title: string;
}) {
  const [inputTitle, setInputTitle] = useState(title);
  const [showEditBox, setShowEditBox] = useState(false);

  const supabase = browserClient();

  const UpdateTitleField = (id: number, titleContent: string) => {
    console.log("Saving title:", inputTitle);
    supabase
      .from("diary_entries")
      .update({ title: titleContent })
      .eq("id", id)
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error updating content:", error);
        } else {
          setInputTitle(titleContent); // Update the current content after successful save
        }
      });
  };

  const onTitleButtonClick = () => {
    setShowEditBox(!showEditBox);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    editorProps: {
      attributes: {
        class: "min-h-[300px] border-none ring-0 focus:outline-none py-5",
      },
    },
    content: inputTitle,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      UpdateTitleField(id, newContent);
    },
  });

  useEffect(() => {
    const handleMouseMove = debounce(() => {
      if (editor) {
        const newContent = editor.getText();
        if (newContent !== inputTitle) {
          UpdateTitleField(id, newContent);
        }
      }
    }, 1000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [editor, inputTitle]);

  return (
    <>
      <button onClick={onTitleButtonClick}>{inputTitle}</button>
      {showEditBox && (
        <>
          <EditorContent editor={editor} className="" />
        </>
      )}
    </>
  );
}
