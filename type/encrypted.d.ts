import { Extension } from "../src/dep.ts";

/**
 * Represents the EncryptedExtensions structure as defined in RFC 8446, Section 4.3.1.
 * Contains a set of extensions used during the TLS handshake.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1
 */
export declare class EncryptedExtensions extends Uint8Array {
  /**
   * Sanitizes the input array to ensure it follows the expected format.
   * @param {Uint8Array} array - The input data.
   * @returns {[Uint8Array]} The sanitized output array.
   * @throws {Error} If the length exceeds 65535.
   */
  static sanitize(array: Uint8Array): [Uint8Array];

  /**
   * Creates a new EncryptedExtensions instance from a Uint8Array.
   * @param {Uint8Array} array - The input data.
   * @returns {EncryptedExtensions} A new EncryptedExtensions instance.
   */
  static from(array: Uint8Array): EncryptedExtensions;

  /**
   * Constructs a new EncryptedExtensions instance.
   * @param {Uint8Array} args - The input data.
   */
  constructor(...args: Uint8Array[]);

  /**
   * Gets the set of extensions included in the EncryptedExtensions.
   * @returns {Set<Extension>} A set of parsed Extension objects.
   */
  get extensions(): Set<Extension>;
}
