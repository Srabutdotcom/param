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

/**
 * Represents a 16-bit unsigned integer.
 */
declare class Uint16 extends Uint8Array {
  /**
   * Creates a Uint16 instance from a Uint8Array.
   * @param array - The Uint8Array to parse.
   * @returns {Uint16} - The constructed Uint16 instance.
   */
  static from(array: Uint8Array): Uint16;

  /**
   * Returns the 16-bit unsigned integer value.
   */
  readonly value: number;
}

/**
 * Represents a single extension.
 */
declare class Extension extends Uint8Array {
  /**
   * Creates an Extension instance from a Uint8Array.
   * @param array - The Uint8Array to parse.
   * @returns {Extension} - The constructed Extension instance.
   */
  static from(array: Uint8Array): Extension;

  /**
   * The length of the extension.
   */
  readonly length: number;
}

/**
 * Represents a constrained data structure with a specified range.
 */
declare class Constrained extends Uint8Array {
  /**
   * Constructs a new Constrained instance.
   * @param min - The minimum length.
   * @param max - The maximum length.
   * @param data - The data to constrain.
   */
  constructor(min: number, max: number, ...data: Uint8Array[]);

  /**
   * The minimum allowable length.
   */
  readonly min: number;

  /**
   * The maximum allowable length.
   */
  readonly max: number;
}
