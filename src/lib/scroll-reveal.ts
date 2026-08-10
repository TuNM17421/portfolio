type RevealObserver = Pick<
  IntersectionObserver,
  "disconnect" | "observe" | "unobserve"
>;

type ScrollRevealOptions = {
  root: HTMLElement;
  elements: HTMLElement[];
  viewportHeight: number;
  createObserver: (callback: IntersectionObserverCallback) => RevealObserver;
};

export function setupScrollReveal({
  root,
  elements,
  viewportHeight,
  createObserver,
}: ScrollRevealOptions) {
  let observer: RevealObserver | null = null;

  try {
    observer = createObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer?.unobserve(entry.target);
      });
    });

    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      const alreadyVisible = bounds.top < viewportHeight && bounds.bottom > 0;

      if (alreadyVisible) {
        element.classList.add("in");
      } else {
        observer?.observe(element);
      }
    });

    // This is the only switch that allows CSS to hide unrevealed elements.
    // Add it last so any setup failure leaves server-rendered content visible.
    root.classList.add("reveal-active");
  } catch {
    observer?.disconnect();
    root.classList.remove("reveal-active");
    return;
  }

  return () => {
    observer?.disconnect();
    root.classList.remove("reveal-active");
  };
}
