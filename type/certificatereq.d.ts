import { Constrained, Extension, Struct } from "../src/dep.ts";

/**
 * Represents a collection of TLS extensions.
 * Enforces constraints on the minimum and maximum length of the extensions.
 */
export class Extensions extends Constrained {
  /**
   * Creates an `Extensions` instance from a Uint8Array.
   * @param {Uint8Array} array - The array to parse.
   * @returns {Extensions} - Parsed Extensions instance.
   * @throws {RangeError} - If the length of the extension is less than 2 bytes.
   */
  static from(array: Uint8Array): Extensions;

  /**
   * Constructs a new `Extensions` instance.
   * @param {...Extension} extensions - List of extensions.
   */
  constructor(...extensions: Extension[]);

  /** 
   * List of extensions.
   * @type {Extension[]}
   */
  extensions: Extension[];
}

/**
 * Represents the certificate request context in a TLS handshake.
 * Enforces constraints on the minimum and maximum length of the context.
 */
export class Certificate_request_context extends Constrained {
  /**
   * Creates a `Certificate_request_context` instance from a Uint8Array.
   * @param {Uint8Array} array - The array to parse.
   * @returns {Certificate_request_context} - Parsed Certificate_request_context instance.
   */
  static from(array: Uint8Array): Certificate_request_context;

  /**
   * Constructs a new `Certificate_request_context` instance.
   * @param {Uint8Array} [opaque] - Optional opaque context data.
   */
  constructor(opaque?: Uint8Array);

  /**
   * Opaque context data.
   * @type {Uint8Array | undefined}
   */
  opaque: Uint8Array | undefined;
}

/**
 * Represents a CertificateRequest structure as defined in RFC 8446.
 * Contains the certificate request context and associated extensions.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.2
 */
export class CertificateRequest extends Struct {
  /**
   * Creates a `CertificateRequest` instance from a Uint8Array.
   * @param {Uint8Array} array - The array to parse.
   * @returns {CertificateRequest} - Parsed CertificateRequest instance.
   */
  static from(array: Uint8Array): CertificateRequest;

  /**
   * Constructs a new `CertificateRequest` instance.
   * @param {Uint8Array | undefined} certificate_request_context - The certificate request context.
   * @param {...Extension} extension - List of extensions.
   */
  constructor(certificate_request_context?: Uint8Array, ...extension: Extension[]);

  /**
   * Represents the extensions of a CertificateRequest.
   * @type {typeof Extensions}
   */
  static extensions: typeof Extensions;

  /**
   * Represents the certificate request context of a CertificateRequest.
   * @type {typeof Certificate_request_context}
   */
  static certificate_request_context: typeof Certificate_request_context;
}

