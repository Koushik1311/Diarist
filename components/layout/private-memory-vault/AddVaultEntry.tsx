import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  children: React.ReactNode;
  className: string;
  userId: string;
};

export default function AddVaultEntry({ children, className, userId }: Props) {
  const router = useRouter();

  const insertVaultEntry = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const loadingToastId = toast.loading("Creating memory vault entry...");

    try {
    } catch (error) {}
  };

  return <div>{children}</div>;
}
