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


export function parseItems(copy, start, lengthOf, Fn, option = {}) {
   if (start + lengthOf > copy.length) {
      throw new RangeError("Specified length exceeds available data.");
   }
   const { parser= null, store= new Set(), storeset = (store, data)=>{store.set(data.key, data.value)} } = option
   if (!(store instanceof Set || store instanceof Map || store instanceof Array)) {
      throw new TypeError("store must be an instance of Set, Map, or Array.");
   }

   let offset = start;
   while ((offset < lengthOf + start) && (offset < copy.length)) {
      const item = Fn.from(copy.subarray(offset)); offset += item.length;
      if (parser) parser(item)
      if (store instanceof Set) store.add(item);
      else if (store instanceof Map) storeset(store, item);
      else store.push(item)
   }
   return store
}