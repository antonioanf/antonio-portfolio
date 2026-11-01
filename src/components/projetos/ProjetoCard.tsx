import { ArrowUpRight } from "lucide-react";
import type { Projeto } from "../../data/perfil";
import { Chip, trackGlow } from "../ui";
import { BrowserFrame, ImagemProjeto } from "./Mockup";

export default function ProjetoCard({ projeto }: { projeto: Projeto }) {
  const link = projeto.linkSite || projeto.linkCodigo;
  const conteudo = (
    <>
      <BrowserFrame>
        <ImagemProjeto src={projeto.imagem} titulo={projeto.titulo} cor={projeto.cor} posicao="object-center" />
      </BrowserFrame>
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {projeto.titulo}
            {link && <span className="sr-only"> (abre em nova aba)</span>}
          </h3>
          {link && (
            <ArrowUpRight
              size={18}
              aria-hidden
              className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-2"
            />
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{projeto.descricao}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {projeto.tecnologias.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const classes =
    "glow-card group flex h-full flex-col rounded-2xl border border-border bg-surface p-2.5 transition-colors duration-300 hover:border-border-strong";

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={trackGlow}
      className={classes}
    >
      {conteudo}
    </a>
  ) : (
    <div onMouseMove={trackGlow} className={classes}>
      {conteudo}
    </div>
  );
}
