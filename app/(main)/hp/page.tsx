import { notFound } from "next/navigation";

// Honeypot page - bot trap
// This page should return 404 and log access attempts
// In production, you would integrate with Supabase or another service to log these

export default function Honeypot() {
  // Always return 404 for honeypot
  notFound();
}

