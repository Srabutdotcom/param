import { ExtensionType } from "jsr:@tls/enum";
import { EncryptedExtensions } from "../src/encryptedext.js";
import { assertEquals } from "jsr:@std/assert";
import { Extension } from "../src/dep.js";

Deno.test("EncryptedExtension", ()=>{
   //@type {Extension} extension - description
   const extension = ExtensionType.KEY_SHARE.extension(Uint8Array.of(1,4,6))
   const test = EncryptedExtensions.fromExtensions(extension);
   const back = EncryptedExtensions.from(test)
   assertEquals(test, back)
})

