import { Extension } from "../src/dep.ts";

/**
 * Represents the TLS `EncryptedExtensions` structure:
 * ```
 * struct {
 *   Extension extensions<0..2^16-1>;
 * } EncryptedExtensions;
 * ```
 * @see https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1
 * @version 0.2.8
 */
export class EncryptedExtensions extends Uint8Array {
  /**
   * Parses the input as an `EncryptedExtensions` instance from multiple extensions.
   *
   * @param {...Uint8Array} extensions - Serialized extensions to include.
   * @returns {EncryptedExtensions}
   */
  static fromExtensions(...extensions: Uint8Array[]): EncryptedExtensions;

  /**
   * Creates an `EncryptedExtensions` instance from a byte-like object.
   *
   * @param {Uint8Array | ArrayBuffer | number[]} array - Input array data.
   * @returns {EncryptedExtensions}
   */
  static from(array: Uint8Array ): EncryptedExtensions;

  /**
   * Constructs an EncryptedExtensions instance.
   *
   * @param {any[]} args - Arguments forwarded to `Uint8Array`, with validation.
   * @throws {RangeError} If byte length exceeds 2^16 - 1.
   */
  constructor(...args: any[]);

  /**
   * Lazily-parsed list of extensions.
   *
   * @returns {Extension[]} Parsed Extension objects.
   */
  get extensions(): Extension[];
}

/**
 * Parses an extension and assigns a suitable parser class to `extension.parser`.
 *
 * @param {Extension} extension - Extension object with `.type` and `.data`.
 */
export function parseExtension(extension: Extension): void;

