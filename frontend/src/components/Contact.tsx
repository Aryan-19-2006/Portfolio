/**
 * Contact.tsx
 * ------------------------------------------------------------------
 * Renders the contact form and submits it to the FastAPI backend
 * (POST /api/contact/ — see backend/app/routers/contact.py).
 * On success the message is stored in PostgreSQL; email notification
 * is optional and off by default (see backend/.env.example).
 * ------------------------------------------------------------------
 */

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { api } from "../lib/api";
import { siteConfig } from "../config/siteConfig";

// Tracks what to show the user: form, sending spinner, success, or error.
type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  // Local form state — kept simple (no form library) since it's 3 fields.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // stop the browser's default full-page form submit
    setStatus("sending");

    try {
      const res = await api.submitContact({ name, email, message });
      if (!res.ok) throw new Error("Request failed");

      // Clear the form only after a confirmed successful save.
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="max-w-2xl mx-auto px-6 py-24">
      <p className="text-xs font-mono text-accent mb-3">CONTACT</p>
      <h2 className="font-display text-3xl font-semibold mb-3">Let's talk</h2>
      <p className="text-muted mb-8">
        Prefer email? Reach me directly at{" "}
        <a href={`mailto:${siteConfig.links.email}`} className="text-accent hover:underline">
          {siteConfig.links.email}
        </a>
        .
      </p>

      <motion.form
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your name"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent transition"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your email"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent transition"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          placeholder="Your message"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent transition resize-none"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>

        {/* Inline feedback — no popups/toasts, keeps it simple and accessible */}
        {status === "sent" && (
          <p className="text-sm text-accent">Thanks! I'll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-muted">
            Something went wrong. Is the backend running? Check{" "}
            <code className="font-mono">VITE_API_URL</code> in frontend/.env.
          </p>
        )}
      </motion.form>
    </section>
  );
}
