import { Database, Layout, Palette, Rocket, type LucideIcon } from "lucide-react";
import { perfil, type IconeStack } from "../data/perfil";
import { Chip, Container, GlowCard, Reveal, SectionHeader } from "./ui";

const icones: Record<IconeStack, LucideIcon> = {
  frontend: Layout,
  backend: Database,
  deploy: Rocket,
  design: Palette,
};

export default function Stack() {
  return (
    <section id="stack" className="border-t border-border py-24 md:py-32">
      <Container>
        <SectionHeader
          numero="02"
          rotulo="Stack"
          titulo="Ferramentas que uso para tirar ideias do papel."
          descricao="Do layout ao deploy: um conjunto enxuto de tecnologias que domino e sigo aprofundando."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {perfil.stack.map((g, i) => {
            const Icone = icones[g.icone];
            return (
              <Reveal key={g.titulo} delay={i * 0.06}>
                <GlowCard className="h-full p-6 md:p-8">
                  <div className="flex items-start justify-between">
                    <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent-2">
                      <Icone size={20} aria-hidden />
                    </span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">{g.titulo}</h3>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {g.itens.map((it) => (
                      <li key={it}>
                        <Chip>{it}</Chip>
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
