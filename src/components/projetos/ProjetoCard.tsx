import { ArrowUpRight } from "lucide-react";
import type { Projeto } from "../../data/perfil";
import { Chip, trackGlow } from "../ui";
import { BrowserFrame, ImagemProjeto } from "./Mockup";

export default function ProjetoCard({ projeto }: { projeto: Projeto }) {
  const link = projeto.linkSite || projeto.linkCodigo;
  const conteudo = (
    <>
      <BrowserFrame className="w-28 shrink-0 self-start sm:w-36 lg:w-44" compacto>
        <ImagemProjeto src={projeto.imagem} titulo={projeto.titulo} cor={projeto.cor} posicao="object-center" />
      </BrowserFrame>
      <div className="flex min-w-0 flex-1 flex-col py-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[15px] leading-snug font-semibold tracking-tight">
            {projeto.titulo}
            {link && <span className="sr-only"> (abre em nova aba)</span>}
          </h3>
          {link && (
            <ArrowUpRight
              size={16}
              aria-hidden
              className="mt-0.5 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-2"
            />
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted">{projeto.descricao}</p>
        <ul className="mt-auto flex flex-wrap gap-1 pt-3">
          {projeto.tecnologias.map((t) => (
            <li key={t}>
              <Chip compacto>{t}</Chip>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const classes =
    "glow-card group flex h-full gap-3 rounded-xl border border-border bg-surface p-2 transition-colors sm:gap-4 sm:p-2.5 duration-300 hover:border-border-strong";

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
