export function getId() {
  return globalThis.crypto.randomUUID();
}
