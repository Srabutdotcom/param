import { ExtensionType } from "jsr:@tls/enum";
import { HexaDecimal } from "../src/dep.ts";
import { EncryptedExtensions } from "../src/encrypted.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("EncryptedExtension", ()=>{
   const test = HexaDecimal.fromString(`08 00 00 28 00 26 00 0a 00 14 00
      12 00 1d 00 17 00 18 00 19 01 00 01 01 01 02 01 03 01 04 00 1c
      00 02 40 01 00 00 00 00 00 2a 00 00`).byte

   const back = EncryptedExtensions.fromHandshake(encryptedExtensionMsg).handshake;
   assertEquals(test.toString(), back.toString())
})

const encryptedExtensionMsg = HexaDecimal.fromString(`08 00 00 28 00 26 00 0a 00 14 00
         12 00 1d 00 17 00 18 00 19 01 00 01 01 01 02 01 03 01 04 00 1c
         00 02 40 01 00 00 00 00 00 2a 00 00`).byte

const back = EncryptedExtensions.fromHandshake(encryptedExtensionMsg).handshake;

const _n = null; 

