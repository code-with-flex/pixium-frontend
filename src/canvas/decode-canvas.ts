import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./canvas.constants";

/**
 * Decodes the raw canvas byte array (as returned by the backend's
 * `GET /canvas`) into one color index per pixel.
 *
 * Mirrors the packing the indexer writes with Redis `BITFIELD SET
 * u4 <offset> <color>` (`pixium-indexer/src/canvas/canvas-cache.service.ts`):
 * pixel `i` (where `i = y * CANVAS_WIDTH + x`) lives at bit offset
 * `i * COLOR_BITS`. Since `COLOR_BITS` is 4, each byte holds two
 * pixels — bit-string semantics number bits MSB-first, so the even
 * pixel is the high nibble and the odd pixel is the low nibble.
 */
export function decodeCanvas(bytes: Uint8Array): Uint8Array {
  const pixelCount = CANVAS_WIDTH * CANVAS_HEIGHT;
  const colors = new Uint8Array(pixelCount);

  for (let i = 0; i < pixelCount; i++) {
    const byte = bytes[Math.floor(i / 2)] ?? 0;
    colors[i] = i % 2 === 0 ? (byte >> 4) & 0x0f : byte & 0x0f;
  }

  return colors;
}
