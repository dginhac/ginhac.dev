import { marked, Renderer } from "marked";

const renderer = new Renderer();

renderer.link = ({ href, title, tokens }) => {
  const text = tokens.map((t) => ("text" in t ? t.text : "")).join("");
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const titleAttr = title ? ` title="${title}"` : "";

  if (isExternal) {
    return `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" class="link-external">${text}</a>`;
  }
  return `<a href="${href}"${titleAttr} class="link-internal">${text}</a>`;
};

marked.use({ renderer });

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false }) as string;
}
