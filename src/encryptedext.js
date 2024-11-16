//@ts-self-types="../type/encryptedext.d.ts
import { Uint16, Extension, Constrained } from "./dep.js";

/**
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1
 */
export class EncryptedExtensions extends Constrained {
   static fromExtensions(...extensions){return new EncryptedExtensions(...extensions)}
   static from(array) {
      const copy = Uint8Array.from(array)
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      if (lengthOf == 0) return new EncryptedExtensions
      const extensions = [];
      for (let offset = 2; offset < lengthOf + 2; ) {
         const extension = Extension.from(copy.subarray(offset)) 
         extensions.push(extension);
         offset+=extension.length
      }
      return new EncryptedExtensions(...extensions)
   }
   constructor(...extension) {
      super(0, 65535, ...extension)
   }
}

