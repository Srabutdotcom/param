// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/encrypted.d.ts" 
import { Uint16, parseItems } from "./dep.ts";
import { Extension } from "./dep.ts"
import { parseExtension } from "./utils.js";

export class EncryptedExtensions extends Uint8Array {
   #extensions
   static sanitize(array) {
      const lengthOf = Uint16.from(array).value;
      if (lengthOf > 65535) throw Error(`Length exceeding max. 65535`)
      return [array.slice(0, 2 + lengthOf)]
   }
   static from(array){ return new EncryptedExtensions(array)}
   constructor(...args) {
      args = (args.at(0) instanceof Uint8Array) ? EncryptedExtensions.sanitize(args.at(0)) : args
      super(...args)
   }
   get extensions() {
      this.#extensions ||= parseItems(this, 2, this.length - 2, Extension, parseExtension);
      return this.#extensions
   }
}


/**
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1
 */
/* export class EncryptedExtensions_0 extends Constrained {
   ext = new Set;
   static fromExtensions(...extensions) { return new EncryptedExtensions(...extensions) }
   static fromHandshake(array) {
      const copy = Uint8Array.from(array);
      const type = HandshakeType.from(copy);
      if (type !== HandshakeType.ENCRYPTED_EXTENSIONS) return TypeError(`Expected EncryptedExtension`)
      const lengthOf = Uint24.from(copy.subarray(1)).value;
      if (lengthOf == 2) return new EncryptedExtensions
      return EncryptedExtensions.from(copy.subarray(4))
   }
   static from(array) {
      const copy = Uint8Array.from(array)
      const lengthOf = Uint16.from(copy).value;
      if (lengthOf == 0) return new EncryptedExtensions
      const extensions = parseItems(copy, 2, lengthOf, Extension, parseExtension);//_Extensions.from(copy.subarray());
      return new EncryptedExtensions(...extensions)
   }

   constructor(...extensions) {
      super(0, 65535, ...extensions)
      this.extensions = extensions;
   }

   get handshake() {
      return new Handshake(HandshakeType.ENCRYPTED_EXTENSIONS, this);
   }

   get record() {
      return this.handshake.record
   }
}

class _Extensions extends Constrained {
   static fromExtension(...extensions) { return new _Extensions(...extensions) }
   static from(array) {
      const copy = Uint8Array.from(array);
      const _lengthOf = Uint16.from(copy).value;
      const extensions = [];
      let offset = 2;
      //for (let offset = 2; offset < lengthOf + 2;) {
      //if (offset > copy.length - 2) break;
      while (true) {
         const extension = Extension.from(copy.subarray(offset)); offset += extension.length
         parseExtension(extension);
         extensions.push(extension)
         if (offset >= copy.length - 2) break;
      }
      return new _Extensions(...extensions)
   }
   constructor(...extensions) {
      super(0, 2 ** 16 - 1, ...extensions)
      this.extensions = extensions
   }
}
 */


