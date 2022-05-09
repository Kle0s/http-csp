export interface ContentSecurityPolicy {
    [key: string]: string[];
}

export function parse(csp: string): ContentSecurityPolicy {
    const result: ContentSecurityPolicy = {};

    csp.split(";").forEach((policyDirective: string) => {
        const [directive, ...values] = policyDirective.trim().split(/\s+/g);
        if (directive && !(directive in result)) {
            result[directive] = values;
        }
    });
    
    return result;
}

export function build(csp: ContentSecurityPolicy): string {
    let result: string = "";
    for (const [directive, values] of Object.entries(csp)) {
        if (values.length === 0) {
            result = result.concat(`${directive}; `);
        } else {
            result = result.concat(`${directive} ${values.join(" ")}; `);
        }
    }
    return result;
}
