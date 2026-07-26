/**
 * Terminal.tsx
 * ------------------------------------------------------------------
 * The portfolio's signature feature (per spec). A modal overlay that
 * simulates a command-line: types a command, looks it up in the
 * `commands` map (terminalCommands.ts), and prints the returned lines.
 * `clear` is handled here directly (not in the commands map) because
 * it needs to reset this component's own `history` state.
 * Opened by FloatingDock's "Terminal" button; `open`/`onClose` are
 * controlled by App.tsx so only one Terminal instance ever exists.
 * ------------------------------------------------------------------
 */

import { useEffect, useRef, useState, FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { commands, CommandOutput } from "../lib/terminalCommands";

interface TerminalProps {
  open: boolean;
  onClose: () => void;
}

interface HistoryEntry {
  command: string;
  output: CommandOutput;
}

const PROMPT = "aryan@portfolio:~$";

export default function Terminal({ open, onClose }: TerminalProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { command: "", output: ["Type 'help' to see available commands."] },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function runCommand(raw: string) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const handler = commands[cmd];
    const output: CommandOutput = handler
      ? handler()
      : [`command not found: ${cmd}`, "Type 'help' for a list of commands."];

    setHistory((h) => [...h, { command: cmd, output }]);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    runCommand(input);
    setInput("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-xl border border-border bg-[#0d0d0f] shadow-2xl overflow-hidden font-mono text-sm"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-muted text-xs">portfolio-terminal</span>
              <button onClick={onClose} aria-label="Close terminal" className="text-muted hover:text-ink">
                <X size={14} />
              </button>
            </div>

            {/* Output */}
            <div className="h-80 overflow-y-auto px-4 py-3 space-y-2">
              {history.map((entry, i) => (
                <div key={i}>
                  {entry.command && (
                    <p className="text-ink">
                      <span className="text-accent">{PROMPT}</span> {entry.command}
                    </p>
                  )}
                  {entry.output.map((line, j) => (
                    <p key={j} className="text-muted whitespace-pre-wrap">
                      {line || "\u00A0"}
                    </p>
                  ))}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-border">
              <span className="text-accent shrink-0">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-ink placeholder:text-muted/60"
                placeholder="type a command…"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
