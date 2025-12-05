import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";
import { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("should return the API key when valid authorization header is provided", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey my-secret-key-123",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("my-secret-key-123");
  });

  test("should return null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("should return null when authorization header doesn't start with 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer some-token-123",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("should return null when authorization header has no space", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKeymy-secret-key",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("should return null when authorization header only contains 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    const result = getAPIKey(headers);

    expect(result).toBeNull();
  });

  test("should handle API keys with special characters", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abc-123_xyz.456",
    };

    const result = getAPIKey(headers);

    expect(result).toBe("abc-123_xyz.456");
  });
});
