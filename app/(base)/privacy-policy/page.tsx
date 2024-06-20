import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container p-6 mt-[10vh]">
      <h1 className="text-3xl font-bold mb-4 text-zinc-900">Privacy Policy</h1>
      <p className="mb-4 text-zinc-600">
        Effective Date:
        <strong className="text-zinc-900"> 20-06-2024</strong>
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          1. Introduction
        </h2>
        <p className="text-zinc-600">
          Welcome to Diarist. We are committed to protecting your personal
          information and your right to privacy. If you have any questions or
          concerns about this Privacy Policy or our practices with regard to
          your personal information, please contact us at [contact email].
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          2. Information We Collect
        </h2>
        <p>
          We collect information that you provide to us directly when you use
          our service. This includes:
        </p>
        <ul className="list-disc list-inside text-zinc-600">
          <li>
            <strong className="text-zinc-900">Personal Information:</strong>{" "}
            When you sign up, we collect your email address and any other
            information you choose to provide.
          </li>
          <li>
            <strong className="text-zinc-900">Diary Entries:</strong> The
            content you add to your diary entries.
          </li>
          <li>
            <strong className="text-zinc-900">Usage Data:</strong> Information
            about how you use our service, such as the date and time you log in
            and the features you use.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          3. How We Use Your Information
        </h2>
        <p className="text-zinc-600">
          We use your information for the following purposes:
        </p>
        <ul className="text-zinc-600">
          <li>
            <strong className="text-zinc-900">
              To Provide and Maintain Our Service:
            </strong>{" "}
            Including to monitor the usage of our service.
          </li>
          <li>
            <strong className="text-zinc-900">To Manage Your Account:</strong>{" "}
            To manage your registration as a user of the service.
          </li>
          <li>
            <strong className="text-zinc-900">To Contact You:</strong> To send
            you updates, security alerts, and other essential communications.
          </li>
          <li>
            <strong className="text-zinc-900">To Improve Our Service:</strong>{" "}
            To understand how our users use the service and to make
            improvements.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          4. Sharing Your Information
        </h2>
        <p className="text-zinc-600">
          We do not share your personal information with third parties except in
          the following circumstances:
        </p>
        <ul className="list-disc list-inside text-zinc-600">
          <li>
            <strong className="text-zinc-900">With Service Providers:</strong>{" "}
            We may share your information with third-party service providers to
            perform services on our behalf, such as payment processing and email
            delivery.
          </li>
          <li>
            <strong className="text-zinc-900">For Legal Reasons:</strong> We may
            disclose your information if required to do so by law or in response
            to valid requests by public authorities.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          5. Data Retention
        </h2>
        <p className="text-zinc-600">
          We will retain your personal information only for as long as is
          necessary to fulfill the purposes outlined in this Privacy Policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          6. Your Privacy Rights
        </h2>
        <p className="text-zinc-600">
          You have certain rights regarding your personal information, including
          the right to access, correct, or delete the personal information we
          hold about you. To exercise these rights, please contact us at
          [contact email].
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          7. Changes to This Privacy Policy
        </h2>
        <p className="text-zinc-600">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          8. Contact Us
        </h2>
        <p className="text-zinc-600">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p className="text-zinc-600">[Your Contact Information]</p>
      </section>
    </div>
  );
}
