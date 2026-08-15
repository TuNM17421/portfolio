import { describe, expect, it } from "vitest";
import {
  contactStatusIsError,
  contactStatusLocksFields,
  resolveContactResponseStatus,
  resolveInitialContactStatus,
} from "./contact-form";

describe("portfolio v2 contact form state contract", () => {
  it("falls back to unavailable when real delivery is not configured", () => {
    expect(resolveInitialContactStatus(false)).toBe("unavailable");
    expect(resolveInitialContactStatus(true)).toBe("ready");
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
    expect(contactStatusLocksFields("unavailable")).toBe(true);
    expect(contactStatusLocksFields("error")).toBe(false);
  });
});
