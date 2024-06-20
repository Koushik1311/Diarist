import React from "react";
import {
  Book,
  Layout,
  Globe,
  Shield,
  Brush,
  Smile,
  Bell,
  FileText,
  Tag,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Features() {
  return (
    <section className="flex flex-col items-center justify-center mt-24 w-full">
      <h2 className="text-[28px] md:text-3xl lg:text-5xl font-semibold text-violet-500">
        Features
      </h2>
      <p className="text-lg md:text-xl text-slate-600 mt-2 text-center">
        Discover all the amazing features that make our digital diary app your
        perfect companion.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full max-w-6xl">
        <div className="p-6 rounded-lg flex flex-col items-start justify-start">
          <Book className="text-violet-700 w-8 h-8 mb-4" />
          <div className="text-start">
            <h3 className="text-2xl font-semibold text-violet-700">
              Journaling Made Easy
            </h3>
            <p className="text-lg font-normal text-slate-500 mt-2">
              Write and store your daily entries securely.
            </p>
          </div>
        </div>
        <div className="p-6 rounded-lg flex flex-col items-start justify-start">
          <Layout className="text-violet-700 w-8 h-8 mb-4" />
          <div className="text-start">
            <h3 className="text-2xl font-semibold text-violet-700">
              Easy to Use
            </h3>
            <p className="text-lg font-normal text-slate-500 mt-2">
              Intuitive interface designed for simplicity.
            </p>
          </div>
        </div>
        <div className="p-6 rounded-lg flex flex-col items-start justify-start">
          <Globe className="text-violet-700 w-8 h-8 mb-4" />
          <div className="text-start">
            <h3 className="text-2xl font-semibold text-violet-700">
              Anywhere Access
            </h3>
            <p className="text-lg font-normal text-slate-500 mt-2">
              Access your diary from any device, anytime.
            </p>
          </div>
        </div>
      </div>

      <Link href="/fratures" className="mt-8">
        <Button>Explore all features</Button>
      </Link>
    </section>
  );
}
