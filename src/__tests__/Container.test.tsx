import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Container from "../components/Container";

describe("Container Component", () => {
  it("should render children", () => {
    const { getByText } = render(
      <Container>
        <div>Test Content</div>
      </Container>
    );
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("should apply default classes", () => {
    const { container } = render(<Container />);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain("container");
    expect(div.className).toContain("mx-auto");
    expect(div.className).toContain("px-2");
  });

  it("should apply default max-width", () => {
    const { container } = render(<Container />);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain("max-w-lg");
  });

  it("should apply custom max-width", () => {
    const { container } = render(<Container maxWidth="xl" />);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain("max-w-xl");
  });

  it("should apply all max-width options correctly", () => {
    const maxWidths = [
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
      "8xl",
      "9xl",
      "full",
    ] as const;

    maxWidths.forEach((maxWidth) => {
      const { container } = render(<Container maxWidth={maxWidth} />);
      const div = container.firstChild as HTMLElement;

      expect(div.className).toMatch(/max-w-/);
    });
  });

  it("should merge custom className", () => {
    const { container } = render(<Container className="custom-class" />);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain("custom-class");
    expect(div.className).toContain("container");
  });

  it("should handle empty className", () => {
    const { container } = render(<Container className="" />);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain("container");
  });

  it("should apply max-w-8xl custom width", () => {
    const { container } = render(<Container maxWidth="8xl" />);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain("max-w-[1600px]");
  });

  it("should apply max-w-9xl custom width", () => {
    const { container } = render(<Container maxWidth="9xl" />);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain("max-w-[1800px]");
  });

  it("should apply max-w-full", () => {
    const { container } = render(<Container maxWidth="full" />);
    const div = container.firstChild as HTMLElement;

    expect(div.className).toContain("max-w-full");
  });
});
