export type PostSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  takeaway: string;
  sections: PostSection[];
};

export const posts: Post[] = [
  {
    slug: "hotel-self-check-in-without-losing-hospitality",
    title: "Hotel self-check-in without losing the human welcome",
    description: "A practical way to remove repetitive arrival admin while keeping staff available for the moments where hospitality matters.",
    category: "Hotel operations",
    publishedAt: "2026-07-02",
    updatedAt: "2026-07-02",
    readingTime: "5 min read",
    takeaway: "Automate the predictable steps. Make human help easier to reach.",
    sections: [
      {
        heading: "Start with the pressure, not the technology",
        paragraphs: [
          "A busy front desk rarely has one problem. Guests arrive together, registration details are incomplete, room status changes, and someone needs a recommendation at the same time.",
          "Self-check-in is useful when it removes predictable work before that moment. It is less useful when it simply moves a confusing form onto a smaller screen.",
        ],
      },
      {
        heading: "Give the guest one clear journey",
        paragraphs: ["A strong pre-arrival flow answers three questions: what do I need to do, why do you need it, and what happens next?"],
        bullets: [
          "Ask only for information that has a clear operational or legal purpose.",
          "Show progress and explain what remains incomplete.",
          "Keep help visible throughout the journey.",
          "Confirm what the guest should expect on arrival.",
        ],
      },
      {
        heading: "Design the staff experience at the same time",
        paragraphs: [
          "A guest flow cannot reduce work if staff must monitor another disconnected dashboard. The operational view should highlight exceptions: missing details, failed payments, special requests, and arrivals that need personal support.",
          "The goal is not fewer conversations. It is fewer repetitive conversations, leaving more time for useful ones.",
        ],
      },
    ],
  },
  {
    slug: "clear-saas-homepage-message",
    title: "The five answers every SaaS homepage should make obvious",
    description: "Reduce cognitive load by giving visitors the essential answers in the order they need them.",
    category: "Digital growth",
    publishedAt: "2026-06-18",
    updatedAt: "2026-06-18",
    readingTime: "4 min read",
    takeaway: "Clarity is not less information. It is the right information in the right order.",
    sections: [
      {
        heading: "A homepage is a decision path",
        paragraphs: [
          "Visitors do not begin by reading. They begin by deciding whether the page is relevant. Every section should help them make the next small decision with less effort.",
          "That is why clear soundbites work: they give people language they can understand, remember, and repeat.",
        ],
      },
      {
        heading: "Answer these five questions",
        paragraphs: ["The exact words will change, but the sequence is remarkably stable."],
        bullets: [
          "What do you help me improve?",
          "Is this built for a business like mine?",
          "How does it work in practical terms?",
          "Why should I trust your approach?",
          "What is the easiest useful next step?",
        ],
      },
      {
        heading: "Make every section earn its place",
        paragraphs: [
          "A section should answer a customer question, reduce a perceived risk, or support an action. If it does none of those, it is probably adding cognitive load.",
          "Clear writing and clear interface design are the same discipline: deciding what deserves attention now, and what can wait.",
        ],
      },
    ],
  },
  {
    slug: "crm-before-automation",
    title: "Fix the customer workflow before adding more CRM automation",
    description: "Why automating an unclear process creates faster confusion—and what to map first.",
    category: "Connected operations",
    publishedAt: "2026-06-04",
    updatedAt: "2026-06-04",
    readingTime: "6 min read",
    takeaway: "Automate a decision only after the team agrees on the decision.",
    sections: [
      {
        heading: "Automation preserves the process you give it",
        paragraphs: [
          "A reminder can make follow-up more consistent. It cannot decide what a qualified opportunity means if each team member uses a different definition.",
          "When automation disappoints, the problem is often not the rule. It is the missing agreement underneath the rule.",
        ],
      },
      {
        heading: "Map four things first",
        paragraphs: ["Before configuring a workflow, make the operating decisions visible."],
        bullets: [
          "The event that starts the process.",
          "The person responsible for the next decision.",
          "The minimum information needed to make that decision.",
          "The outcome that closes or advances the work.",
        ],
      },
      {
        heading: "Automate handoffs, not accountability",
        paragraphs: [
          "Good CRM automation moves context, creates timely prompts, and makes stalled work visible. It should not obscure who owns the customer outcome.",
          "Start with one costly handoff, measure whether it improves, and expand from evidence rather than from a long feature list.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
