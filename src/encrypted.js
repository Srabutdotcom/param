// deno-lint-ignore-file no-slow-types
// @ts-self-types="../type/encrypted.d.ts" 
import { ContentType, HandshakeType } from "./dep.ts";
import { Uint16, Constrained, Uint24, parseItems } from "./dep.ts";
import {
   Extension, ExtensionType,
   NamedGroupList, RecordSizeLimit,
   KeyShareClientHello, SupportedVersions, ServerNameList, PskKeyExchangeModes,
   Cookie, Supported_signature_algorithms,
   OfferedPsks,
   EarlyDataIndication,
   Padding,
} from "./dep.ts"

/**
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1
 */
export class EncryptedExtensions extends Constrained {
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
      const extensions = parseItems(copy, 2, lengthOf, Extension);//_Extensions.from(copy.subarray());
      return new EncryptedExtensions(...extensions)
   }

   constructor(...extensions) {
      super(0, 65535, ...extensions)
      this.extensions = extensions;
   }

   get handshake() {
      return HandshakeType.ENCRYPTED_EXTENSIONS.handshake(this);
   }

   get record() {
      return ContentType.HANDSHAKE.tlsPlaintext(this.handshake)
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

function parseExtension(extension) {
   const { extension_type, extension_data } = extension;
   switch (extension_type) {
      case ExtensionType.SUPPORTED_GROUPS: {
         extension.extension_data = NamedGroupList.from(extension_data); break;
      }
      case ExtensionType.KEY_SHARE: {
         extension.extension_data = KeyShareClientHello.from(extension_data); break;
      }
      case ExtensionType.SUPPORTED_VERSIONS: {
         extension.extension_data = SupportedVersions.fromClient_hello(extension_data); break;
      }
      case ExtensionType.SIGNATURE_ALGORITHMS: {
         extension.extension_data = Supported_signature_algorithms.from(extension_data); break;
      }
      case ExtensionType.SERVER_NAME: {
         extension.extension_data = extension_data.length ? ServerNameList.from(extension_data) : extension_data; break;
      }
      case ExtensionType.PSK_KEY_EXCHANGE_MODES: {
         extension.extension_data = PskKeyExchangeModes.from(extension_data); break;
      }
      case ExtensionType.COOKIE: {
         extension.extension_data = Cookie.from(extension_data); break;
      }
      case ExtensionType.RECORD_SIZE_LIMIT: {
         extension.extension_data = RecordSizeLimit.from(extension_data); break;
      }
      case ExtensionType.EARLY_DATA: {
         extension.extension_data = EarlyDataIndication.from(extension_data); break;
      }
      case ExtensionType.PADDING: {
         extension.extension_data = Padding.from(extension_data); break;
      }
      case ExtensionType.PRE_SHARED_KEY: {
         extension.extension_data = OfferedPsks.from(extension_data); break;
      }
      default:
         break;
   }
}

