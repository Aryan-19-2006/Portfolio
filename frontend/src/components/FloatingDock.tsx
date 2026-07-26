/**
 * FloatingDock.tsx
 * ------------------------------------------------------------------
 * Fixed bottom-center navigation dock (Home, LinkedIn, GitHub,
 * LeetCode, Resume, Terminal). Five items are plain links pulled
 * from siteConfig; "Terminal" is the one item that isn't a link —
 * it calls the `onTerminalClick` prop passed down from App.tsx,
 * which flips the isTerminalOpen state that controls Terminal.tsx.
 * ------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { Home, Linkedin, Github, Code2, FileText, SquareTerminal } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

interface DockItem {
  label: string;
  icon: typeof Home;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}

interface FloatingDockProps {
  onTerminalClick: () => void;
}

export default function FloatingDock({ onTerminalClick }: FloatingDockProps) {
  const items: DockItem[] = [
    { label: "Home", icon: Home, href: "#home" },
    { label: "LinkedIn", icon: Linkedin, href: siteConfig.links.linkedin, external: true },
    { label: "GitHub", icon: Github, href: siteConfig.links.github, external: true },
    { label: "LeetCode", icon: Code2, href: siteConfig.links.leetcode, external: true },
    { label: "Resume", icon: FileText, href: siteConfig.links.resumeUrl },
    { label: "Terminal", icon: SquareTerminal, onClick: onTerminalClick },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
      aria-label="Quick navigation dock"
    >
      <div className="flex items-end gap-1 rounded-2xl border border-border bg-surface/80 backdrop-blur-md px-3 py-2 shadow-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <motion.div
              whileHover={{ y: -6, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group relative flex flex-col items-center justify-center w-10 h-10 rounded-xl hover:bg-surface2 cursor-pointer"
            >
              <Icon size={18} className="text-ink/80 group-hover:text-accent transition" />
              <span className="pointer-events-none absolute -top-8 opacity-0 group-hover:opacity-100 transition text-[11px] font-mono bg-surface2 border border-border px-2 py-0.5 rounded whitespace-nowrap">
                {item.label}
              </span>
            </motion.div>
          );

          if (item.onClick) {
            // Terminal is the only item that opens something in-page
            // rather than navigating — render it as a <button>, not <a>.
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                aria-label={item.label}
                type="button"
              >
                {content}
              </button>
            );
          }

          return (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              download={item.label === "Resume" ? true : undefined}
              aria-label={item.label}
            >
              {content}
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}
