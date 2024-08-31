import { getUser } from "@/data/User";
import decryptAfterVerification from "@/helper/decrypt-after-verification";
import saveEncryptedContent from "@/helper/save-encrypted-content";
import { createClient } from "@/utils/supabase/server";

export default async function page() {
  const user = await getUser();
  const handleClick = async () => {
    "use server";

    await saveEncryptedContent(
      "Hello there how are you doing are you doing fine",
      "thepark",
      "salt",
      user?.id!
    );
  };

  const handleDecrypt = async () => {
    "use server";

    const supabase = createClient();

    const content = await decryptAfterVerification(
      "thepark",
      "03afc183-fd20-4e13-8764-ea5b7cdc8d29",
      user?.id!
    );

    console.log(content);
  };

  return (
    <form>
      <button formAction={handleClick}>Button</button>
      <button formAction={handleDecrypt}>Decrypt</button>
    </form>
  );
}
