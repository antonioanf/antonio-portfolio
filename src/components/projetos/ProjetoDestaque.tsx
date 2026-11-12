import { m } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useId, useRef, useState } from "react";
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

type Exemplo = NonNullable<TProjeto["exemplos"]>[number];

/** Uma tela de celular em pé, com link para o convite e legenda embaixo. */
function TelaExemplo({ ex, projeto, className = "" }: { ex: Exemplo; projeto: TProjeto; className?: string }) {
  return (
    <figure className={`flex min-w-0 flex-col items-center gap-2 ${className}`}>
      <a
        href={ex.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir o convite ${ex.rotulo} em nova aba`}
        className="block aspect-[311/590] w-full overflow-hidden rounded-lg border border-border-strong shadow-2xl shadow-black/40 transition duration-300 ease-out hover:scale-[1.02] hover:ring-2 hover:ring-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        <ImagemProjeto src={ex.imagem ?? ""} titulo={`${projeto.titulo} (${ex.rotulo})`} cor={projeto.cor} posicao="object-top" />
      </a>
      <figcaption className="text-center font-mono text-xs leading-tight text-muted">{ex.rotulo}</figcaption>
    </figure>
  );
}

/**
 * Capturas dos exemplos dentro do BrowserFrame.
 * sm+: todas lado a lado, do mesmo tamanho. Mobile: carrossel com scroll-snap
 * mostrando uma tela e meia, com bolinhas indicadoras.
 */
function TelasExemplos({ projeto, host }: { projeto: TProjeto; host: string }) {
  const exemplos = projeto.exemplos ?? [];
  const trilho = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  const fundo = { backgroundImage: `radial-gradient(70% 90% at 50% 50%, ${projeto.cor}38, transparent 70%)` };

  function aoRolar() {
    const el = trilho.current;
    if (!el) return;
    // No fim do trilho a última tela não chega no início, então conta como ativa.
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) return setAtivo(exemplos.length - 1);
    const itens = Array.from(el.children) as HTMLElement[];
    const inicio = el.scrollLeft + itens[0].offsetLeft;
    let maisPerto = 0;
    itens.forEach((item, i) => {
      if (Math.abs(item.offsetLeft - inicio) < Math.abs(itens[maisPerto].offsetLeft - inicio)) maisPerto = i;
    });
    setAtivo(maisPerto);
  }

  function irPara(i: number) {
    const el = trilho.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    const primeiro = el.children[0] as HTMLElement;
    el.scrollTo({ left: item.offsetLeft - primeiro.offsetLeft, behavior: "smooth" });
  }

  return (
    <BrowserFrame url={host} proporcao="sm:aspect-video">
      {/* Mobile: carrossel */}
      <div className="bg-surface-2 py-5 sm:hidden" style={fundo}>
        <div
          ref={trilho}
          onScroll={aoRolar}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 pl-6 after:block after:w-2 after:shrink-0 after:content-[''] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {exemplos.map((ex) => (
            <TelaExemplo key={ex.href} ex={ex} projeto={projeto} className="w-[64%] shrink-0 snap-start" />
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {exemplos.map((ex, i) => (
            <button
              key={ex.href}
              type="button"
              onClick={() => irPara(i)}
              aria-label={`Mostrar ${ex.rotulo}`}
              aria-current={i === ativo}
              className={`h-2 rounded-full transition-all ${i === ativo ? "w-5 bg-accent" : "w-2 bg-border-strong hover:bg-muted"}`}
            />
          ))}
        </div>
      </div>

      {/* sm+: lado a lado */}
      <div className="absolute inset-0 hidden items-stretch justify-center gap-[5%] bg-surface-2 px-[4%] pt-[4%] pb-[3%] sm:flex" style={fundo}>
        {exemplos.map((ex) => (
          <TelaExemplo key={ex.href} ex={ex} projeto={projeto} className="h-full [&>a]:min-h-0 [&>a]:w-auto [&>a]:flex-1" />
        ))}
      </div>
    </BrowserFrame>
  );
}

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
              <TelasExemplos projeto={projeto} host={host} />
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
