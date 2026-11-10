// Sealed box for SabiShield sign-up contact details.
// ECDH P-256 + HKDF-SHA256 + AES-GCM, sealing in the browser to an admin public
// key whose private half lives only on Michael's machine, never on any server.
// Mirrors app/scripts/sealed-box.mjs in the sabishield repo byte for byte: same
// HKDF salt, and the sign-up id bound in as HKDF info AND as AES-GCM additional
// data, so a sealed box cannot be moved onto another sign-up row.
//
// This file only seals. Opening happens offline with scripts/read-signups.mjs
// in the sabishield repo, holding the admin private key.

/** Public half of the sign-up admin key (safe to publish; sealing only). */
export const ADMIN_PUB = {
  kty: "EC",
  crv: "P-256",
  x: "28LSJvB1Y3SoA-kw3dyesvAL8C46h1YdQC_L2dsnFAQ",
  y: "EHj4rTFtr6nJvczj8tqGsfEh5aZ9n_sOf4et3y3-2E0",
} as const;

const P256 = { name: "ECDH", namedCurve: "P-256" } as const;
const enc = new TextEncoder();

function b64u(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** 22-char base64url sign-up id (128-bit), the shape the Worker's ID_RE expects. */
export function newSignupId(): string {
  return b64u(crypto.getRandomValues(new Uint8Array(16)));
}

export async function seal(id: string, contact: Record<string, string>): Promise<string> {
  const subtle = crypto.subtle;
  const eph = await subtle.generateKey(P256, true, ["deriveBits"]);
  const adminKey = await subtle.importKey("jwk", { ...ADMIN_PUB }, P256, false, []);
  const shared = new Uint8Array(await subtle.deriveBits({ name: "ECDH", public: adminKey }, eph.privateKey, 256));
  const base = await subtle.importKey("raw", shared, "HKDF", false, ["deriveKey"]);
  const key = await subtle.deriveKey(
    { name: "HKDF", hash: "SHA-256", salt: enc.encode("sabishield-signup-v1"), info: enc.encode(id) },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"],
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = new Uint8Array(
    await subtle.encrypt({ name: "AES-GCM", iv, additionalData: enc.encode(id) }, key, enc.encode(JSON.stringify(contact))),
  );
  const epk = await subtle.exportKey("jwk", eph.publicKey);
  return JSON.stringify({ v: 1, x: epk.x, y: epk.y, iv: b64u(iv), ct: b64u(ct) });
}
