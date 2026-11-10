import { m } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useId, useState } from "react";
import type { ProjetoDestaque as TProjeto } from "../../data/perfil";
import { GithubIcon } from "../icons";
import { Chip, GlowCard, Reveal } from "../ui";
import { BrowserFrame, ImagemProjeto } from "./Mockup";

/** "Sistema Grupo Klér Carvalho" → "sistema-grupo-kler-carvalho" */
function slug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function Status({ status }: { status: TProjeto["status"] }) {
  if (status === "andamento")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent-soft px-2.5 py-1 font-mono text-[11px] text-accent-2">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-2 opacity-70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent-2" />
        </span>
        Em andamento
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-muted">
      <Check size={12} aria-hidden /> Concluído
    </span>
  );
}

const classeBotaoPrincipal =
  "group/btn inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-white";
const classeSeta = "transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5";

export default function ProjetoDestaque({ projeto, indice }: { projeto: TProjeto; indice: number }) {
  const exemplos = projeto.exemplos ?? [];
  const invertido = indice % 2 === 1;
  const [aberto, setAberto] = useState(false);
  const idDetalhes = useId();
  // Com capturas dos exemplos, o mockup mostra as telas lado a lado em vez da imagem única.
  const telasExemplos = exemplos.some((ex) => ex.imagem);
  const host = telasExemplos
    ? "convites"
    : projeto.linkSite
      ? projeto.linkSite.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : slug(projeto.titulo);

  return (
    <Reveal>
      <GlowCard className="group overflow-hidden p-3 md:p-4">
        <article className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div className={invertido ? "lg:order-2" : ""}>
            {telasExemplos ? (
              // Um pouco mais alto no mobile para as duas telas não ficarem minúsculas.
              <BrowserFrame url={host} proporcao="aspect-[4/3] sm:aspect-video">
                <div
                  className="absolute inset-0 flex items-stretch justify-center gap-[7%] bg-surface-2 px-[4%] pt-[4%] pb-[3%]"
                  style={{ backgroundImage: `radial-gradient(70% 90% at 50% 50%, ${projeto.cor}38, transparent 70%)` }}
                >
                  {exemplos.map((ex) => (
                    <figure key={ex.href} className="flex min-w-0 flex-col items-center gap-2">
                      <a
                        href={ex.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir o convite ${ex.rotulo} em nova aba`}
                        className="block aspect-[311/590] min-h-0 flex-1 overflow-hidden rounded-lg border border-border-strong shadow-2xl shadow-black/40 transition duration-300 ease-out hover:scale-[1.02] hover:ring-2 hover:ring-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                      >
                        <ImagemProjeto src={ex.imagem ?? ""} titulo={`${projeto.titulo} (${ex.rotulo})`} cor={projeto.cor} posicao="object-top" />
                      </a>
                      <figcaption className="text-center font-mono text-xs leading-tight text-muted">{ex.rotulo}</figcaption>
                    </figure>
                  ))}
                </div>
              </BrowserFrame>
            ) : (
              <BrowserFrame url={host} proporcao="aspect-video">
                <ImagemProjeto src={projeto.imagem} titulo={projeto.titulo} cor={projeto.cor} formato={projeto.formato} posicao="object-left-top" />
              </BrowserFrame>
            )}
          </div>

          <div className={`px-3 pb-4 lg:px-4 lg:py-6 ${invertido ? "lg:order-1" : ""}`}>
            <Status status={projeto.status} />
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
              <span className="text-accent-2">0{indice + 1}</span>
              <span>{projeto.categoria}</span>
              <span aria-hidden>·</span>
              <span>{projeto.contexto}</span>
              <span aria-hidden>·</span>
              <span>{projeto.ano}</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">{projeto.titulo}</h3>
            <p className={`mt-4 leading-relaxed text-muted ${aberto ? "" : "line-clamp-3 lg:line-clamp-none"}`}>{projeto.descricao}</p>

            <button
              type="button"
              onClick={() => setAberto((a) => !a)}
              aria-expanded={aberto}
              aria-controls={idDetalhes}
              className="mt-3 font-mono text-sm text-accent-2 transition-colors hover:text-accent lg:hidden"
            >
              {aberto ? "Ver menos ↑" : "Veja mais ↓"}
            </button>

            {/* No mobile anima a altura; no lg+ as classes com "!" vencem o estilo inline e tudo fica sempre visível. */}
            <m.div
              id={idDetalhes}
              initial={false}
              animate={
                aberto
                  ? { height: "auto", opacity: 1, visibility: "visible" }
                  : { height: 0, opacity: 0, transitionEnd: { visibility: "hidden" } }
              }
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden lg:visible! lg:h-auto! lg:overflow-visible lg:opacity-100!"
            >
              {projeto.destaques && (
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {projeto.destaques.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm">
                      <span aria-hidden className="size-1 rounded-full bg-accent" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tecnologias">
                {projeto.tecnologias.map((t) => (
                  <li key={t}>
                    <Chip>{t}</Chip>
                  </li>
                ))}
              </ul>
            </m.div>

            {exemplos.length > 0 && <p className="mt-8 font-mono text-xs text-muted">Veja você mesmo:</p>}

            {(exemplos.length > 0 || projeto.linkSite || projeto.linkCodigo) && (
              <div className={`${exemplos.length > 0 ? "mt-3" : "mt-8"} flex flex-wrap gap-3`}>
                {exemplos.map((ex) => (
                  <a key={ex.href} href={ex.href} target="_blank" rel="noopener noreferrer" className={classeBotaoPrincipal}>
                    {ex.rotulo}
                    <ArrowUpRight size={15} className={classeSeta} />
                  </a>
                ))}
                {exemplos.length === 0 && projeto.linkSite && (
                  <a
                    href={projeto.linkSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classeBotaoPrincipal}
                  >
                    {projeto.rotuloLink ?? "Ver site"}
                    <ArrowUpRight size={15} className={classeSeta} />
                  </a>
                )}
                {projeto.linkCodigo && (
                  <a
                    href={projeto.linkCodigo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent-2"
                  >
                    <GithubIcon width={15} height={15} /> Código
                  </a>
                )}
              </div>
            )}
          </div>
        </article>
      </GlowCard>
    </Reveal>
  );
}
