import { describe, expect, it } from "vitest";
import { activePanelForPath } from "./navigation-state";

describe("activePanelForPath", () => {
  it("hides a panel that was opened on a previous path", () => {
    expect(
      activePanelForPath({ id: "profile", pathname: "/flights" }, "/chat")
    ).toBe("none");
  });
});
