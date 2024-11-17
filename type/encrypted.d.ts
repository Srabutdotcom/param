// encrypted.d.ts

import { Constrained, Extension, Uint16 } from "../src/dep.ts";

/**
 * Represents the EncryptedExtensions structure as defined in RFC 8446, Section 4.3.1.
 * Contains a set of extensions used during the TLS handshake.
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1
 */
export class EncryptedExtensions extends Constrained {
  /**
   * Creates an `EncryptedExtensions` instance from a list of extensions.
   * @param {...Extension} extensions - List of extensions.
   * @returns {EncryptedExtensions} - The constructed EncryptedExtensions instance.
   */
  static fromExtensions(...extensions: Extension[]): EncryptedExtensions;

  /**
   * Creates an `EncryptedExtensions` instance from a Uint8Array.
   * @param {Uint8Array} array - The array to parse.
   * @returns {EncryptedExtensions} - Parsed EncryptedExtensions instance.
   */
  static from(array: Uint8Array): EncryptedExtensions;

  /**
   * Constructs a new `EncryptedExtensions` instance.
   * @param {...Extension} extension - List of extensions.
   */
  constructor(...extension: Extension[]);
}
