import {
  createPasskey,
  getPasskey,
  SecurityQuestionType,
} from "@/data/server/user_passkey";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getUser } from "@/data/User";
import { Ban, Check, Lock } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DialogTitle } from "@radix-ui/react-dialog";

const SecurityQuestions = [
  "Who was your first crush?",
  "What was your first concert or event?",
  "What was your most unusual job?",
  "What was the first foreign country you visited?",
  "What was your childhood dream job?",
  "What was your first big purchase?",
  "What was the first video game you played?",
  "Describe your childhood in one word.",
  "What was your favorite childhood toy?",
  "What was your first movie in a theater?",
  "Who was your first favorite band?",
  "What was the first meal you cooked?",
  "Where was your favorite hiding spot as a child?",
];

export default async function VaultPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const user = await getUser();

  const { data, error } = await getPasskey(user?.id!);

  const savePasskey = async (formData: FormData) => {
    "use server";

    const security_question = formData.get(
      "security_question"
    ) as SecurityQuestionType;
    const security_answer = formData.get("security_answer") as string;
    const passkey = formData.get("passkey") as string;

    if (security_question === null) {
      return redirect(
        `/private-memory-vault?message=Security question must not be null`
      );
    }

    if ([passkey, security_answer].some((field) => field?.trim() === "")) {
      return redirect(
        `/private-memory-vault?message=All the fields must be fielld.`
      );
    }

    const { error } = await createPasskey(
      passkey,
      security_question,
      security_answer
    );

    if (error) {
      return redirect(
        `/private-memory-vault?message=Something went wrong: ${error}`
      );
    }

    return redirect(
      `/private-memory-vault?message=Passkey created successfully.`
    );
  };

  return (
    <div className="mx-12 mt-8">
      <Allert message={searchParams.message} />
      {error && !data && (
        <div className="border-l-2 border-yellow-400">
          <Alert className="border-none">
            <AlertDescription className="flex items-center justify-between">
              <p className="">
                You haven&apos;t created your passkey for your Private Memory
                Vault. Please create it now.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="underline underline-offset-2 font-medium">
                    Create passkey
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Passkey</DialogTitle>
                    <DialogDescription>
                      Please note that both the security answer and passkey are
                      case-sensitive. Ensure that you enter them exactly as you
                      set them.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="flex flex-col gap-1 w-full h-full">
                    <label
                      htmlFor="security_question"
                      className="text-xs text-zinc-500 font-medium"
                    >
                      Security Question
                    </label>
                    <Select name="security_question">
                      <SelectTrigger className="h-9 px-3 text-sm rounded-[6px] border border-zinc-300 focus:outline-zinc-600 text-zinc-950">
                        <SelectValue placeholder="Choose your security question" />
                      </SelectTrigger>
                      <SelectContent className="h-80">
                        {SecurityQuestions.map((question, index) => (
                          <SelectItem key={index} value={question}>
                            {question}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <label
                      htmlFor="security_answer"
                      className="text-xs text-zinc-500 font-medium mt-4"
                    >
                      Security Question
                    </label>
                    <input
                      type="text"
                      name="security_answer"
                      placeholder="Enter your security answer"
                      required
                      className="h-9 px-3 text-sm rounded-[6px] border border-zinc-300 focus:outline-zinc-600 text-zinc-950"
                    />
                    <label
                      htmlFor="passkey"
                      className="text-xs text-zinc-500 font-medium mt-4"
                    >
                      Passkey
                    </label>
                    <input
                      type="password"
                      name="passkey"
                      placeholder="Enter your passkey"
                      required
                      className="h-9 px-3 text-sm rounded-[6px] border border-zinc-300 focus:outline-zinc-600 text-zinc-950"
                    />
                    <DialogClose asChild className="mt-4">
                      <button type="submit" formAction={savePasskey}>
                        Create
                      </button>
                    </DialogClose>
                  </form>
                </DialogContent>
              </Dialog>
            </AlertDescription>
          </Alert>
        </div>
      )}
      <h1>
        Hello{" "}
        {user?.user_metadata.display_name || user?.user_metadata.full_name}
      </h1>
    </div>
  );
}

function Allert({ message }: { message: string }) {
  if (message === "Passkey created successfully.") {
    return (
      <div className="border-l-2 border-green-400">
        <Alert>
          <Check className="h-4 w-4" />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </div>
    );
  } else if (message) {
    return (
      <div className="border-l-2 border-red-400">
        <Alert>
          <Ban className="h-4 w-4" />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return <></>;
}
