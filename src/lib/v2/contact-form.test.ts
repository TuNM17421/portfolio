import { describe, expect, it } from "vitest";
import {
  contactStatusIsError,
  contactStatusLocksFields,
  parseContactReviewState,
  resolveContactResponseStatus,
  resolveInitialContactStatus,
} from "./contact-form";

describe("portfolio v2 contact form state contract", () => {
  it("accepts only deterministic review states", () => {
    expect(parseContactReviewState("ready")).toBe("ready");
    expect(parseContactReviewState("validation")).toBe("validation");
    expect(parseContactReviewState("offline")).toBe("offline");
    expect(parseContactReviewState("unknown")).toBeNull();
    expect(parseContactReviewState("")).toBeNull();
  });

  it("falls back to unavailable when real delivery is not configured", () => {
    expect(
      resolveInitialContactStatus({
        deliveryEnabled: false,
        reviewState: null,
      }),
    ).toBe("unavailable");
    expect(
      resolveInitialContactStatus({
        deliveryEnabled: true,
        reviewState: null,
      }),
    ).toBe("ready");
  });

  it("lets a forced review state override the environment without sending", () => {
    expect(
      resolveInitialContactStatus({
        deliveryEnabled: false,
        reviewState: "success",
      }),
    ).toBe("success");
  });

  it("reports success only for the real endpoint's accepted status", () => {
    expect(resolveContactResponseStatus(202)).toBe("success");
    expect(resolveContactResponseStatus(200)).toBe("error");
    expect(resolveContactResponseStatus(429)).toBe("rate-limit");
    expect(resolveContactResponseStatus(502)).toBe("error");
    expect(resolveContactResponseStatus(503)).toBe("unavailable");
  });

  it("separates announced errors from field-locking states", () => {
    expect(contactStatusIsError("validation")).toBe(true);
    expect(contactStatusIsError("offline")).toBe(true);
    expect(contactStatusIsError("success")).toBe(false);

    expect(contactStatusLocksFields("sending")).toBe(true);
    expect(contactStatusLocksFields("static")).toBe(true);
    expect(contactStatusLocksFields("error")).toBe(false);
  });
});
