"use client";

import { YourPersonalDiaryAppMenu } from "@/constants/yourPersonalDiaryAppMenu";
import { cn } from "@/lib/utils";
import { merriweather } from "@/utils/google-fonts";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type MenuId = "journal" | "title" | "mood" | "text" | "features";

interface MenuContent {
  [key: string]: {
    text: string;
    image: string;
  };
}

const menuContent: MenuContent = {
  journal: {
    text: "Write about what happened in your daily journal.",
    image: "/journal.png",
  },
  title: {
    text: "Change your title to suit your day.",
    image: "/title.png",
  },
  mood: {
    text: "Add up to 5 moods that describe how your day was.",
    image: "/mood.png",
  },
  text: {
    text: "Change the text style and font to suit your preference.",
    image: "/text.png",
  },
};

export default function YourPersonalDiaryApp() {
  const [menuId, setMenuId] = useState<string>("journal");

  const { text, image } = menuContent[menuId];

  return (
    <div className="flex flex-col items-center">
      <h2
        className={`${merriweather.className} text-center text-[28px] md:text-3xl lg:text-4xl font-semibold text-violet-500`}
      >
        <blockquote className="">“Your personal reflection space.”</blockquote>
      </h2>

      <div className="mt-20 lg:mt-20 mb-6">
        <ul className="flex flex-wrap items-center justify-center gap-4 lg:gap-10">
          {YourPersonalDiaryAppMenu.map((menu, index) => (
            <li key={index}>
              <button
                onClick={() => setMenuId(menu.id)}
                className="group text-gray-400 flex flex-col items-center gap-1"
              >
                <menu.icon
                  className={cn(
                    "w-5 h-5 group-hover:text-gray-800 transition duration-300",
                    menuId === menu.id && "text-gray-800"
                  )}
                />
                <span
                  className={cn(
                    "text-lg lg:text-2xl font-semibold group-hover:text-gray-800 transition duration-300",
                    menuId === menu.id && "text-gray-800"
                  )}
                >
                  {menu.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <AnimatePresence mode="wait">
          <motion.p
            key={menuId}
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -30 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-medium text-center mb-8"
          >
            {text}
          </motion.p>
        </AnimatePresence>
        <Image
          src={image}
          width={2879}
          height={1574}
          quality={100}
          priority
          alt="Diary Image"
          className="w-[900px] h-auto rounded-lg border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        />
      </div>
    </div>
  );
}
