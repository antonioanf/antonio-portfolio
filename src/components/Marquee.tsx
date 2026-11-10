import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { perfil } from "../data/perfil";
import { techIcons } from "./techIcons";

export default function Marquee() {
  const [pausado, setPausado] = useState(false);
  const itens = perfil.marquee;

  const grupo = (oculto: boolean) => (
    <ul aria-hidden={oculto || undefined} className="flex shrink-0 items-center">
      {itens.map((t) => {
        const Icone = techIcons[t.icone];
        return (
          <li key={t.nome} className="flex items-center gap-3 px-6 whitespace-nowrap md:px-8">
            <Icone size={26} aria-hidden className="shrink-0" />
            <span className="font-display text-lg font-medium tracking-tight md:text-xl">{t.nome}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section aria-label="Tecnologias que uso" className="overflow-hidden py-8 md:py-12">
      {/* Faixa 10vw mais larga que a tela para a inclinação não mostrar quina */}
      <div className="relative left-1/2 w-[110vw] -translate-x-1/2 -rotate-1 bg-accent py-4 text-white shadow-lg shadow-accent/20 md:py-5">
        <div className="marquee-mask overflow-hidden">
          <div
            className="marquee-track flex w-max animate-marquee [animation-duration:60s] md:[animation-duration:45s] motion-reduce:animate-none"
            style={pausado ? { animationPlayState: "paused" } : undefined}
          >
            {grupo(false)}
            {grupo(true)}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-pressed={pausado}
          aria-label={pausado ? "Continuar animação das tecnologias" : "Pausar animação das tecnologias"}
          className="absolute top-1/2 right-[calc(5vw+0.75rem)] grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/25 motion-reduce:hidden sm:right-[calc(5vw+1.25rem)]"
        >
          {pausado ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}
        </button>
      </div>
    </section>
  );
}
