import { Byte } from "../src/dep.ts";
import { EncryptedExtensions } from "../src/encrypted.js";
import { assertEquals } from "jsr:@std/assert";

/* Deno.test("EncryptedExtension", ()=>{
   const test = Byte.fromHex(`08 00 00 28 00 26 00 0a 00 14 00
      12 00 1d 00 17 00 18 00 19 01 00 01 01 01 02 01 03 01 04 00 1c
      00 02 40 01 00 00 00 00 00 2a 00 00`)

   const back = EncryptedExtensions.fromHandshake(encryptedExtensionMsg).handshake;
   assertEquals(test.toString(), back.toString())
}) */

/* const encryptedExtensionMsg = Byte.fromHex(`08 00 00 28 00 26 00 0a 00 14 00
         12 00 1d 00 17 00 18 00 19 01 00 01 01 01 02 01 03 01 04 00 1c
         00 02 40 01 00 00 00 00 00 2a 00 00`)

const back = EncryptedExtensions.fromHandshake(encryptedExtensionMsg).handshake;

const test = Uint8Array.of(8,0,0,2,0,0);
const back_0 = EncryptedExtensions.fromHandshake(test);
const back_1 = EncryptedExtensions.from(test.subarray(4)) */

const test_1 = Byte.fromHex(`00 26 00 0a 00 14 00
      12 00 1d 00 17 00 18 00 19 01 00 01 01 01 02 01 03 01 04 00 1c
      00 02 40 01 00 00 00 00 00 2a 00 00`)
const back_1 = EncryptedExtensions.from(test_1)

const _n = null; 

