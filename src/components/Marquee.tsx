import { perfil } from "../data/perfil";

export default function Marquee() {
  const itens = perfil.marquee;
  const grupo = (oculto: boolean) => (
    <ul aria-hidden={oculto || undefined} className="flex shrink-0 items-center">
      {itens.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-display text-xl font-medium tracking-tight text-muted transition-colors hover:text-fg md:text-2xl">
            {t}
          </span>
          <span aria-hidden className="font-mono text-xs text-accent">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Tecnologias que uso" className="border-y border-border bg-surface/40 py-6">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee">
          {grupo(false)}
          {grupo(true)}
        </div>
      </div>
    </section>
  );
}
