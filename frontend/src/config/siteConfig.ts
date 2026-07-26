/**
 * siteConfig.ts
 * ------------------------------------------------------------------
 * EVERY personal detail used across the portfolio lives here.
 * Fill these in once — every component imports from this file.
 * Nothing sensitive (no API keys) belongs here; those go in .env
 * (see frontend/.env.example and backend/.env.example).
 * ------------------------------------------------------------------
 */

export const siteConfig = {
  // ---- Identity -----------------------------------------------------
  name: "Aryan Gupta", // TODO: confirm/replace name
  role: ["B.Tech CSE Student", "Full Stack Developer", "AI/ML Enthusiast"],

  // ---- API -------------------------------------------------------------
  // Comes from .env — do not hardcode a different value here.
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",

  // ---- Links (fill these in) -----------------------------------------
  links: {
    github: "https://github.com/Aryan-19-2006", // TODO
    linkedin: "https://www.linkedin.com/in/aryan-gupta-726395328/", // TODO
    leetcode: "https://leetcode.com/u/AryanG06/", // TODO
    email: "aryangupta20061@gmail.com", // TODO
    // Put resume.pdf inside frontend/public/ and keep this filename in sync
    resumeUrl: "/resume.pdf", // TODO: add your resume file to public/resume.pdf
  },

  // ---- Photo -------------------------------------------------------------
  // Place your photo at frontend/public/profile.jpg (or update this path)
  profileImage: "/profile.jpg", // TODO: add your photo to public/

  // ---- Education ------------------------------------------------------------
  education: {
    institution: "Shri Ramswaroop Memorial College of Engineering & Management (SRMCEM)",
    degree: "Bachelor of Technology",
    branch: "Computer Science & Engineering",
  },
};
