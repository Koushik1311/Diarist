import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqData = [
  {
    id: "item-1",
    question: "Is there a free trial available?",
    answer:
      "We currently do not offer a free trial, but you can explore our services with our flexible subscription plans.",
  },
  {
    id: "item-2",
    question: "How can I get support?",
    answer: "You can send us your problem through the conact form.",
  },
  {
    id: "item-3",
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, MasterCard, American Express) and PayPal for payments.",
  },
  {
    id: "item-4",
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. Your current subscription will remain active until the end of the billing period.",
  },
  {
    id: "item-5",
    question: "Is there a free trial available?",
    answer:
      "We currently do not offer a free trial, but you can explore our services with our flexible subscription plans.",
  },
];

export default function FAQ() {
  return (
    <section className="container mx-auto mt-24 pb-12 px-4 max-w-3xl">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-violet-500 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible>
        {faqData.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
