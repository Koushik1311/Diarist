import {
  deriveEncryptionKey,
  encryptContent,
} from "@/utils/encrypt-decrypt-content";
import { createClient } from "@/utils/supabase/server";

const saveEncryptedContent = async (
  content: string,
  passkey: string,
  salt: string,
  userId: string
) => {
  const key = deriveEncryptionKey(passkey, Buffer.from(salt, "base64"));
  const { iv, encrypted } = encryptContent(content, key);

  const supabase = createClient();

  const { error } = await supabase.from("private_memory_vault").insert({
    content: encrypted,
    iv: iv,
    salt: salt,
    user_id: userId,
  });

  if (error) {
    console.error("Error saving encrypted content:", error.message);
  } else {
    console.log("Encrypted content saved successfully.");
  }
};

export default saveEncryptedContent;
