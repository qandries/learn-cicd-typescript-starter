import type { IncomingHttpHeaders } from "node:http";
import { getAPIKey } from "src/api/auth";
import { describe, expect, test } from "vitest";

type testHeader = {
  name: string;
  header: IncomingHttpHeaders;
  result: string | null;
};

describe("get an Api Key", () => {
  const testApiKey: testHeader[] = [
    {
      name: "Valid",
      header: { Authorization: "ApiKey myApiKey" },
      result: "myApiKey",
    },
    {
      name: "Malformed",
      header: { Authorization: "Bearer token" },
      result: null,
    },
    { name: "Invalid", header: {}, result: null },
  ];

  test("key exist", () => {
    const apiKey = getAPIKey(testApiKey[0].header);
    expect(apiKey).toBeDefined();
  });

  test("key is malformed", () => {
    const apiKey = getAPIKey(testApiKey[1].header);
    expect(apiKey).toBeNull();
  });

  test("key is invalid", () => {
    const apiKey = getAPIKey(testApiKey[2].header);
    expect(apiKey).toBeNull();
  });
});
