import {
  Bot,
  Building2,
  MessageSquareText,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  slug: string;
  icon: LucideIcon;
  eyebrow: string;
  audience: string;
  title: string;
  shortTitle: string;
  promise: string;
  description: string;
  problem: string;
  outcomes: string[];
  capabilities: Array<{ title: string; text: string }>;
  steps: Array<{ title: string; text: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const products: Product[] = [
  {
    slug: "ai-powered-websites",
    icon: Bot,
    eyebrow: "DIGITAL GROWTH",
    audience: "For teams that need more useful website conversations",
    title: "AI-powered websites",
    shortTitle: "AI websites",
    promise: "A website that answers clearly and turns interest into action.",
    description:
      "Combine clear positioning, fast performance, search-ready content, and an AI assistant that helps visitors find the right next step.",
    problem:
      "Most business websites make visitors search for answers. That creates hesitation, weak enquiries, and more repetitive questions for your team.",
    outcomes: [
      "Clearer pages built around customer questions",
      "Stronger technical SEO and answer-engine visibility",
      "Qualified conversations instead of generic contact requests",
      "A publishing system your team can keep improving",
    ],
    capabilities: [
      { title: "Message clarity", text: "Turn complex services into short, useful answers that are easy to scan." },
      { title: "Search foundation", text: "Build structured pages, metadata, schema, internal links, and editorial workflows together." },
      { title: "AI assistance", text: "Guide visitors to relevant products and collect useful context before a handoff." },
      { title: "Measured improvement", text: "Connect content and conversion decisions to real visitor behaviour." },
    ],
    steps: [
      { title: "Clarify", text: "Define the audience, problem, promise, and action for every important page." },
      { title: "Structure", text: "Design the journey, content model, SEO system, and conversion paths." },
      { title: "Build", text: "Deliver the responsive site, CMS, analytics, and agreed AI features." },
      { title: "Improve", text: "Use search and enquiry data to strengthen the questions the site answers." },
    ],
    faqs: [
      { question: "What makes the website AI-powered?", answer: "AI can support visitor guidance, content operations, lead qualification, and internal workflows. We choose only the uses that improve a real customer or team outcome." },
      { question: "Will the website still work without the chatbot?", answer: "Yes. The information architecture and page copy must answer the core questions on their own. AI is an additional path, not a replacement for clear content." },
      { question: "Can you migrate our current content?", answer: "Yes. We audit what is useful, remove duplication, map redirects, and move approved content into the new structure." },
    ],
  },
  {
    slug: "reputation-management",
    icon: MessageSquareText,
    eyebrow: "CUSTOMER TRUST",
    audience: "For teams that want feedback to drive improvement",
    title: "Reputation management",
    shortTitle: "Reputation",
    promise: "See what customers are saying. Respond before trust is lost.",
    description:
      "Bring reviews, feedback, response ownership, and recurring issues into one simple operating rhythm.",
    problem:
      "Reviews often sit across different channels, responses depend on one person, and useful patterns reach operations too late.",
    outcomes: [
      "One visible queue for reviews and feedback",
      "Clear response ownership and service targets",
      "Faster escalation of high-risk experiences",
      "Recurring themes connected to operational action",
    ],
    capabilities: [
      { title: "Review inbox", text: "Bring priority feedback into a clear, assignable workflow." },
      { title: "Response support", text: "Use approved guidance and AI assistance without losing the human voice." },
      { title: "Issue signals", text: "Group recurring themes so teams can fix causes, not only reply to symptoms." },
      { title: "Trust reporting", text: "Track response time, coverage, sentiment, and action across locations." },
    ],
    steps: [
      { title: "Listen", text: "Map review channels, customer touchpoints, and current response ownership." },
      { title: "Prioritise", text: "Define urgent signals, response standards, and escalation paths." },
      { title: "Connect", text: "Create the shared workflow and integrate the channels that matter." },
      { title: "Improve", text: "Turn patterns into owners, actions, and visible follow-through." },
    ],
    faqs: [
      { question: "Does AI reply to every review automatically?", answer: "Not by default. AI can prepare context-aware drafts, but your approval rules should reflect brand risk, urgency, and the need for a personal response." },
      { question: "Can this support multiple locations?", answer: "Yes. The workflow can separate locations while giving management a shared view of response performance and recurring themes." },
      { question: "Which review channels can connect?", answer: "We confirm channels during discovery because access and API rules vary. The system is planned around the sources that matter most to your customers." },
    ],
  },
  {
    slug: "crm",
    icon: UsersRound,
    eyebrow: "CUSTOMER OPERATIONS",
    audience: "For teams that need every customer next step to stay visible",
    title: "Customer relationship management",
    shortTitle: "CRM",
    promise: "Keep conversations, opportunities, and next steps in one clear view.",
    description:
      "Shape a CRM around the customer journey your team actually uses, with automation where it removes repeat work.",
    problem:
      "When customer context lives in inboxes, spreadsheets, and individual memory, follow-up becomes inconsistent and leaders cannot see what needs attention.",
    outcomes: [
      "One shared customer and opportunity record",
      "Visible ownership for every next step",
      "Consistent follow-up without manual reminders",
      "Reporting based on the real sales and service journey",
    ],
    capabilities: [
      { title: "Customer timeline", text: "Keep conversations, decisions, files, and activity together." },
      { title: "Clear pipeline", text: "Use stages that match how your team qualifies and advances work." },
      { title: "Useful automation", text: "Trigger reminders and handoffs while keeping important decisions human." },
      { title: "Decision reporting", text: "See movement, risk, conversion, and workload without rebuilding spreadsheets." },
    ],
    steps: [
      { title: "Map", text: "Document the current customer journey, data, decisions, and handoffs." },
      { title: "Simplify", text: "Remove fields and stages that do not support a useful decision." },
      { title: "Launch", text: "Configure the workflow, migrate clean data, and train around real scenarios." },
      { title: "Adopt", text: "Measure usage and improve the places where the team still works around the system." },
    ],
    faqs: [
      { question: "Do we need to replace our current CRM?", answer: "Not always. We first identify whether the issue is the platform, the workflow, the data, or adoption. Integration or focused redesign can be better than replacement." },
      { question: "Can it connect to email and our website?", answer: "Yes. Those connections are usually central to removing manual entry and keeping the customer timeline useful." },
      { question: "Can you migrate our spreadsheets?", answer: "Yes, after agreeing on the target data model and cleaning duplicates, incomplete records, and fields that no longer serve a purpose." },
    ],
  },
  {
    slug: "erp",
    icon: Building2,
    eyebrow: "BUSINESS OPERATIONS",
    audience: "For teams ready to connect core operational data",
    title: "Enterprise resource planning",
    shortTitle: "ERP",
    promise: "Connect the operation so leaders can act on one version of the truth.",
    description:
      "Bring finance, inventory, purchasing, people, and operational reporting into a system shaped around how the business runs.",
    problem:
      "Disconnected operational tools create duplicate entry, delayed reporting, and disagreements about which number is correct.",
    outcomes: [
      "Shared operational records across teams",
      "Fewer manual reconciliations and duplicate updates",
      "Role-based workflows with visible approvals",
      "Timelier reporting for operational decisions",
    ],
    capabilities: [
      { title: "Connected modules", text: "Link the functions that share data without forcing every process into one shape." },
      { title: "Controlled workflows", text: "Make approvals, exceptions, and responsibilities visible." },
      { title: "Integration layer", text: "Connect specialist systems that should remain part of the operation." },
      { title: "Management view", text: "Create a consistent set of operational measures and drill-down paths." },
    ],
    steps: [
      { title: "Scope", text: "Choose the business process with the clearest cost, risk, or reporting problem." },
      { title: "Model", text: "Define ownership, data, controls, exceptions, and integration boundaries." },
      { title: "Phase", text: "Release the system in useful modules instead of waiting for one large launch." },
      { title: "Govern", text: "Keep data quality, access, adoption, and process ownership visible." },
    ],
    faqs: [
      { question: "Should an ERP launch cover the whole business at once?", answer: "Usually no. A staged release reduces operational risk and lets each module prove value before the next connection is added." },
      { question: "Can we keep specialist tools we already use?", answer: "Yes. We define which system should own each important record and integrate tools that still perform their role well." },
      { question: "How do you reduce implementation risk?", answer: "Through clear process ownership, staged migration, realistic test scenarios, visible acceptance criteria, and support during adoption." },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
