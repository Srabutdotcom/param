//@ts-self-types="../type/certificatereq.d.ts" 
import { Constrained, Uint16, Extension, Struct } from "./dep.ts";

class Extensions extends Constrained {
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = Uint16.from(copy.subarray(0, 2)).value;
      if (lengthOf < 2) throw RangeError(`Minimum length of extension is 2 bytes`)
      const extensions = [];
      for (let offset = 2; offset < lengthOf + 2;) {
         const extension = Extension.from(copy.subarray(offset))
         extensions.push(extension);
         offset+= extension.length;
      }
      return new Extensions(...extensions)
   }
   constructor(...extensions) {
      super(2, 65535, ...extensions)
      this.extensions = extensions
   }
}

class Certificate_request_context extends Constrained {
   static from(array) {
      const copy = Uint8Array.from(array);
      const lengthOf = copy.at(0);
      if (lengthOf == 0) return new Certificate_request_context
      const context = copy.subarray(1, 1 + lengthOf);
      return new Certificate_request_context(context);
   }
   constructor(opaque) {
      super(0, 255, opaque)
      this.opaque = opaque
   }
}
/**
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.2
 */
export class CertificateRequest extends Struct {
   static from(array){
      const copy = Uint8Array.from(array);
      const certificate_request_context = Certificate_request_context.from(copy);
      const extensions = Extensions.from(copy.subarray(certificate_request_context.length))
      return new CertificateRequest(certificate_request_context.opaque,...extensions.extensions)
   }
   constructor(certificate_request_context, ...extension) {
      super(
         new Certificate_request_context(certificate_request_context),
         new Extensions(...extension)
      )
   }
   static extensions = Extensions
   static certificate_request_context = Certificate_request_context
}

