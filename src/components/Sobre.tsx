import { Briefcase, Download, GraduationCap } from "lucide-react";
import { perfil } from "../data/perfil";
import { Botao, Container, Reveal, SectionHeader, trackGlow } from "./ui";

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

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <figure
              onMouseMove={trackGlow}
              className="glow-card group mx-auto max-w-sm rounded-2xl border border-border bg-surface p-2.5 lg:mx-0"
            >
              <div className="overflow-hidden rounded-xl bg-surface-2">
                <picture>
                  <source srcSet="/assets/MinhaFoto.webp" type="image/webp" />
                  <img
                    src={perfil.foto}
                    alt={`Foto de ${perfil.nome}`}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                </picture>
              </div>
              <figcaption className="flex items-center justify-between px-2 pt-3 pb-1 font-mono text-[11px] text-muted">
                <span>{perfil.usuario}.png</span>
                <span>{perfil.cidade}</span>
              </figcaption>
            </figure>
          </Reveal>

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

            <Reveal className="mt-14">
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
