import { perfil } from "../../data/perfil";
import { Container, Reveal, SectionHeader } from "../ui";
import ProjetoCard from "./ProjetoCard";
import ProjetoDestaque from "./ProjetoDestaque";

export default function Projetos() {
  const destaques = perfil.projetosDestaque.filter((p) => p.exibir);
  const academicos = perfil.projetosAcademicos.filter((p) => p.exibir);

  return (
    <section id="projetos" className="border-t border-border py-24 md:py-32">
      <Container>
        <SectionHeader
          numero="03"
          rotulo="Projetos"
          titulo="Trabalhos selecionados."
          descricao="Projetos profissionais, em equipe e acadêmicos: do estágio aos primeiros sistemas da faculdade."
        />

        <div className="space-y-6 md:space-y-8">
          {destaques.map((p, i) => (
            <ProjetoDestaque key={p.id} projeto={p} indice={i} />
          ))}
        </div>

        {academicos.length > 0 && (
          <>
            <Reveal className="mt-24 mb-8 flex items-end justify-between gap-6 border-b border-border pb-5">
              <h3 className="font-display text-2xl font-semibold tracking-tight">Projetos acadêmicos</h3>
              <span className="font-mono text-xs text-muted">{String(academicos.length).padStart(2, "0")} projetos</span>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {academicos.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06} className="h-full">
                  <ProjetoCard projeto={p} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
