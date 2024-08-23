import AddEntryButton from "@/components/global/AddEntryButton";
import { getUser } from "@/data/User";
import { NotebookPen } from "lucide-react";
import React from "react";

export default async function DiarySpace() {
  const user = await getUser();

  return (
    <div className="flex flex-col mt-2 mx-4 lg:mx-16 p-8">
      {/* Achievement Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        <div className="border border-zinc-300 rounded-xl px-6 py-8 text-center shadow-lg hover:scale-105 transform transition-transform duration-300">
          <div className="text-5xl font-semibold text-zinc-600 mb-2">20</div>
          <p className="font-bold text-zinc-600">Diary Entry</p>
          <p className="text-zinc-500">Total diary entries</p>
        </div>
        <div className="border border-zinc-300 rounded-xl px-6 py-8 text-center shadow-lg hover:scale-105 transform transition-transform duration-300">
          <div className="text-5xl font-semibold text-zinc-600 mb-2">20</div>
          <p className="font-bold text-zinc-600">Time Capsule</p>
          <p className="text-zinc-500">Total time capsules created</p>
        </div>
        <div className="border border-zinc-300 rounded-xl px-6 py-8 text-center shadow-lg hover:scale-105 transform transition-transform duration-300">
          <div className="text-5xl font-semibold text-zinc-600 mb-2">20</div>
          <p className="font-bold text-zinc-600">Private Memory Vault</p>
          <p className="text-zinc-500">Total private memories created</p>
        </div>
      </div>

      {/* Weekly Strike */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12 sm:mb-20 lg:mb-0">
        <div className="border border-zinc-300 rounded-xl px-6 py-8 text-center shadow-lg hover:scale-105 transform transition-transform duration-300">
          <p className="font-semibold text-zinc-600 mb-2">
            Current Week Strike
          </p>
          <div className="text-5xl font-bold text-zinc-600">5</div>
        </div>
        <div className="border border-zinc-300 rounded-xl px-6 py-8 text-center shadow-lg hover:scale-105 transform transition-transform duration-300">
          <p className="font-semibold text-zinc-600 mb-2">
            Current Week Strike
          </p>
          <div className="text-5xl font-bold text-zinc-600">5</div>
        </div>
        <div className="border border-zinc-300 rounded-xl px-6 py-8 text-center shadow-lg hover:scale-105 transform transition-transform duration-300">
          <p className="font-semibold text-zinc-600 mb-2">
            Current Week Strike
          </p>
          <div className="text-5xl font-bold text-zinc-600">5</div>
        </div>
      </div>

      {/* Add Entry Button */}
      {/* Add Entry Button */}
      <div className="fixed bottom-10 right-10 sm:bottom-5 sm:right-5">
        <AddEntryButton
          userId={user?.id!}
          className="flex items-center justify-center gap-2 border border-zinc-400 hover:border-zinc-800 transition-colors rounded-full px-5 py-3 bg-white"
        >
          <NotebookPen className="w-4 h-4" />
          <span>Add Today's Entry</span>
        </AddEntryButton>
      </div>
    </div>
  );
}
