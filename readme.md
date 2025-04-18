# TLS 1.3 Parameter Structures (RFC 8446 - Section 4.3)

This project provides JavaScript implementations for handling TLS 1.3 parameters as defined in [RFC 8446 Section 4.3](https://datatracker.ietf.org/doc/html/rfc8446#section-4.3). The code focuses on encoding, decoding, and managing the data structures involved in TLS 1.3, specifically for `CertificateRequest` and `EncryptedExtensions`.
@version 0.2.8

## Features

- **CertificateRequest**: Implements the data structure for requesting certificates during TLS handshake.
  - Parses and serializes `certificate_request_context` and `extensions` fields.
  - Validates length constraints as per the specification.

- **EncryptedExtensions**: Implements the `EncryptedExtensions` structure.
  - Handles encoding and decoding of extensions.
  - Supports variable-length extensions in compliance with RFC requirements.


### Usage

Import the modules and utilize them for TLS 1.3 operations:
```javascript
import { CertificateRequest, EncryptedExtensions } from "@tls/param";

const certRequest = new CertificateRequest(certificate_request_context, ...extensions);
const encryptedExts = EncryptedExtensions.fromExtensions(...extensions);

```

## Completed Work

- [x] 4.3.1.  Encrypted Extensions
- [x] 4.3.2.  Certificate Request


## Pending Work

- [ ] None. The implementation fully satisfies RFC 8446 Section 4.3 requirements.

## References

- [RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3](https://datatracker.ietf.org/doc/html/rfc8446)

### Donation
- https://paypal.me/aiconeid 

### License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
