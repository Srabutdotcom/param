import {
   Cipher,
   Constrained,
   Extension,
   ExtensionType,
   KeyShareServerHello,
   Struct,
   SupportedVersions,
   Uint16,
   Uint8,
   Version,
} from "../src/dep.ts";

/**
 * Represents a ServerHello message in TLS.
 */
export class ServerHello extends Struct {
   /**
    * Legacy protocol version.
    */
   legacy_version: Version;

   /**
    * Random bytes used in the handshake.
    */
   random: Uint8Array;

   /**
    * Echoed legacy session ID.
    */
   legacy_session_id_echo: Legacy_session_id;

   /**
    * Selected cipher suite.
    */
   cipher_suite: Cipher;

   /**
    * Legacy compression method (always 0).
    */
   legacy_compression_method: Uint8;

   /**
    * TLS extensions included in the ServerHello message.
    */
   extensions: Extension[];

   /**
    * Creates a ServerHello instance from a Uint8Array.
    * @param {Uint8Array} array - The byte array representing the ServerHello message.
    * @returns {ServerHello} - A new ServerHello instance.
    */
   static from(array: Uint8Array): ServerHello;

   /**
    * Constructs a new ServerHello message.
    * @param {Uint8Array} [random] - Random bytes (default: 32 random bytes).
    * @param {Legacy_session_id} legacy_session_id_echo - Echoed legacy session ID.
    * @param {Cipher} cipher_suite - Selected cipher suite.
    * @param {...Extension} extensions - List of extensions.
    */
   constructor(
      random?: Uint8Array,
      legacy_session_id_echo?: Legacy_session_id,
      cipher_suite?: Cipher,
      ...extensions: Extension[]
   );
}

/**
 * Represents extensions in a ServerHello message.
 */
declare class Extensions extends Constrained {
   /**
    * List of extensions in the ServerHello message.
    */
   extensions: Extension[];

   /**
    * Creates an Extensions instance from a list of Extension objects.
    * @param {...Extension} extensions - The list of extensions.
    * @returns {Extensions} - A new Extensions instance.
    */
   static fromExtension(...extensions: Extension[]): Extensions;

   /**
    * Creates an Extensions instance from a Uint8Array.
    * @param {Uint8Array} array - The byte array containing the extensions.
    * @returns {Extensions} - A new Extensions instance.
    */
   static from(array: Uint8Array): Extensions;

   /**
    * Constructs a new Extensions instance.
    * @param {...Extension} extensions - The list of extensions.
    */
   constructor(...extensions: Extension[]);
}

/**
 * Represents the legacy session ID echoed in a ServerHello message.
 */
declare class Legacy_session_id extends Constrained {
   /**
    * Opaque session ID data.
    */
   opaque: Uint8Array;

   /**
    * Creates a Legacy_session_id instance from a Uint8Array.
    * @param {Uint8Array} array - The byte array containing the session ID.
    * @returns {Legacy_session_id} - A new Legacy_session_id instance.
    */
   static from(array: Uint8Array): Legacy_session_id;

   /**
    * Constructs a new Legacy_session_id instance.
    * @param {Uint8Array} [opaque] - The opaque session ID data (default: empty).
    */
   constructor(opaque?: Uint8Array);
}

/**
 * Parses an extension in the ServerHello message.
 * @param {Extension} extension - The extension to parse.
 */
declare function parseExtension(extension: Extension): void;
