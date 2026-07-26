/**
 * lib/api.ts
 * ------------------------------------------------------------------
 * The single place the frontend talks to the FastAPI backend.
 * Every component (Skills, Projects, Achievements, Contact) imports
 * `api` from here instead of calling fetch() directly — so if the
 * API's base URL or response shape ever changes, this is the only
 * file that needs updating.
 * These TypeScript interfaces (ApiProject, ApiAchievement, ...)
 * should always mirror backend/app/schemas.py's Pydantic models.
 * ------------------------------------------------------------------
 */

import { siteConfig } from "../config/siteConfig";

export interface ApiProject {
  id: number;
  title: string;
  description: string;
  features: string[];
  tech_stack: string[];
  github_link: string | null;
  live_demo_link: string | null;
  featured: boolean;
}

export interface ApiAchievement {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
}

export type ApiSkillsGrouped = Record<string, string[]>;

// Shared fetch wrapper: builds the full URL from siteConfig.apiUrl,
// and throws if the response isn't 2xx so calling code's .catch()
// (via useApiData) can show a real error instead of silently failing.
async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${siteConfig.apiUrl}${path}`);
  if (!res.ok) {
    throw new Error(`API error ${res.status} on ${path}`);
  }
  return res.json();
}

export const api = {
  getProjects: () => apiGet<ApiProject[]>("/api/projects/"),
  getAchievements: () => apiGet<ApiAchievement[]>("/api/achievements/"),
  getSkillsGrouped: () => apiGet<ApiSkillsGrouped>("/api/skills/grouped"),
  submitContact: (payload: { name: string; email: string; message: string }) =>
    fetch(`${siteConfig.apiUrl}/api/contact/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }),
};
