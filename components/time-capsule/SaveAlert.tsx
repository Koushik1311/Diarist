"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { insertUnlockDate } from "@/data/client/time-capsule";
import { getLocalYear } from "@/utils/local-day";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SaveAlert({
  id,
  timestamp,
}: {
  id: string;
  timestamp: string;
}) {
  const router = useRouter();

  const saveTimeCapsule = async () => {
    const error = await insertUnlockDate(id, timestamp);

    const loadingToastId = toast.loading("Saving time capsule...");

    if (error) {
      toast.error(`Error: ${error.message}`, { id: loadingToastId });
    }

    router.push(`/diary/${getLocalYear}`);
    toast.success("Time capsule is saved.", { id: loadingToastId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>Save</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Once saved you will not be able to edit this time capsule.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <button onClick={saveTimeCapsule}>
            <AlertDialogAction className="bg-zinc-900 hover:bg-zinc-800 transition-colors">
              Continue
            </AlertDialogAction>
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
