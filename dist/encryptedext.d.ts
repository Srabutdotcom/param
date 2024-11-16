/**
 * https://datatracker.ietf.org/doc/html/rfc8446#section-4.3.1
 */
export class EncryptedExtensions {
    static fromExtensions(...extensions: any[]): EncryptedExtensions;
    static from(array: any): EncryptedExtensions;
    constructor(...extension: any[]);
}
