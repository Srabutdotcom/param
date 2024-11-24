import { ExtensionType } from "@tls/enum";
import { CertificateRequest } from "../src/certificatereq.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("CertificateRequest", () => {
   const test = new CertificateRequest(new CertificateRequest.certificate_request_context(Uint8Array.of(1, 3, 5)),
      ExtensionType.SERVER_NAME.extension(Uint8Array.of(5, 8, 9)))
   const back = CertificateRequest.from(test);
   assertEquals(test, back)
})

