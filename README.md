[![Kle0s](https://circleci.com/gh/Kle0s/http-csp.svg?style=shield)](https://github.com/Kle0s/http-csp) [![codecov](https://codecov.io/gh/Kle0s/http-csp/branch/main/graph/badge.svg?token=16FG0S6B32)](https://codecov.io/gh/Kle0s/http-csp)

# HTTP Content-Security-Policy
http-csp is a javascript/typescript library for dealing with the web layer [Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).
The CSP layer can be added using either an HTTP header, as follows:
```Content-Security-Policy: policy```
Or a HTML `<meta>` element, like that:
```HTML
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'unsafe-eval' more-scripts.com; object-src; style-src source-for-styles.co.nz;">
```

## Installation
Use the npm package manager in order to install the package:
```bash
npm install http-csp
```

### Typescript Support
The package comes with full on typescript support automatically (and is in fact written in typescript).

## Usage
The package currently exports two functionalities:
1. **Parsing CSP policies**:
```ts
import { parse } from "http-csp";

const policy = parse("default-src 'self'; script-src more-scripts.com; default-src");
```

2. **Building CSP policies**:
```ts
import { build } from "http-csp";

const policy = {
    "default-src": ["'self'"],
    "script-src": ["more-scripts.com", "http://*.example.com"],
};

const cspString = build(policy);
```

## Contributing
Issue opening is welcomed if any are encountered. I do plan to continue maintaing this package in the forseeable future.

## License
Available [here](LICENSE)
