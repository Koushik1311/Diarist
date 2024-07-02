"use client";

import { Navlinks } from "@/constants/nav-links";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmallDeviceNavBar() {
  const [showLinks, setShowLinks] = useState<boolean>(false);

  const onMenuClick = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className="relative">
      <Menu onClick={onMenuClick} className="text-violet-500 w-8 h-8" />

      <AnimatePresence>
        {showLinks && (
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -100,
            }}
            transition={{
              duration: 0.5,
            }}
            className="w-screen h-screen bg-violet-500 fixed left-0 top-0"
          >
            <X
              onClick={() => setShowLinks(false)}
              className="text-white w-8 h-8 absolute top-4 right-4 cursor-pointer"
            />
            <div className="flex items-center justify-center flex-col gap-2 h-full">
              {Navlinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  <Link
                    onClick={() => setShowLinks(false)}
                    href={link.link}
                    className="text-white text-lg"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
