// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/encrypted_exts.d.ts 
// @ts-check
import { Uint16, Extension, Constrained } from "./dep.ts";

/**
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1
 */
export class EncryptedExtensions extends Constrained {
   /**
   * Creates an `EncryptedExtensions` instance from a list of extensions.
   * @param {...Extension} extensions - List of extensions.
   * @returns {EncryptedExtensions} - The constructed EncryptedExtensions instance.
   */
   static fromExtensions(...extensions){return new EncryptedExtensions(...extensions)}
   /**
   * Creates an `EncryptedExtensions` instance from a Uint8Array.
   * @param {Uint8Array} array - The array to parse.
   * @returns {EncryptedExtensions} - Parsed EncryptedExtensions instance.
   * @override
   */
   static from(array) {
      const copy = Uint8Array.from(array)
      const uint16 = Uint16.from(copy.subarray(0, 2))
      /** @type {number} */
      const lengthOf = uint16.value;
      if (lengthOf == 0) return new EncryptedExtensions
      const extensions = [];
      for (let offset = 2; offset < lengthOf + 2; ) {
         const extension = Extension.from(copy.subarray(offset)) 
         extensions.push(extension);
         offset+=extension.length
      }
      return new EncryptedExtensions(...extensions)
   }
   /**
   * Constructs a new `EncryptedExtensions` instance.
   * @param {...Extension} extension - List of extensions.
   */
   constructor(...extension) {
      super(0, 65535, ...extension)
   }
}

