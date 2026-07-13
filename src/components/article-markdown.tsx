import { Check } from "lucide-react";

export function ArticleMarkdown({ markdown }: { markdown: string }) {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (!bullets.length) return;
    const items = bullets;
    bullets = [];
    blocks.push(<ul key={`list-${blocks.length}`}>{items.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>);
  };

  lines.forEach((line) => {
    const value = line.trim();
    if (!value) { flushBullets(); return; }
    if (value.startsWith("- ") || value.startsWith("* ")) { bullets.push(value.slice(2)); return; }
    flushBullets();
    if (value.startsWith("# ")) blocks.push(<h2 key={`h2-${blocks.length}`}>{value.slice(2)}</h2>);
    else if (value.startsWith("## ")) blocks.push(<h2 key={`h2-${blocks.length}`}>{value.slice(3)}</h2>);
    else if (value.startsWith("### ")) blocks.push(<h3 key={`h3-${blocks.length}`}>{value.slice(4)}</h3>);
    else blocks.push(<p key={`p-${blocks.length}`}>{value}</p>);
  });
  flushBullets();

  return <div className="article-content">{blocks}</div>;
}
