import { describe, expect, it, vi } from "vitest";
import { setupScrollReveal } from "@/lib/scroll-reveal";

function fakeElement(top: number, bottom: number) {
  const classes = new Set<string>();
  const element = {
    classList: {
      add: (name: string) => classes.add(name),
      remove: (name: string) => classes.delete(name),
    },
    getBoundingClientRect: () => ({ top, bottom }),
  } as unknown as HTMLElement;

  return { element, classes };
}

describe("scroll reveal setup", () => {
  it("activates hiding only after visible and observed elements are prepared", () => {
    const root = fakeElement(0, 0);
    const visible = fakeElement(100, 200);
    const belowFold = fakeElement(900, 1_000);
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    let callback: IntersectionObserverCallback | undefined;

    const cleanup = setupScrollReveal({
      root: root.element,
      elements: [visible.element, belowFold.element],
      viewportHeight: 800,
      createObserver: (nextCallback) => {
        callback = nextCallback;
        return { observe, unobserve, disconnect };
      },
    });

    expect(visible.classes.has("in")).toBe(true);
    expect(observe).toHaveBeenCalledWith(belowFold.element);
    expect(root.classes.has("reveal-active")).toBe(true);

    callback?.(
      [
        {
          isIntersecting: true,
          target: belowFold.element,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver
    );
    expect(belowFold.classes.has("in")).toBe(true);
    expect(unobserve).toHaveBeenCalledWith(belowFold.element);

    cleanup?.();
    expect(disconnect).toHaveBeenCalledOnce();
    expect(root.classes.has("reveal-active")).toBe(false);
  });

  it("keeps the page visible when observer setup fails", () => {
    const root = fakeElement(0, 0);
    root.classes.add("reveal-active");

    expect(() =>
      setupScrollReveal({
        root: root.element,
        elements: [fakeElement(900, 1_000).element],
        viewportHeight: 800,
        createObserver: () => {
          throw new Error("IntersectionObserver unavailable");
        },
      })
    ).not.toThrow();
    expect(root.classes.has("reveal-active")).toBe(false);
  });
});
