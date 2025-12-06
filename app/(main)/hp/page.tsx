import { notFound } from "next/navigation";
import { headers } from "next/headers";

// Honeypot page - bot trap
// This page should return 404 and log access attempts

async function logHoneypotAccess() {
  try {
    const headersList = await headers();
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : headersList.get("x-real-ip") || "unknown";
    const userAgent = headersList.get("user-agent") || "Unknown";
    const host = headersList.get("host") || "unknown";
    const protocol = headersList.get("x-forwarded-proto") || "https";
    const timestamp = new Date().toISOString();
    const fullPath = `${protocol}://${host}/hp`;

    // Only log in production if Supabase is configured
    if (
      process.env.NODE_ENV === "production" &&
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );

      await supabase.from("honeypot_logs").insert([
        {
          timestamp,
          ip,
          user_agent: userAgent,
          path: fullPath,
          host,
        },
      ]);
    }
  } catch (error) {
    // Silently fail - don't expose honeypot
    console.error("Honeypot logging error:", error);
  }
}

export default async function Honeypot() {
  // Log access attempt
  await logHoneypotAccess();
  // Always return 404 for honeypot
  notFound();
}
