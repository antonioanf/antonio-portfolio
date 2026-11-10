import type { CSSProperties } from "react";
import { perfil } from "../data/perfil";
import { coresMarca, techIcons } from "./techIcons";
import { Container, Reveal, SectionHeader } from "./ui";

/** Marcações nas quinas do tile, estilo mira/terminal. */
const quinas = [
  "top-1.5 left-1.5 border-t border-l",
  "top-1.5 right-1.5 border-t border-r",
  "bottom-1.5 left-1.5 border-b border-l",
  "bottom-1.5 right-1.5 border-b border-r",
];

export default function Stack() {
  return (
    <section id="stack" className="border-t border-border py-16 md:py-20">
      <Container>
        <SectionHeader numero="02" rotulo="Stack" titulo="Criação" />

        <div className="relative max-w-3xl">
          <div aria-hidden className="bg-grid-tiles pointer-events-none absolute -inset-x-5 -inset-y-6 -z-10 md:-inset-10" />

          <Reveal y={8}>
            <p className="mb-4 font-mono text-xs text-muted">
              <span className="text-accent-2">&gt;</span> stack --frontend
              <span aria-hidden className="ml-1 inline-block h-3.5 w-[7px] translate-y-[2px] animate-blink bg-accent-2/70 motion-reduce:animate-none" />
            </p>
          </Reveal>

          <ul className="flex flex-wrap justify-center gap-3 md:flex-nowrap md:justify-start">
            {perfil.stack.map((it, i) => {
              const Icone = techIcons[it.icone];
              const cor = coresMarca[it.icone] ?? "var(--accent)";
              return (
                <li key={it.nome} className="w-[calc((100%-1.5rem)/3)] md:w-auto md:flex-1">
                  <Reveal delay={0.06 * i} y={10}>
                    <div
                      style={{ "--marca": cor } as CSSProperties}
                      className="group relative flex aspect-square flex-col items-center justify-center gap-3 rounded-lg border border-border bg-surface transition-all duration-300 hover:border-accent/60 hover:shadow-[0_0_24px_var(--glow)] md:aspect-[5/4]"
                    >
                      {quinas.map((q) => (
                        <span
                          key={q}
                          aria-hidden
                          className={`absolute size-2 border-border-strong transition-colors duration-300 group-hover:border-accent ${q}`}
                        />
                      ))}
                      <Icone
                        size={30}
                        aria-hidden
                        className="text-fg/75 transition-colors duration-300 group-hover:text-[var(--marca)] md:size-9"
                      />
                      <span className="px-1 text-center font-mono text-xs leading-tight text-muted transition-colors group-hover:text-fg">
                        {it.nome}
                      </span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
