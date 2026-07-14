/**
 * Mirrors constants defined in the onchain contract
 * (`pixium-onchain/contracts/pixium/src/types.rs`: `CANVAS_WIDTH`,
 * `CANVAS_HEIGHT`, `PALETTE_SIZE`) and the indexer/backend's own copies
 * of the same constants. There's no shared source of truth across
 * repos, so these must be kept in sync by hand if the contract's canvas
 * dimensions or palette size ever change.
 */
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 1000;
export const PALETTE_SIZE = 16;

/** Bits needed to represent a color index (log2(PALETTE_SIZE)). */
export const COLOR_BITS = Math.ceil(Math.log2(PALETTE_SIZE));

/**
 * The 16-color palette, indexed by the color values stored on-chain and
 * packed into the canvas byte array.
 *
 * No palette is defined anywhere else in the project yet (the contract
 * only fixes `PALETTE_SIZE = 16`, not the actual colors) — this is
 * DawnBringer 16 (DB16), a well-known 16-color palette designed for
 * pixel art. First pass, flagged as provisional; swap this out if the
 * maintainer wants different colors before this ships.
 */
export const PALETTE: readonly string[] = [
  "#140c1c",
  "#442434",
  "#30346d",
  "#4e4a4e",
  "#854c30",
  "#346524",
  "#d04648",
  "#757161",
  "#597dce",
  "#d27d2c",
  "#8595a1",
  "#6daa2c",
  "#d2aa99",
  "#6dc2ca",
  "#dad45e",
  "#deeed6",
];
