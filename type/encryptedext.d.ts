import { Constrained, Extension } from "../src/dep.js";
/**
 * Represents the EncryptedExtensions in a TLS handshake, as described in 
 * [RFC 8446 Section 4.3.1](https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1).
 * 
 * EncryptedExtensions is used to carry extensions from the server in a secure context.
 */
export class EncryptedExtensions extends Constrained {
   /**
    * Creates a new instance of `EncryptedExtensions` from an array of bytes.
    * 
    * @param array - A `Uint8Array` containing the serialized representation of the extensions.
    * @returns A new `EncryptedExtensions` instance with parsed extensions.
    * @throws {Error} If parsing fails due to invalid structure or data.
    */
   static from(array: Uint8Array): EncryptedExtensions;
 
   /**
    * Constructs a new `EncryptedExtensions` instance.
    * 
    * @param extension - A variable number of extensions to be included in the encrypted extensions.
    */
   constructor(...extension: Extension[]);
 }
 