import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { perfil } from "../data/perfil";
import { Container, Reveal, SectionHeader } from "./ui";

export default function Processo() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progresso = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="processo" className="border-t border-border py-24 md:py-32">
      <Container>
        <SectionHeader
          numero="04"
          rotulo="Processo"
          titulo="Como um projeto sai da conversa e vai ao ar."
          descricao="Quatro etapas claras, para você saber exatamente o que esperar em cada momento."
        />

        <ol ref={ref} className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {/* linha base + preenchimento (horizontal no desktop, vertical no mobile) */}
          <span aria-hidden className="absolute top-5 left-5 hidden h-px w-[calc(100%-2.5rem)] bg-border md:block" />
          <m.span
            aria-hidden
            style={{ scaleX: progresso }}
            className="absolute top-5 left-5 hidden h-px w-[calc(100%-2.5rem)] origin-left bg-accent md:block"
          />
          <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-border md:hidden" />
          <m.span
            aria-hidden
            style={{ scaleY: progresso }}
            className="absolute top-5 bottom-5 left-5 w-px origin-top bg-accent md:hidden"
          />

          {perfil.processo.map((etapa, i) => (
            <li key={etapa.titulo} className="relative pl-16 md:pl-0">
              <Reveal delay={i * 0.08}>
                <span className="absolute top-0 left-0 grid size-10 place-items-center rounded-full border border-border-strong bg-bg font-mono text-xs text-accent-2 md:relative">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight md:mt-7">{etapa.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted md:pr-4">{etapa.texto}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
