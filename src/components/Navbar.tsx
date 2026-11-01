import { AnimatePresence, m } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { navegacao, perfil } from "../data/perfil";
import type { Tema } from "../hooks/useTheme";

export default function Navbar({ tema, alternarTema }: { tema: Tema; alternarTema: () => void }) {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [ativa, setAtiva] = useState("");

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca o link da seção visível
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setAtiva(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    // "topo" (hero) também é observado para limpar o destaque ao voltar ao início
    const observar = () =>
      ["topo", ...navegacao.map((n) => n.id)].forEach((id) => {
        const el = document.getElementById(id);
        if (el) obs.observe(el);
      });
    observar();
    window.addEventListener("secoes-prontas", observar);
    return () => {
      obs.disconnect();
      window.removeEventListener("secoes-prontas", observar);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        aberto ? "border-border bg-bg" : rolou ? "border-border bg-bg/80 backdrop-blur-xl" : "border-transparent"
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#topo" className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-md border border-border-strong bg-surface font-mono text-xs font-medium text-fg">
            {perfil.iniciais}
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">{perfil.nome}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navegacao.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={ativa === n.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  ativa === n.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {n.rotulo}
                <span
                  aria-hidden
                  className={`absolute inset-x-3.5 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                    ativa === n.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={alternarTema}
            aria-label={tema === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            className="grid size-9 place-items-center rounded-full border border-border text-muted transition-colors hover:border-border-strong hover:text-fg"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={tema}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {tema === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </m.span>
            </AnimatePresence>
          </button>
          <a
            href="#contato"
            className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-white sm:inline-flex"
          >
            Vamos conversar
          </a>
          <button
            type="button"
            onClick={() => setAberto((a) => !a)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="relative grid size-9 place-items-center rounded-full border border-border md:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${aberto ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              className={`absolute h-px w-4 bg-fg transition-transform duration-300 ${aberto ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {aberto && (
          <m.div
            id="menu-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="flex flex-col px-5 pt-4">
              {navegacao.map((n, i) => (
                <m.li
                  key={n.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={`#${n.id}`}
                    onClick={() => setAberto(false)}
                    className="flex items-baseline gap-4 border-b border-border py-4 font-display text-3xl font-medium tracking-tight"
                  >
                    <span className="font-mono text-xs text-accent-2">0{i + 1}</span>
                    {n.rotulo}
                  </a>
                </m.li>
              ))}
            </ul>
            <div className="px-5 pt-8">
              <a
                href="#contato"
                onClick={() => setAberto(false)}
                className="inline-flex rounded-full bg-fg px-5 py-3 text-sm font-medium text-bg"
              >
                Vamos conversar
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
