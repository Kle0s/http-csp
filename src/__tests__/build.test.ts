import { build } from "../index";

describe("Build Function", () => {
    it("builds empty string", () => {
        expect(build({})).toStrictEqual("");
    });

    it("builds one empty directive", () => {
        expect(build({
            "default-src": [],
        })).toStrictEqual("default-src; ");
    });

    it("builds one directive with one value", () => {
        expect(build({
            "default-src": ["'self'", "default.com"],
        })).toStrictEqual("default-src 'self' default.com; ");
    });

    it("builds multiple directives", () => {
        expect(build({
            "default-src": ["'self'"],
            "script-src": ["'unsafe-eval'", "more-scripts.com"],
            "object-src": [],
            "style-src": ["source-for-styles.co.nz"],
        })).toStrictEqual("default-src 'self'; script-src 'unsafe-eval' more-scripts.com; object-src; style-src source-for-styles.co.nz; ");
    });
});
