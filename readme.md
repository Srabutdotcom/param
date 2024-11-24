# TLS 1.3 Parameter Structures (RFC 8446 - Section 4.1)

This project provides JavaScript implementations for handling TLS 1.3 parameters as defined in [RFC 8446 Section 4.1](https://datatracker.ietf.org/doc/html/rfc8446#section-4.1). The code focuses on encoding, decoding, and managing the data structures involved in the `ClientHello`, `ServerHello`, and `HelloRetryRequest` messages during the TLS 1.3 handshake process.

## Features

- **ClientHello**: Implements the `ClientHello` message structure.
  - Encodes and decodes client-generated parameters such as `key_share`, `supported_versions`, and `extensions`.
  - Validates constraints and ensures compliance with RFC 8446 requirements.

- **ServerHello**: Implements the `ServerHello` message structure.
  - Handles server responses, including the selected `key_share` and `supported_version`.
  - Supports encoding, decoding, and serialization of the `ServerHello` fields.

- **HelloRetryRequest**: Implements the `HelloRetryRequest` message structure.
  - Encodes and decodes server-generated retry requests, including the selected `key_share`.
  - Ensures proper handling of retry scenarios as specified in the RFC.

### Usage

Import the modules and use them to construct and manage handshake messages:

```javascript
import { ClientHello, ServerHello, HelloRetryRequest } from "@tls/keyexchange";

// ClientHello usage
const clientHello = new ClientHello();

// ServerHello usage
const serverHello = ServerHello.fromClientHello(ClientHello);

```

## Completed Work

- [x] 4.1.2. ClientHello
- [x] 4.1.3. ServerHello

## Pending Work

- [x] 4.1.4. HelloRetryRequest.


## References

- [RFC 8446: The Transport Layer Security (TLS) Protocol Version 1.3](https://datatracker.ietf.org/doc/html/rfc8446)

### Donation

- [Support the project on PayPal](https://paypal.me/aiconeid)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.