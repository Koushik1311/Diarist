import Link from "next/link";
import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="container p-6 mt-[10vh]">
      <h1 className="text-3xl font-bold mb-4 text-zinc-900">
        Terms and Conditions
      </h1>
      <p className="mb-4 text-zinc-600">
        Effective Date:
        <strong className="text-zinc-900"> 20-06-2024</strong>
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          1. Introduction
        </h2>
        <p className="text-zinc-600">
          Welcome to Diarist (&apos;we&apos;, &apos;our&apos;, &apos;us&apos;).
          These Terms and Conditions (&apos;Terms&apos;, &apos;Terms and
          Conditions&apos;) govern your use of our website and service (the
          &apos;Service&apos;). By using the Service, you agree to comply with
          and be bound by these Terms. If you disagree with any part of the
          Terms, you may not access the Service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          2 .Use of Our Service
        </h2>
        <p className="text-zinc-600">
          You must be at least 12 years old to use our Service. You agree to
          provide accurate and complete information when creating an account and
          to keep your account information up-to-date. You are responsible for
          maintaining the confidentiality of your account and password and for
          restricting access to your account.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          3. Payment and Subscription
        </h2>
        <p className="text-zinc-600">
          Our Service offers both a lifetime access plan and bundled entry
          plans. You agree to pay all fees associated with your chosen plan. All
          fees are non-refundable except as required by law. We reserve the
          right to change our fees at any time, with notice to you.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          4. User Conduct
        </h2>
        <p className="text-zinc-600">
          You agree not to use the Service for any unlawful purpose or in any
          way that could damage, disable, overburden, or impair the Service. You
          also agree not to interfere with or attempt to gain unauthorized
          access to any parts of the Service or any accounts, computer systems,
          or networks connected to the Service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          5. Intellectual Property
        </h2>
        <p className="text-zinc-600">
          The Service and its original content, features, and functionality are
          and will remain the exclusive property of [Your SaaS Product Name] and
          its licensors. You agree not to reproduce, duplicate, copy, sell,
          resell, or exploit any portion of the Service without express written
          permission from us.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          6. Termination
        </h2>
        <p className="text-zinc-600">
          We may terminate or suspend your account and access to the Service
          immediately, without prior notice or liability, for any reason,
          including if you breach these Terms. Upon termination, your right to
          use the Service will cease immediately.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          7. Limitation of Liability
        </h2>
        <p className="text-zinc-600">
          In no event shall Diarist, nor its directors, employees, partners,
          agents, suppliers, or affiliates, be liable for any indirect,
          incidental, special, consequential, or punitive damages, including
          without limitation, loss of profits, data, use, goodwill, or other
          intangible losses, resulting from (i) your use or inability to use the
          Service; (ii) any unauthorized access to or use of our servers and/or
          any personal information stored therein; (iii) any interruption or
          cessation of transmission to or from the Service; (iv) any bugs,
          viruses, trojan horses, or the like that may be transmitted to or
          through our Service by any third party; and/or (v) any errors or
          omissions in any content or for any loss or damage of any kind
          incurred as a result of your use of any content posted, emailed,
          transmitted, or otherwise made available via the Service, whether
          based on warranty, contract, tort (including negligence), or any other
          legal theory, and whether or not we were advised of the possibility of
          such damages.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          8. Governing Law
        </h2>
        <p className="text-zinc-600">
          These Terms shall be governed and construed in accordance with the
          laws of India, without regard to its conflict of law provisions. Our
          failure to enforce any right or provision of these Terms will not be
          considered a waiver of those rights. If any provision of these Terms
          is held to be invalid or unenforceable by a court, the remaining
          provisions of these Terms will remain in effect.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-zinc-900">
          9. Contact Us
        </h2>
        <p className="text-zinc-600">
          If you have any questions about these Terms, please{" "}
          <Link
            href="/contact"
            className="text-violet-400 hover:text-violet-600 transition-colors"
          >
            contact us
          </Link>
        </p>
        {/* <p>[Your Contact Information]</p> */}
      </section>
    </div>
  );
}
