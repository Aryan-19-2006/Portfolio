/**
 * lib/terminalCommands.ts
 * ------------------------------------------------------------------
 * Every command the Terminal understands, kept separate from the
 * Terminal's UI code so the command list can grow without touching
 * rendering logic. Each handler returns an array of strings — one
 * per line of output. `resume`, `leetcode`, and `github` additionally
 * open a new tab as a side effect, then return a short confirmation line.
 * To add a new command: add a key here, then mention it in `helpText`.
 * ------------------------------------------------------------------
 */

import { siteConfig } from "../config/siteConfig";

export type CommandOutput = string[];

const helpText: CommandOutput = [
  "Available commands:",
  "",
  "  help          show this list",
  "  about         who I am",
  "  skills        technologies I work with",
  "  projects      list of projects",
  "  education     my academic background",
  "  achievements  certificates & milestones",
  "  contact       how to reach me",
  "  resume        download my resume",
  "  whoami        one-line summary",
  "  hireme        why you should hire me",
  "  careersync    details on the CareerSync project",
  "  crisismatch   details on the CrisisMatch project",
  "  leetcode      link to my LeetCode profile",
  "  github        link to my GitHub profile",
  "  clear         clear the terminal",
];

export const commands: Record<string, () => CommandOutput> = {
  help: () => helpText,

  about: () => [
    `${siteConfig.name} — ${siteConfig.role.join(" · ")}.`,
    `Studying ${siteConfig.education.degree} in ${siteConfig.education.branch} at ${siteConfig.education.institution}.`,
    "Focused on full-stack engineering, backend systems, and applied AI/ML.",
  ],

  skills: () => [
    "Languages:  C++, Python, JavaScript, TypeScript, SQL",
    "Frontend:   React, HTML, CSS, Tailwind",
    "Backend:    FastAPI, Django",
    "Database:   PostgreSQL, MySQL",
    "Tools:      Git, GitHub, VS Code",
  ],

  projects: () => [
    "1. CareerSync   — full-stack job portal (Django, MySQL)",
    "2. CrisisMatch  — real-time crisis-response platform (Next.js, Node.js, Firebase)",
    "",
    "Type 'careersync' or 'crisismatch' for details.",
  ],

  education: () => [
    siteConfig.education.institution,
    `${siteConfig.education.degree} — ${siteConfig.education.branch}`,
  ],

  achievements: () => [
    "• 100+ LeetCode problems solved",
    "• HackerRank SQL Certificate",
    "• Simplilearn Excel Certificate",
    "• Python Training Certificate",
  ],

  contact: () => [
    `Email:     ${siteConfig.links.email}`,
    `LinkedIn:  ${siteConfig.links.linkedin}`,
    `GitHub:    ${siteConfig.links.github}`,
  ],

  resume: () => {
    window.open(siteConfig.links.resumeUrl, "_blank");
    return ["Opening resume…"];
  },

  whoami: () => [`${siteConfig.name.toLowerCase().replace(" ", "_")} — full-stack developer, problem solver.`],

  hireme: () => [
    "I ship complete, working systems — not just UI mockups.",
    "Comfortable across the stack: schema design, APIs, and interfaces.",
    "I care about correctness as much as polish.",
    `Reach out: ${siteConfig.links.email}`,
  ],

  careersync: () => [
    "CareerSync — career guidance & job portal",
    "Features: Authentication, Resume Upload, Job Listings, Dashboard, Profile Management",
    "Stack: Django, MySQL, HTML, CSS, JavaScript",
    `Repo: ${siteConfig.links.github}`,
  ],

  crisismatch: () => [
    "CrisisMatch — real-time crisis response platform",
    "Connects people in crisis with nearby verified volunteers.",
    "Stack: Next.js, Node.js, Socket.io, Firebase, GPT-4o, Twilio",
    `Repo: ${siteConfig.links.github}`,
  ],

  leetcode: () => {
    window.open(siteConfig.links.leetcode, "_blank");
    return [siteConfig.links.leetcode];
  },

  github: () => {
    window.open(siteConfig.links.github, "_blank");
    return [siteConfig.links.github];
  },
};
