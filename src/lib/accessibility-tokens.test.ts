import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

function themeBlock(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped} \\{([\\s\\S]*?)\\n\\}`));
  if (!match) throw new Error(`Missing CSS block: ${selector}`);
  return match[1];
}

function token(block: string, name: string) {
  const match = block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`Missing color token: --${name}`);
  return match[1];
}

function luminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((channel) => parseInt(channel, 16) / 255)
    .map((value) =>
      value <= 0.04045
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4),
    );
  return (
    channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
  );
}

function contrast(first: string, second: string) {
  const [bright, dark] = [luminance(first), luminance(second)].sort(
    (a, b) => b - a,
  );
  return (bright + 0.05) / (dark + 0.05);
}

describe("small text tokens", () => {
  it.each(["faint", "accent-2"])(
    "%s meets WCAG AA across both themes",
    (foregroundToken) => {
      for (const [selector, surfaces] of [
        [":root", ["background", "background-soft", "surface", "surface-2"]],
        [
          ':root[data-theme="light"]',
          ["background", "background-soft", "surface", "surface-2"],
        ],
      ] as const) {
        const block = themeBlock(selector);
        const foreground = token(block, foregroundToken);

        for (const surface of surfaces) {
          expect(
            contrast(foreground, token(block, surface)),
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    },
  );

  it("keeps white button text readable across each solid gradient", () => {
    for (const selector of [":root", ':root[data-theme="light"]']) {
      const block = themeBlock(selector);
      const foreground = token(block, "primary-foreground");

      for (const gradientStop of ["grad-solid-from", "grad-solid-to"]) {
        expect(
          contrast(foreground, token(block, gradientStop)),
        ).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
