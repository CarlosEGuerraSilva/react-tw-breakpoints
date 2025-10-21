import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Grid from "../components/Grid";

describe("Grid Component", () => {
  describe("container mode", () => {
    it("should render as flex container", () => {
      const { container } = render(
        <Grid container>
          <div>Child 1</div>
          <div>Child 2</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("flex");
      expect(div.className).toContain("flex-wrap");
    });

    it("should apply custom className to container", () => {
      const { container } = render(
        <Grid container className="custom-grid">
          <div>Child</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("custom-grid");
      expect(div.className).toContain("flex");
    });

    it("should render children in container mode", () => {
      const { getByText } = render(
        <Grid container>
          <div>Child 1</div>
          <div>Child 2</div>
        </Grid>
      );

      expect(getByText("Child 1")).toBeInTheDocument();
      expect(getByText("Child 2")).toBeInTheDocument();
    });
  });

  describe("item mode with size prop", () => {
    it("should apply default full width when no size provided", () => {
      const { container } = render(
        <Grid>
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("basis-full");
    });

    it("should apply numeric size", () => {
      const { container } = render(
        <Grid size={6}>
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("basis-6/12");
    });

    it("should apply all valid column spans", () => {
      const validSpans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      validSpans.forEach((span) => {
        const { container } = render(
          <Grid size={span}>
            <div>Content</div>
          </Grid>
        );
        const div = container.firstChild as HTMLElement;

        if (span === 12) {
          expect(div.className).toContain("basis-full");
        } else {
          expect(div.className).toContain(`basis-${span}/12`);
        }
      });
    });

    it("should apply responsive sizes", () => {
      const { container } = render(
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("basis-full");
      expect(div.className).toContain("sm:basis-6/12");
      expect(div.className).toContain("md:basis-4/12");
      expect(div.className).toContain("lg:basis-3/12");
    });

    it("should handle single breakpoint size", () => {
      const { container } = render(
        <Grid size={{ md: 8 }}>
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("md:basis-8/12");
    });

    it("should handle all breakpoints", () => {
      const { container } = render(
        <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6, xl: 4, "2xl": 2 }}>
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("basis-full");
      expect(div.className).toContain("sm:basis-10/12");
      expect(div.className).toContain("md:basis-8/12");
      expect(div.className).toContain("lg:basis-6/12");
      expect(div.className).toContain("xl:basis-4/12");
      expect(div.className).toContain("2xl:basis-2/12");
    });

    it("should apply custom className to item", () => {
      const { container } = render(
        <Grid size={6} className="custom-item">
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("custom-item");
      expect(div.className).toContain("basis-6/12");
    });

    it("should ignore invalid column spans", () => {
      const { container } = render(
        <Grid size={{ xs: 13, sm: 0, md: -1 }}>
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).not.toContain("basis-13/12");
      expect(div.className).not.toContain("basis-0/12");
    });
  });

  describe("children rendering", () => {
    it("should render children in item mode", () => {
      const { getByText } = render(
        <Grid size={6}>
          <div>Test Content</div>
        </Grid>
      );

      expect(getByText("Test Content")).toBeInTheDocument();
    });

    it("should render complex children", () => {
      const { getByText, getByRole } = render(
        <Grid size={6}>
          <h1>Title</h1>
          <button>Click me</button>
        </Grid>
      );

      expect(getByText("Title")).toBeInTheDocument();
      expect(getByRole("button")).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("should handle empty className", () => {
      const { container } = render(
        <Grid size={6} className="">
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("basis-6/12");
    });

    it("should handle container with empty className", () => {
      const { container } = render(
        <Grid container className="">
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).toContain("flex");
    });

    it("should trim whitespace from classNames", () => {
      const { container } = render(
        <Grid size={6} className="  custom  ">
          <div>Content</div>
        </Grid>
      );
      const div = container.firstChild as HTMLElement;

      expect(div.className).not.toMatch(/^\s+|\s+$/);
    });
  });
});
