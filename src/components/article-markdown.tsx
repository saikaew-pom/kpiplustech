import { Check } from "lucide-react";
import type { ReactNode } from "react";

function isSafeHref(href: string) {
  return href.startsWith("/") || href.startsWith("https://") || href.startsWith("http://");
}

function inlineMarkdown(value: string, keyPrefix: string): ReactNode[] {
  const tokens = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of value.matchAll(tokens)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(value.slice(cursor, index));

    const key = `${keyPrefix}-${index}`;
    if (match[1] && match[2]) {
      const href = match[2].trim();
      nodes.push(isSafeHref(href) ? (
        <a href={href} key={key} rel={href.startsWith("http") ? "noreferrer" : undefined} target={href.startsWith("http") ? "_blank" : undefined}>
          {match[1]}
        </a>
      ) : match[1]);
    } else if (match[3]) {
      nodes.push(<strong key={key}>{match[3]}</strong>);
    } else if (match[4]) {
      nodes.push(<code key={key}>{match[4]}</code>);
    }
    cursor = index + match[0].length;
  }

  if (cursor < value.length) nodes.push(value.slice(cursor));
  return nodes;
}

export function ArticleMarkdown({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];

  const flushLists = () => {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    blocks.push(<ul key={`list-${blocks.length}`}>{items.map((item, index) => <li key={`${item}-${index}`}><Check aria-hidden="true" size={17} /><span>{inlineMarkdown(item, `bullet-${index}`)}</span></li>)}</ul>);
  };

  const flushNumbered = () => {
    if (!numbered.length) return;
    const items = numbered;
    numbered = [];
    blocks.push(<ol key={`numbered-${blocks.length}`}>{items.map((item, index) => <li key={`${item}-${index}`}><span>{inlineMarkdown(item, `numbered-${index}`)}</span></li>)}</ol>);
  };

  lines.forEach((line) => {
    const value = line.trim();
    if (!value) { flushLists(); flushNumbered(); return; }
    if (value.startsWith("- ") || value.startsWith("* ")) { flushNumbered(); bullets.push(value.slice(2)); return; }
    const numberedItem = value.match(/^\d+\.\s+(.+)$/);
    if (numberedItem) { flushLists(); numbered.push(numberedItem[1]); return; }
    flushLists();
    flushNumbered();
    if (value.startsWith("# ")) blocks.push(<h2 key={`h2-${blocks.length}`}>{value.slice(2)}</h2>);
    else if (value.startsWith("## ")) blocks.push(<h2 key={`h2-${blocks.length}`}>{value.slice(3)}</h2>);
    else if (value.startsWith("### ")) blocks.push(<h3 key={`h3-${blocks.length}`}>{value.slice(4)}</h3>);
    else if (value.startsWith("> ")) blocks.push(<blockquote key={`quote-${blocks.length}`}><p>{inlineMarkdown(value.slice(2), `quote-${blocks.length}`)}</p></blockquote>);
    else if (value === "---") blocks.push(<hr key={`rule-${blocks.length}`} />);
    else blocks.push(<p key={`p-${blocks.length}`}>{inlineMarkdown(value, `paragraph-${blocks.length}`)}</p>);
  });
  flushLists();
  flushNumbered();

  return <div className="article-content">{blocks}</div>;
}
