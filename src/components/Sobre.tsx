import { Briefcase, Download, GraduationCap } from "lucide-react";
import { perfil } from "../data/perfil";
import { Botao, Container, Reveal, SectionHeader } from "./ui";

export default function Sobre() {
  return (
    <section id="sobre" className="py-24 md:py-32">
      <Container>
        <SectionHeader
          numero="01"
          rotulo="Sobre"
          titulo={
            <>
              Código, design e <span className="text-muted">gente</span> no mesmo lugar.
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
              {perfil.sobre.map((p) => (
                <p key={p.slice(0, 20)} className="first:text-fg">
                  {p}
                </p>
              ))}
            </Reveal>

            {perfil.curriculo && (
              <Reveal className="mt-8">
                <Botao href={perfil.curriculo} download variante="secundario">
                  <Download size={16} /> Baixar currículo
                </Botao>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal>
              <h3 className="mb-6 font-mono text-xs tracking-widest text-muted uppercase">Trajetória</h3>
              <ol className="relative border-l border-border">
                {perfil.trajetoria.map((t, i) => {
                  const Icone = t.tipo === "trabalho" ? Briefcase : GraduationCap;
                  return (
                    <li key={t.titulo} className="group relative pb-8 pl-8 last:pb-0">
                      <span
                        className={`absolute top-1 -left-[5px] size-[9px] rounded-full border-2 border-bg ${
                          i === 0 ? "bg-accent ring-4 ring-accent-soft" : "bg-border-strong group-hover:bg-accent"
                        } transition-colors`}
                      />
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                        <p className="flex items-center gap-2 font-display text-lg font-medium tracking-tight">
                          <Icone size={15} className="shrink-0 text-muted" aria-hidden />
                          {t.titulo}
                        </p>
                        <span className="shrink-0 font-mono text-xs text-muted">
                          {t.periodo}
                          {t.detalhe && <span className="text-accent-2"> · {t.detalhe}</span>}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted">{t.local}</p>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
