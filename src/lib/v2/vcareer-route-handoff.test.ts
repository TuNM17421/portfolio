import { describe, expect, it } from "vitest";
import {
  VCAREER_HANDOFF_INTENT_TTL_MS,
  isVCareerHandoffDestination,
  parseVCareerHandoffIntent,
  serializeVCareerHandoffIntent,
  shouldEnhanceVCareerHandoff,
} from "./vcareer-route-handoff";

const plainActivation = {
  altKey: false,
  button: 0,
  ctrlKey: false,
  defaultPrevented: false,
  download: false,
  metaKey: false,
  shiftKey: false,
  target: null,
};

describe("VCareer route handoff", () => {
  it("enhances only an unmodified primary-link activation", () => {
    expect(shouldEnhanceVCareerHandoff(plainActivation)).toBe(true);
    expect(shouldEnhanceVCareerHandoff({ ...plainActivation, button: 1 })).toBe(
      false,
    );
    expect(
      shouldEnhanceVCareerHandoff({ ...plainActivation, metaKey: true }),
    ).toBe(false);
    expect(
      shouldEnhanceVCareerHandoff({ ...plainActivation, ctrlKey: true }),
    ).toBe(false);
    expect(
      shouldEnhanceVCareerHandoff({ ...plainActivation, target: "_blank" }),
    ).toBe(false);
    expect(
      shouldEnhanceVCareerHandoff({ ...plainActivation, download: true }),
    ).toBe(false);
    expect(
      shouldEnhanceVCareerHandoff({
        ...plainActivation,
        defaultPrevented: true,
      }),
    ).toBe(false);
  });

  it("round-trips a fresh one-time arrival intent", () => {
    const now = 1_000_000;
    const value = serializeVCareerHandoffIntent({
      createdAt: now,
      direction: "forward",
    });

    expect(parseVCareerHandoffIntent(value, now + 250)).toEqual({
      createdAt: now,
      direction: "forward",
    });
  });

  it("rejects malformed, future, and expired arrival intents", () => {
    const now = 1_000_000;

    expect(parseVCareerHandoffIntent("not-json", now)).toBeNull();
    expect(
      parseVCareerHandoffIntent(
        JSON.stringify({ createdAt: now, direction: "sideways" }),
        now,
      ),
    ).toBeNull();
    expect(
      parseVCareerHandoffIntent(
        JSON.stringify({ createdAt: now + 2_000, direction: "forward" }),
        now,
      ),
    ).toBeNull();
    expect(
      parseVCareerHandoffIntent(
        JSON.stringify({ createdAt: now, direction: "return" }),
        now + VCAREER_HANDOFF_INTENT_TTL_MS + 1,
      ),
    ).toBeNull();
  });

  it("recognizes localized forward and return destinations", () => {
    expect(isVCareerHandoffDestination("/vi/projects/vcareer", "forward")).toBe(
      true,
    );
    expect(
      isVCareerHandoffDestination("/en/projects/vcareer/", "forward"),
    ).toBe(true);
    expect(isVCareerHandoffDestination("/vi/v2", "return")).toBe(true);
    expect(isVCareerHandoffDestination("/vi/projects/vcareer", "return")).toBe(
      false,
    );
    expect(isVCareerHandoffDestination("/vi/v2", "forward")).toBe(false);
  });
});
