import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Markdown } from "./components/Markdown";

describe("Markdown", () => {
  it("renders bold, italics, lists and paragraphs", () => {
    const html = renderToStaticMarkup(<Markdown text={"A **big** and *small* thing\n\n- one\n- two\n\n1. first\n2. second"} />);
    expect(html).toContain("<strong>big</strong>");
    expect(html).toContain("<em>small</em>");
    expect(html).toContain("<ul");
    expect(html).toContain("<ol");
  });
  it("never lets lesson text inject HTML", () => {
    const html = renderToStaticMarkup(<Markdown text={'<img src=x onerror="alert(1)"> <script>alert(1)</script>'} />);
    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;");
  });
});
