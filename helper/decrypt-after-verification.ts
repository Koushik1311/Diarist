import { getUser } from "@/data/User";
import {
  decryptContent,
  deriveEncryptionKey,
} from "@/utils/encrypt-decrypt-content";
import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcrypt";

const decryptAfterVerification = async (
  passkey: string,
  vaultId: string,
  userId: string
) => {
  const supabase = createClient();

  const { data: hashed, error: hashedError } = await supabase
    .from("user_passkeys")
    .select()
    .eq("user_id", userId)
    .single();

  if (hashedError) {
    return {
      error: "You have no passkey.",
    };
  }

  const isMatch = await bcrypt.compare(passkey, hashed.passkey_hash);

  if (isMatch) {
    const { data, error } = await supabase
      .from("private_memory_vault")
      .select()
      .eq("id", vaultId)
      .single();

    if (error) {
      return {
        error: "Can not find.",
      };
    }

    const key = deriveEncryptionKey(passkey, Buffer.from(data.salt, "base64"));

    const decryptedContent = decryptContent(data.iv, data.content, key);
    return { decryptedContent };
  } else {
    throw new Error("Invalid passkey");
  }
};

export default decryptAfterVerification;
