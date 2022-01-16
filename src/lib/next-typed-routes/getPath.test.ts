import { getPath } from "./getPath";

describe("getPath", () => {
  describe.each([
    { test: "with path only", path: "/foo", expected: "/foo" },
    {
      test: "with queries",
      path: "/foo",
      query: { bar: "baz", qux: "quux" },
      expected: "/foo?bar=baz&qux=quux",
    },
    { test: "with path params", path: "/foo/[bar]/baz", params: { bar: "123" }, expected: "/foo/123/baz" },
    {
      test: "with three dots path param",
      path: "/foo/[...bar]/baz/[qux]",
      params: { bar: ["654", "321"], qux: "quux" },
      expected: "/foo/654/321/baz/quux",
    },
    {
      test: "with path params and queries",
      path: "/foo/[...bar]/baz/[qux]",
      params: { bar: ["654", "321"], qux: "quux" },
      query: { hoge: "fuga" },
      expected: "/foo/654/321/baz/quux?hoge=fuga",
    },
  ])("$test", ({ path, params, query, expected }) => {
    it("returns path", () => {
      expect(getPath(path as any, { params, query } as any)).toEqual(expected);
    });
  });

  it("throws an error when path params are missed", () => {
    expect(() => {
      getPath("/foo/[bar]/[baz]" as any, { params: { baz: "123" } } as any);
    }).toThrowError();
  });

  it("throws an error when path params with three dots are missed", () => {
    expect(() => {
      getPath("/foo/[...bar]/[baz]" as any, { params: { baz: "123" } } as any);
    }).toThrowError();
  });
});
