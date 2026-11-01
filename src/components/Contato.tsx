import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { canaisAtivos, perfil, type CanalId } from "../data/perfil";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from "./icons";
import { Container, Reveal } from "./ui";

export const iconesCanal: Record<CanalId, ComponentType<{ width?: number; height?: number }>> = {
  whatsapp: WhatsappIcon,
  email: (p) => <Mail {...p} aria-hidden />,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};

function CopiarEmail() {
  const [copiado, setCopiado] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(perfil.contato.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = perfil.contato.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopiado(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copiar}
      className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copiado ? "ok" : "copiar"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="inline-flex items-center gap-2"
        >
          {copiado ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          {copiado ? "Copiado!" : "Copiar e-mail"}
        </m.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copiado ? "E-mail copiado para a área de transferência" : ""}
      </span>
    </button>
  );
}

export default function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />
      <Container>
        <Reveal>
          <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest text-muted uppercase">
            <span className="text-accent-2">05</span>
            <span aria-hidden className="h-px w-8 bg-border-strong" />
            Contato
          </p>
          <h2 className="max-w-4xl font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-6xl md:text-7xl">
            {perfil.contato.titulo} <span className="text-gradient">{perfil.contato.destaque}</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CopiarEmail />
          </div>
        </Reveal>

        <ul className="mt-16 border-t border-border">
          {canaisAtivos.map((c, i) => {
            const Icone = iconesCanal[c.id];
            const externo = !c.href.startsWith("mailto:");
            return (
              <li key={c.id}>
                <Reveal delay={i * 0.05}>
                  <a
                    href={c.href}
                    {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 border-b border-border py-6 transition-colors hover:bg-surface/60 md:gap-8 md:px-2 md:py-8"
                  >
                    <span className="w-6 font-mono text-xs text-muted">0{i + 1}</span>
                    <span className="hidden w-32 items-center gap-2.5 text-sm text-muted sm:flex">
                      <Icone width={16} height={16} />
                      {c.rotulo}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[11px] text-muted sm:hidden">{c.rotulo}</span>
                      <span className="block truncate font-display text-lg font-medium tracking-tight transition-colors group-hover:text-accent-2 sm:text-2xl md:text-3xl">
                        {c.valor}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-2 md:size-7"
                    />
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
