import {
  Accessibility,
  Database,
  FileText,
  FlaskConical,
  KeyRound,
  LayoutDashboard,
  Palette,
  PenTool,
  Webhook,
} from "lucide-react";
import type { ComponentType } from "react";
import {
  SiCss,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGodotengine,
  SiHtml5,
  SiJavascript,
  SiPostgresql,
  SiReact,
  SiReactrouter,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import type { TechIcone } from "../data/perfil";

type Icone = ComponentType<{ size?: number | string; className?: string; "aria-hidden"?: boolean }>;

/** Chave (de perfil.ts) → componente de ícone. Marcas vêm do Simple Icons; o resto, do lucide. */
export const techIcons: Record<TechIcone, Icone> = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  vite: SiVite,
  supabase: SiSupabase,
  postgresql: SiPostgresql,
  git: SiGit,
  github: SiGithub,
  githubactions: SiGithubactions,
  vercel: SiVercel,
  framer: SiFramer,
  html: SiHtml5,
  css: SiCss, // SiCss3 não existe no react-icons 5.7
  godot: SiGodotengine,
  figma: SiFigma,
  reactrouter: SiReactrouter,
  sql: Database,
  api: Webhook,
  auth: KeyRound,
  testes: FlaskConical,
  docs: FileText,
  uiux: LayoutDashboard,
  design: Palette,
  identidade: PenTool,
  acessibilidade: Accessibility,
};
