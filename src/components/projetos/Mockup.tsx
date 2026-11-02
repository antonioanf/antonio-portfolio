import { useState, type ReactNode } from "react";

/** Interface simulada, usada quando a imagem do projeto não existe. */
export function Mockup({ titulo, cor }: { titulo: string; cor: string }) {
  return (
    <div
      role="img"
      aria-label={`Ilustração do projeto ${titulo}`}
      className="relative flex h-full w-full overflow-hidden bg-surface-2"
      style={{
        backgroundImage: `radial-gradient(120% 90% at 100% 0%, ${cor}40, transparent 60%), radial-gradient(80% 70% at 0% 100%, ${cor}22, transparent 60%)`,
      }}
    >
      {/* barra lateral */}
      <div className="hidden w-[18%] flex-col gap-2 border-r border-border/70 p-[4%] sm:flex">
        <span className="mb-2 h-2 w-3/4 rounded-full" style={{ background: cor }} />
        {[70, 55, 62, 48].map((w, i) => (
          <span key={i} className="h-1.5 rounded-full bg-border-strong/70" style={{ width: `${w}%` }} />
        ))}
      </div>
      {/* conteúdo */}
      <div className="flex flex-1 flex-col p-[5%]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[clamp(0.95rem,2.4vw,1.6rem)] font-semibold tracking-tight text-fg">{titulo}</span>
          <span className="h-5 w-14 rounded-full" style={{ background: `${cor}cc` }} />
        </div>
        <div className="mt-[5%] space-y-2">
          <span className="block h-1.5 w-2/3 rounded-full bg-border-strong/80" />
          <span className="block h-1.5 w-1/2 rounded-full bg-border-strong/60" />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-[3%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[4/3] rounded-lg border border-border/80 bg-bg/60 p-[10%]">
              <span className="block h-1.5 w-1/2 rounded-full" style={{ background: i === 0 ? cor : "var(--border-strong)" }} />
              <span className="mt-2 block h-1 w-3/4 rounded-full bg-border-strong/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Moldura de navegador com 3 pontinhos. */
export function BrowserFrame({
  url,
  children,
  className = "",
  proporcao = "aspect-[16/10]",
  compacto = false,
}: {
  url?: string;
  proporcao?: string;
  /** Barra menor, para miniaturas. */
  compacto?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden border border-border bg-surface ${compacto ? "rounded-lg" : "rounded-xl"} ${className}`}>
      <div className={`flex items-center gap-3 border-b border-border ${compacto ? "px-2 py-1.5" : "px-3.5 py-2.5"}`}>
        <div className={`flex ${compacto ? "gap-1" : "gap-1.5"}`}>
          <span className={`rounded-full bg-border-strong ${compacto ? "size-1.5" : "size-2"}`} />
          <span className={`rounded-full bg-border-strong ${compacto ? "size-1.5" : "size-2"}`} />
          <span className={`rounded-full bg-border-strong ${compacto ? "size-1.5" : "size-2"}`} />
        </div>
        {url && (
          <span className="truncate rounded-md bg-surface-2 px-2.5 py-0.5 font-mono text-[10.5px] text-muted">{url}</span>
        )}
      </div>
      <div className={`relative overflow-hidden ${proporcao}`}>{children}</div>
    </div>
  );
}

/** Imagem do projeto com fallback para o mockup gerado. */
export function ImagemProjeto({
  src,
  titulo,
  cor,
  posicao = "object-top",
  formato = "paisagem",
}: {
  src: string;
  titulo: string;
  cor: string;
  posicao?: string;
  formato?: "paisagem" | "retrato";
}) {
  const [falhou, setFalhou] = useState(!src);
  if (falhou) return <Mockup titulo={titulo} cor={cor} />;
  if (formato === "retrato")
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-surface-2"
        style={{ backgroundImage: `radial-gradient(70% 90% at 50% 50%, ${cor}38, transparent 70%)` }}
      >
        <img
          src={src}
          alt={`Captura de tela do projeto ${titulo}`}
          width={311}
          height={590}
          loading="lazy"
          decoding="async"
          onError={() => setFalhou(true)}
          className="h-[88%] w-auto rounded-lg border border-border-strong shadow-2xl shadow-black/40 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    );
  return (
    <img
      src={src}
      alt={`Captura de tela do projeto ${titulo}`}
      width={1280}
      height={800}
      loading="lazy"
      decoding="async"
      onError={() => setFalhou(true)}
      className={`h-full w-full object-cover ${posicao} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
    />
  );
}
