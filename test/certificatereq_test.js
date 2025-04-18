import { CertificateRequest } from "../src/certificatereq.js";
import { assertEquals } from "jsr:@std/assert";

const test = Uint8Array.of(1, 1, 0, 6, 0, 13, 0, 2, 4, 3)
const back = CertificateRequest.from(test);
const exts = back.extensions

