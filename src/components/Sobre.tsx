import { useInView, useReducedMotion } from "framer-motion";
import { Briefcase, Download, GraduationCap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { perfil } from "../data/perfil";
import { Botao, Container, Reveal, SectionHeader } from "./ui";

/** Conta de 0 até o número do início do texto (ex.: "8+", "3 anos") quando entra na tela. */
function Contador({ valor }: { valor: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref, { once: true, margin: "-40px" });
  const reduzir = useReducedMotion();
  const [, alvoTexto = "", resto = valor] = valor.match(/^(\d+)(.*)$/) ?? [];
  const alvo = Number(alvoTexto);
  const [atual, setAtual] = useState(reduzir || !alvoTexto ? alvo : 0);

  useEffect(() => {
    if (!visivel || reduzir || !alvoTexto) return;
    const inicio = performance.now();
    const duracao = 900;
    let id = 0;
    const passo = (agora: number) => {
      const t = Math.min((agora - inicio) / duracao, 1);
      setAtual(Math.round(alvo * (1 - Math.pow(1 - t, 3))));
      if (t < 1) id = requestAnimationFrame(passo);
    };
    id = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(id);
  }, [visivel, reduzir, alvo, alvoTexto]);

  if (!alvoTexto) return <span>{valor}</span>;
  return (
    <span ref={ref}>
      <span className="sr-only">{valor}</span>
      <span aria-hidden className="tabular-nums">
        {atual}
        {resto}
      </span>
    </span>
  );
}

export default function Sobre() {
  return (
    <section id="sobre" className="py-16 md:py-24">
      <Container>
        <SectionHeader
          numero="01"
          rotulo="Sobre"
          titulo={
            <>
              Código, design e <span className="text-muted">gente.</span>
            </>
          }
        />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal className="space-y-4 text-lg leading-relaxed text-muted">
              {perfil.sobre.map((p) => (
                <p key={p.slice(0, 20)} className="first:text-fg">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {perfil.numeros.map((n) => (
                  <div key={n.rotulo} className="flex flex-col-reverse justify-end rounded-xl border border-border bg-surface px-4 py-3.5 lg:px-3.5">
                    <dt className="mt-1 text-sm leading-snug text-muted">{n.rotulo}</dt>
                    <dd className="font-display text-2xl font-semibold tracking-tight whitespace-nowrap">
                      <Contador valor={n.valor} />
                    </dd>
                  </div>
                ))}
              </dl>
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
                      {t.local && <p className="mt-1 text-sm text-muted">{t.local}</p>}
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
