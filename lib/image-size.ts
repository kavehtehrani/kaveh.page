import fs from "fs";
import path from "path";

export interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * Reads intrinsic pixel dimensions straight from an image file header.
 *
 * Deliberately dependency-free: every image referenced from the MDX corpus is a
 * local PNG or JPEG, and both encode their dimensions in a fixed, trivially
 * parsed header. Adding an image-metadata package for two formats would be more
 * supply-chain surface than the problem warrants.
 */
export function readImageDimensions(
  absolutePath: string
): ImageDimensions | null {
  let buffer: Buffer;
  try {
    // 64KB is far past the SOF marker in any normal JPEG.
    const fd = fs.openSync(absolutePath, "r");
    buffer = Buffer.alloc(65536);
    const bytesRead = fs.readSync(fd, buffer, 0, 65536, 0);
    fs.closeSync(fd);
    buffer = buffer.subarray(0, bytesRead);
  } catch {
    return null;
  }

  return readPng(buffer) ?? readJpeg(buffer);
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function readPng(buffer: Buffer): ImageDimensions | null {
  if (buffer.length < 24) return null;
  if (!buffer.subarray(0, 8).equals(PNG_SIGNATURE)) return null;
  // Bytes 8-15 are the IHDR chunk length and type; width/height follow.
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpeg(buffer: Buffer): ImageDimensions | null {
  if (buffer.length < 4) return null;
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

  let offset = 2;
  while (offset < buffer.length - 9) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];

    // Start Of Frame markers carry the dimensions. C4 (Huffman table),
    // C8 (JPG extension) and CC (arithmetic coding) are not SOF.
    const isSof =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);

    if (isSof) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    // Standalone markers carry no payload.
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    const segmentLength = buffer.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }

  return null;
}

/** Cache so a shared image is only read once per build. */
const dimensionCache = new Map<string, ImageDimensions | null>();

/**
 * Resolves dimensions for a site-relative image path (e.g. "/static/images/x.png").
 * Returns null for remote URLs and for files that do not exist.
 */
export function dimensionsForPublicPath(src: string): ImageDimensions | null {
  if (!src.startsWith("/")) return null;

  const cached = dimensionCache.get(src);
  if (cached !== undefined) return cached;

  const absolute = path.join(process.cwd(), "public", src);
  const dimensions = readImageDimensions(absolute);
  if (!dimensions) {
    console.warn(`Warning: could not read image dimensions for ${src}`);
  }
  dimensionCache.set(src, dimensions);
  return dimensions;
}
