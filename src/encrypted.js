// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/encrypted.d.ts" 
import { sanitize, vector16 } from "./dep.ts";
import { Extension } from "./dep.ts";
import { parseItems } from "./dep.ts";

import {
   ExtensionType,
   NamedGroupList, RecordSizeLimit,
   KeyShareClientHello, ServerNameList, PskKeyExchangeModes,
   Cookie, SignatureSchemeList,
   OfferedPsks,
   EarlyDataIndication,
   Padding,
   Versions
} from "./dep.ts"

/**
 * ```
 * struct {
      Extension extensions<0..2^16-1>;
   } EncryptedExtensions;
   ```
 */
export class EncryptedExtensions extends Uint8Array {
   #extensions

   static fromExtensions(...extensions){
      return EncryptedExtensions.from(vector16(...extensions))
   }
   static from(array) { return new EncryptedExtensions(array) }
   constructor(...args) {
      sanitize(args, { max: 2 ** 16 - 1 })
      super(...args)
   }
   get extensions() {
      this.#extensions ||= parseItems(this, 2, this.length - 2, Extension, parseExtension);
      return this.#extensions
   }
}

export function parseExtension(extension) {
   switch (extension.type) {
      case ExtensionType.SUPPORTED_GROUPS: {
         extension.parser = NamedGroupList; break;
      }
      case ExtensionType.KEY_SHARE: {
         extension.parser = KeyShareClientHello; break;
      }
      case ExtensionType.SUPPORTED_VERSIONS: {
         extension.parser = Versions; break;
      }
      case ExtensionType.SIGNATURE_ALGORITHMS: {
         extension.parser = SignatureSchemeList; break;
      }
      case ExtensionType.SERVER_NAME: {
         extension.parser = extension.data.length ? ServerNameList : extension.data; break;
      }
      case ExtensionType.PSK_KEY_EXCHANGE_MODES: {
         extension.parser = PskKeyExchangeModes; break;
      }
      case ExtensionType.COOKIE: {
         extension.parser = Cookie; break;
      }
      case ExtensionType.RECORD_SIZE_LIMIT: {
         extension.parser = RecordSizeLimit; break;
      }
      case ExtensionType.EARLY_DATA: {
         extension.parser = EarlyDataIndication; break;
      }
      case ExtensionType.PADDING: {
         extension.parser = Padding; break;
      }
      case ExtensionType.PRE_SHARED_KEY: {
         extension.parser = OfferedPsks; break;
      }
      default:
         break;
   }
}


