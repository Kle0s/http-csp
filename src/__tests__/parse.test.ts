import { parse } from "../index";

describe("Parse Function", () => {
    it("parses the empty string", () => {
        expect(parse("")).toStrictEqual({});
    });

    it("parses a string that just has spaces", () => {
        expect(parse("   ")).toStrictEqual({});
    });

    it("parses a string with one empty directive", () => {
        expect(parse("default-src")).toStrictEqual({
            "default-src": [],
        });
    });

    it("parses a string with one directive with one value", () => {
        expect(parse("default-src default.com")).toStrictEqual({
            "default-src": ["default.com"],
        });
    });

    it("parses a string with one directive with two values", () => {
        expect(parse("default-src 'self' default.com")).toStrictEqual({
            "default-src": ["'self'", "default.com"],
        });
    });

    it("parses a string with multiple directives", () => {
        const policy =
            "default-src 'self'; script-src 'unsafe-eval' more-scripts.com; object-src; style-src source-for-styles.co.nz";

        expect(parse(policy)).toStrictEqual({
            "default-src": ["'self'"],
            "script-src": ["'unsafe-eval'", "more-scripts.com"],
            "object-src": [],
            "style-src": ["source-for-styles.co.nz"],
        });
    });

    it("handles trailing semicolons", () => {
        const expected = {
            "default-src": ["default.com"],
        };

        expect(parse("default-src default.com;")).toStrictEqual(expected);
        expect(parse("default-src default.com ;")).toStrictEqual(expected);
        expect(parse("default-src default.com ; ")).toStrictEqual(expected);
    });

    it("gracefully handles extra semicolons", () => {
        const policy =
            "default-src 'self'; script-src 'unsafe-eval' more-scripts.com; ; ; ;; object-src; style-src source-for-styles.co.nz";

        expect(parse(policy)).toStrictEqual({
            "default-src": ["'self'"],
            "script-src": ["'unsafe-eval'", "more-scripts.com"],
            "object-src": [],
            "style-src": ["source-for-styles.co.nz"],
        });
    });

    it("ignores an identical directive", () => {
        const policy =
            "default-src 'self'; script-src more-scripts.com; default-src 'none'";

        expect(parse(policy)).toStrictEqual({
            "default-src": ["'self'"],
            "script-src": ["more-scripts.com"],
        });
    });

    it("ignores an identical directive, even when empty", () => {
        const policy = "default-src 'self'; script-src more-scripts.com; default-src";

        expect(parse(policy)).toStrictEqual({
            "default-src": ["'self'"],
            "script-src": ["more-scripts.com"],
        });
    });

    it("parses a string with multiple directives with no spaces between semicolons", () => {
        const policy =
            "default-src 'self';script-src 'unsafe-eval' more-scripts.com;object-src;style-src source-for-styles.co.nz";

        expect(parse(policy)).toStrictEqual({
            "default-src": ["'self'"],
            "script-src": ["'unsafe-eval'", "more-scripts.com"],
            "object-src": [],
            "style-src": ["source-for-styles.co.nz"],
        });
    });
});
