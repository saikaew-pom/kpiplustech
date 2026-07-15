"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Bot, LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { trackEvent } from "@/components/analytics-tracker";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Hi — I can help you find the clearest product or project starting point. **What work would you like to make simpler?**",
};

export function SiteChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content };
    const assistantId = crypto.randomUUID();
    const nextMessages = [...messages, userMessage];
    setMessages([...nextMessages, { id: assistantId, role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setLoading(true);
    trackEvent("chat_message");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.map(({ role, content: text }) => ({ role, content: text })) }),
      });

      if (!response.ok || !response.body) throw new Error("Chat is unavailable.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const eventBlock of events) {
          const dataLine = eventBlock.split("\n").find((line) => line.startsWith("data:"));
          if (!dataLine) continue;
          const data = dataLine.slice(5).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data) as { response?: string };
            if (!parsed.response) continue;
            answer += parsed.response;
            setMessages((current) => current.map((message) => message.id === assistantId ? { ...message, content: answer } : message));
          } catch {
            // Ignore partial or provider-specific SSE events.
          }
        }
      }

      if (!answer) throw new Error("No response received.");
    } catch {
      setMessages((current) => current.filter((message) => message.id !== assistantId));
      setError("The assistant could not respond. You can still book a conversation with the team.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="site-chat">
      {open ? (
        <section className="chat-panel" aria-label="NAVA website assistant">
          <header className="chat-header">
            <span><Bot size={19} aria-hidden="true" /></span>
            <div><strong>Website guide</strong><small>AI-powered guidance</small></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close website assistant"><X size={19} /></button>
          </header>

          <Conversation className="chat-conversation">
            <ConversationContent className="chat-messages">
              {messages.map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>
                    {message.role === "assistant" ? <MessageResponse>{message.content || " "}</MessageResponse> : <p>{message.content}</p>}
                  </MessageContent>
                </Message>
              ))}
              {loading && messages.at(-1)?.content === "" ? <div className="chat-thinking"><LoaderCircle size={15} /> Finding the clearest answer…</div> : null}
              {error ? <p className="chat-error" role="alert">{error}</p> : null}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <form className="chat-form" onSubmit={sendMessage}>
            <label className="sr-only" htmlFor="chat-question">Ask about our products and services</label>
            <textarea id="chat-question" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about a product or workflow…" rows={2} maxLength={1200} onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }} />
            <button type="submit" disabled={!input.trim() || loading} aria-label="Send question">{loading ? <LoaderCircle size={18} /> : <Send size={18} />}</button>
          </form>
          <p className="chat-disclaimer">Please do not share sensitive or confidential information.</p>
        </section>
      ) : null}

      <button className="chat-launcher" type="button" onClick={() => setOpen((current) => { if (!current) trackEvent("chat_open"); return !current; })} aria-expanded={open} aria-label={open ? "Close website assistant" : "Open website assistant"}>
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        <span>{open ? "Close" : "Ask us"}</span>
      </button>
    </div>
  );
}
