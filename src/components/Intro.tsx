import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { perfil } from "../data/perfil";

const linhas = [
  { texto: "$ npm run build -- --portfolio", tipo: "cmd" },
  { texto: `▸ carregando perfil: ${perfil.usuario}`, tipo: "info" },
  { texto: "▸ compilando projetos [7/7]", tipo: "info" },
  { texto: "▸ otimizando stack: react · typescript · supabase", tipo: "info" },
  { texto: "✓ build concluído em 1.2s", tipo: "ok" },
] as const;

const CHAVE = "intro-vista";
const INTERVALO = 340;
const DURACAO = 2500;

export function introJaVista() {
  try {
    return sessionStorage.getItem(CHAVE) === "1";
  } catch {
    return false;
  }
}

export default function Intro({ onFim }: { onFim: () => void }) {
  const reduzir = useReducedMotion();
  const [visiveis, setVisiveis] = useState(0);
  const [aberta, setAberta] = useState(true);

  useEffect(() => {
    try {
      sessionStorage.setItem(CHAVE, "1");
    } catch {
      /* sem sessionStorage */
    }
    const fechar = () => setAberta(false);
    const timers = linhas.map((_, i) => window.setTimeout(() => setVisiveis(i + 1), 120 + i * INTERVALO));
    timers.push(window.setTimeout(fechar, reduzir ? 1400 : DURACAO - 500));
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    window.addEventListener("keydown", tecla);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", tecla);
    };
  }, [reduzir]);

  return (
    <AnimatePresence onExitComplete={onFim}>
      {aberta && (
        <m.div
          key="intro"
          role="dialog"
          aria-label="Carregando portfólio"
          onClick={() => setAberta(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg px-5"
          exit={{ opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <m.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ scale: 1.04 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="ml-3 font-mono text-[11px] text-muted">~/portfolio — zsh</span>
            </div>
            <div className="min-h-[180px] space-y-2 p-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]" aria-live="polite">
              {linhas.slice(0, visiveis).map((l) => (
                <m.p
                  key={l.texto}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={
                    l.tipo === "cmd" ? "text-fg" : l.tipo === "ok" ? "text-emerald-600 dark:text-emerald-400" : "text-muted"
                  }
                >
                  {l.texto}
                </m.p>
              ))}
              {visiveis < linhas.length && <span className="inline-block h-4 w-2 animate-blink bg-accent align-middle" />}
            </div>
          </m.div>
          <button
            type="button"
            onClick={() => setAberta(false)}
            className="absolute right-5 bottom-5 rounded-full border border-border px-4 py-2 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-fg"
          >
            pular →
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
