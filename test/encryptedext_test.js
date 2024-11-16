import { ExtensionType } from "@tls/enum";
import { EncryptedExtensions } from "../src/encryptedext.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("EncryptedExtension", ()=>{
   const test = EncryptedExtensions.fromExtensions(ExtensionType.KEY_SHARE.extension(Uint8Array.of(1,4,6)));
   const back = EncryptedExtensions.from(test)
   assertEquals(test, back)
})

