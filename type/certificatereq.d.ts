import { Extension } from "../src/dep.ts";

/**
 * Represents a TLS 1.3 CertificateRequest structure.
 * This structure is used during the handshake to request a client certificate.
 */
export declare class CertificateRequest extends Uint8Array {
  /**
   * Sanitizes the input array to ensure it follows the expected format.
   * @param {Uint8Array} array - The input data.
   * @returns {[Uint8Array]} The sanitized output array.
   * @throws {Error} If context length is greater than 255 or extension length is greater than 65535.
   */
  static sanitize(array: Uint8Array): [Uint8Array];

  /**
   * Creates a new CertificateRequest instance from a Uint8Array.
   * @param {Uint8Array} array - The input data.
   * @returns {CertificateRequest} A new CertificateRequest instance.
   */
  static from(array: Uint8Array): CertificateRequest;

  /**
   * Constructs a new CertificateRequest instance.
   * @param {Uint8Array} args - The input data.
   */
  constructor(...args: Uint8Array[]);

  /**
   * Gets the request context.
   * @returns {Uint8Array} The context used in the CertificateRequest.
   */
  get context(): Uint8Array;

  /**
   * Gets the set of extensions included in the CertificateRequest.
   * @returns {Set<Extension>} A set of parsed Extension objects.
   */
  get extensions(): Set<Extension>;
}
