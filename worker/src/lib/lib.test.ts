import { describe, expect, it } from "vitest";
import { burnPasswordCheck, hashPassword, verifyPassword } from "./password";
import { generatePassword, randomInt, usernameBase } from "./words";

describe("passwords", () => {
  it("verifies the right password and rejects wrong ones", async () => {
    const hash = await hashPassword("blue-tiger-42");
    expect(hash.startsWith("pbkdf2$100000$")).toBe(true);
    expect(await verifyPassword("blue-tiger-42", hash)).toBe(true);
    expect(await verifyPassword("blue-tiger-43", hash)).toBe(false);
  });

  it("uses a different salt every time", async () => {
    expect(await hashPassword("same")).not.toBe(await hashPassword("same"));
  });

  it("rejects malformed stored hashes", async () => {
    expect(await verifyPassword("x", "")).toBe(false);
    expect(await verifyPassword("x", "plain$1$a$b")).toBe(false);
    expect(await verifyPassword("x", "pbkdf2$abc$a$b")).toBe(false);
  });

  it("burnPasswordCheck completes", async () => {
    await expect(burnPasswordCheck("anything")).resolves.toBeUndefined();
  });
});

describe("generated credentials", () => {
  it("makes colour-animal-number passwords", () => {
    for (let i = 0; i < 50; i++) expect(generatePassword()).toMatch(/^[a-z]+-[a-z]+-\d{2}$/);
  });

  it("randomInt stays in range", () => {
    for (let i = 0; i < 200; i++) {
      const n = randomInt(7);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(7);
    }
  });

  it("builds usernames from display names", () => {
    expect(usernameBase("Maya Rose")).toBe("mayarose");
    expect(usernameBase("Zoë")).toBe("zoe");
    expect(usernameBase("!!!")).toBe("");
  });
});
