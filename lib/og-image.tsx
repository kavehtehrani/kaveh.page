import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { OG_IMAGE_SIZE } from "@/data/constants";

/**
 * Shared Open Graph card renderer, styled after the site's terminal theme.
 * Used by every opengraph-image route so the cards stay consistent.
 */
export function renderOgImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d0d",
          padding: "72px",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#ff8800",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow ?? siteConfig.url.replace(/^https?:\/\//, "")}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 58 : 74,
            lineHeight: 1.15,
            color: "#f5efe7",
            fontWeight: 700,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 28,
            color: "#8a8078",
          }}
        >
          <div style={{ display: "flex", width: 14, height: 14, background: "#ff8800" }} />
          {siteConfig.author}
        </div>
      </div>
    ),
    OG_IMAGE_SIZE
  );
}
