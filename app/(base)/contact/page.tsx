import SubmitButton from "@/components/global/SubmitButton";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export default function page({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const sendMessage = async (FormData: FormData) => {
    "use server";

    const fullName = FormData.get("full_name") as string;
    const email = FormData.get("email") as string;
    const message = FormData.get("message") as string;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "Diarist Contact Form <notifications@diarist.life>",
      to: [`${process.env.PERSONAL_EMAIL_ID}`],
      subject: "New Contact Form Diarist User",
      html: `<strong>Name:</strong> ${fullName}<br>
             <strong>Email:</strong> ${email}<br>
             <strong>Message:</strong> ${message}`,
      reply_to: email,
    });

    if (error) {
      return redirect(`/contact?message=${encodeURIComponent(error.message)}`);
    }

    if (data) {
      return redirect(
        `/contact?message=${encodeURIComponent("Message sent successfully")}`
      );
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-violet-600 mb-4">
          Contact Us
        </h1>
        <form className="flex flex-col gap-4">
          <label
            htmlFor="full_name"
            className="text-xs text-slate-500 font-medium"
          >
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            placeholder="Enter your full name"
            id="full_name"
            required
            className="h-10 px-3 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <label htmlFor="email" className="text-xs text-slate-500 font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            id="email"
            required
            className="h-10 px-3 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <label
            htmlFor="message"
            className="text-xs text-slate-500 font-medium"
          >
            Message
          </label>
          <textarea
            name="message"
            placeholder="Enter your message"
            id="message"
            required
            className="px-3 py-2 text-sm rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-400 h-32"
          />
          <SubmitButton
            className="w-full flex items-center justify-center h-10 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-150 text-sm font-semibold text-white mt-4"
            formAction={sendMessage}
            pendingText="Sending message..."
          >
            Submit
          </SubmitButton>
        </form>
        {searchParams.message === "Message sent successfully" ? (
          <p className="text-xs text-center font-medium mt-5 text-violet-600">
            {searchParams.message}
          </p>
        ) : (
          <p className="text-xs text-center font-medium mt-5 text-red-500">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
}
