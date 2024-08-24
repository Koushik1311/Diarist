import AddEntryButton from "@/components/global/AddEntryButton";
import { Button } from "@/components/ui/button";
import { getUser } from "@/data/User";
import { NotebookPen } from "lucide-react";
import React from "react";

export default async function DiarySpace() {
  const user = await getUser();

  return (
    <div className="flex flex-col items-center justify-center h-[95vh] mt-2 mx-4 lg:mx-16 p-8">
      <p>
        In a quiet town nestled between the mountains, there exists an ancient
        diary said to be linked to the fabric of time itself. This diary, known
        as <strong>The Timekeeper&apos;s Diary</strong>, was believed to have
        been created by a long-forgotten civilization that once ruled the skies.
        It is said that anyone who writes in the diary can travel back to key
        moments in their own life to rewrite their fate.
      </p>
      <br />
      <p>
        You bring the diary home, unable to resist its pull. As you open it, the
        pages seem blank, yet a voice echoes in your mind:
        <br /> <br />
        <i>
          "Write your heart&apos;s deepest truth, and the door to your past will
          open."
        </i>
      </p>
      <br />
      <Button variant="outline">
        <strong>Option A:</strong> You decide to write about a regret—a moment
        you wished you could change in your life.
      </Button>
      <br />
      <Button variant="outline">
        <strong>Option B:</strong> You write about a dream you once had but
        never pursued.
      </Button>
      <br />
      <Button variant="outline">
        <strong>Option C:</strong> You write a story, fictional yet eerily close
        to your own experiences.
      </Button>
    </div>
  );
}
