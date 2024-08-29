import { createClient } from "@/utils/supabase/server";
import { getUser } from "../User";
import bcrypt from "bcrypt";

export type SecurityQuestionType =
  | "Who was your first crush?"
  | "What was your first concert or event?"
  | "What was your most unusual job?"
  | "What was the first foreign country you visited?"
  | "What was your childhood dream job?"
  | "What was your first big purchase?"
  | "What was the first video game you played?"
  | "Describe your childhood in one word."
  | "What was your favorite childhood toy?"
  | "What was your first movie in a theater?"
  | "Who was your first favorite band?"
  | "What was the first meal you cooked?"
  | "Where was your favorite hiding spot as a child?";

const createPasskey = async (
  passKey: string,
  securityQuestion: SecurityQuestionType,
  securityAnswer: string
) => {
  const supabase = createClient();

  const user = await getUser();

  if (!user) {
    return {
      error: "User is not authenticated.",
    };
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUND) || 10;

  const hashedPasskey = await bcrypt.hash(passKey, saltRounds);

  const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, saltRounds);

  const { error } = await supabase.from("user_passkeys").insert({
    passkey_hash: hashedPasskey,
    security_question: securityQuestion,
    security_answer_hash: hashedSecurityAnswer,
    user_id: user.id,
  });

  return { error };
};

const getPasskey = async (userId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_passkeys")
    .select()
    .eq("user_id", userId)
    .single();

  if (error) {
    return {
      error: "Can not find user passkey.",
    };
  }

  return { data };
};

export { createPasskey, getPasskey };
