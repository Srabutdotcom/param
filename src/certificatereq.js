//@ts-self-types="../type/certificatereq.d.ts" 

import { Uint16, Extension } from "./dep.ts";
import { parseItems } from "./dep.ts";
import { parseExtension } from "./encrypted.js";

/**
 * ```
 * struct {
      opaque certificate_request_context<0..2^8-1>;
      Extension extensions<2..2^16-1>;
   } CertificateRequest;
   ```
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.2
 */
export class CertificateRequest extends Uint8Array {
   #context
   #extensions
   static sanitize(args) {
      const a0 = args[0];
      if(!(a0 instanceof Uint8Array))return
      const lengthOf_1 = a0.at(0);
      if (lengthOf_1 > 255) throw Error(`Context must less than 256 byte`)
      const lengthOf_2 = Uint16.from(a0.subarray(1 + lengthOf_1)).value;
      if (lengthOf_2 > 65535) throw Error(`Extension must less than 65536`)
      args[0] = a0.slice(0, lengthOf_1 + lengthOf_2 + 3)
      return 
   }
   static from(array) { return new CertificateRequest(array) }
   constructor(...args) {
      CertificateRequest.sanitize(args)
      super(...args)
   }
   get context() {
      if (this.#context) return this.#context;
      const lengthOf = this.at(0);
      this.#context ||= this.subarray(1, 1 + lengthOf);
      return this.#context;
   }
   get extensions() {
      if (this.#extensions) return this.#extensions;
      const lengthOf = Uint16.from(this.subarray(1 + this.context.length)).value;
      this.#extensions ||= parseItems(this, this.context.length + 3, lengthOf, Extension, parseExtension);
      return this.#extensions
   }
}


