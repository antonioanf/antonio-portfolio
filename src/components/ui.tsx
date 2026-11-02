import { m, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduzir = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduzir ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </m.div>
  );
}

export function SectionHeader({
  numero,
  rotulo,
  titulo,
  descricao,
}: {
  numero: string;
  rotulo: string;
  titulo: ReactNode;
  descricao?: ReactNode;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
        <span className="text-accent-2">{numero}</span>
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        {rotulo}
      </p>
      <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {titulo}
      </h2>
      {descricao && <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{descricao}</p>}
    </Reveal>
  );
}

/** Atualiza --mx/--my para o brilho que segue o mouse (.glow-card). */
export function trackGlow(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function GlowCard({ className = "", children, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      onMouseMove={trackGlow}
      className={`glow-card rounded-2xl border border-border bg-surface transition-colors duration-300 hover:border-border-strong ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Chip({ children, compacto = false }: { children: ReactNode; compacto?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-surface-2 font-mono leading-none text-muted ${
        compacto ? "px-1.5 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      }`}
    >
      {children}
    </span>
  );
}

type BotaoProps = ComponentPropsWithoutRef<"a"> & { variante?: "primario" | "secundario" };

export function Botao({ variante = "primario", className = "", children, ...rest }: BotaoProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300";
  const estilos =
    variante === "primario"
      ? "bg-fg text-bg hover:bg-accent hover:text-white"
      : "border border-border-strong text-fg hover:border-accent hover:text-accent-2";
  return (
    <a className={`${base} ${estilos} ${className}`} {...rest}>
      {children}
    </a>
  );
}
