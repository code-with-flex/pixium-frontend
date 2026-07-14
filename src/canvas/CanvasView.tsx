"use client";

import { useEffect, useRef, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, PALETTE } from "./canvas.constants";
import { decodeCanvas } from "./decode-canvas";

type LoadState = "loading" | "ready" | "error";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

/**
 * Fetches the current canvas bitmap from the backend's `GET /canvas`
 * (raw `application/octet-stream`, bit-packed) and renders it to an
 * HTML5 Canvas. Read-only for now — no wallet connection or pixel
 * placement yet, that's a separate slice.
 */
export function CanvasView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    let cancelled = false;

    async function loadCanvas() {
      setState("loading");
      try {
        const response = await fetch(`${API_URL}/canvas`);
        if (!response.ok) {
          throw new Error(`GET /canvas failed: ${response.status}`);
        }

        const buffer = new Uint8Array(await response.arrayBuffer());
        const colors = decodeCanvas(buffer);

        if (cancelled) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const imageData = ctx.createImageData(CANVAS_WIDTH, CANVAS_HEIGHT);
        for (let i = 0; i < colors.length; i++) {
          const hex = PALETTE[colors[i]] ?? "#000000";
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          const offset = i * 4;
          imageData.data[offset] = r;
          imageData.data[offset + 1] = g;
          imageData.data[offset + 2] = b;
          imageData.data[offset + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);

        setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    }

    loadCanvas();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="max-w-full border border-zinc-300 dark:border-zinc-700"
        style={{ imageRendering: "pixelated", aspectRatio: "1 / 1" }}
      />
      {state === "loading" && (
        <p className="text-sm text-zinc-500">Loading canvas…</p>
      )}
      {state === "error" && (
        <p className="text-sm text-red-500">
          Couldn&apos;t load the canvas. Is the backend running at {API_URL}?
        </p>
      )}
    </div>
  );
}
