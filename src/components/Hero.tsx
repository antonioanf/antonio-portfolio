import { m, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { perfil } from "../data/perfil";
import { useTypewriter } from "../hooks/useTypewriter";
import { Botao, Container, ease } from "./ui";

type Token = { t: string; c?: "kw" | "var" | "key" | "str" | "punc" };

function montarTokens(): Token[] {
  const { cargo, stack, formacao, status } = perfil.codigo;
  const str = (s: string): Token => ({ t: `"${s}"`, c: "str" });
  const linha = (chave: string, valor: Token[], ultima = false): Token[] => [
    { t: "  " },
    { t: chave, c: "key" },
    { t: ": ", c: "punc" },
    ...valor,
    { t: ultima ? "\n" : ",\n", c: "punc" },
  ];
  const lista: Token[] = [{ t: "[", c: "punc" }];
  stack.forEach((s, i) => {
    lista.push(str(s));
    if (i < stack.length - 1) lista.push({ t: ", ", c: "punc" });
  });
  lista.push({ t: "]", c: "punc" });

  return [
    { t: "const", c: "kw" },
    { t: " " },
    { t: "antonio", c: "var" },
    { t: " = ", c: "punc" },
    { t: "{\n", c: "punc" },
    ...linha("cargo", [str(cargo)]),
    ...linha("stack", lista),
    ...linha("formacao", [str(formacao)]),
    ...linha("status", [str(status)], true),
    { t: "};", c: "punc" },
  ];
}

const cores: Record<NonNullable<Token["c"]>, string> = {
  kw: "text-[var(--code-key)] italic",
  var: "text-fg",
  key: "text-[var(--code-key)]",
  str: "text-[var(--code-str)]",
  punc: "text-[var(--code-punc)]",
};

function Editor({ ativo }: { ativo: boolean }) {
  const reduzir = useReducedMotion();
  const tokens = useMemo(montarTokens, []);
  // Trabalha com code points para não quebrar emojis no meio
  const chars = useMemo(() => tokens.map((tk) => Array.from(tk.t)), [tokens]);
  const total = chars.reduce((s, c) => s + c.length, 0);
  const plano = useMemo(() => "x".repeat(total), [total]);
  const { visivel, completo } = useTypewriter(plano, { velocidade: 13, atraso: 400, ativo: ativo && !reduzir });

  let restante = ativo ? visivel.length : 0;
  const renderizados = tokens.map((tk, i) => {
    if (restante <= 0) return null;
    const parte = chars[i].slice(0, restante).join("");
    restante -= chars[i].length;
    return (
      <span key={i} className={tk.c ? cores[tk.c] : undefined}>
        {parte}
      </span>
    );
  });

  const linhas = tokens.map((t) => t.t).join("").split("\n").length;

  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      <div className="overflow-hidden rounded-xl border border-border bg-surface/90 shadow-2xl shadow-black/20 ">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          </div>
          <span className="font-mono text-[11px] text-muted">antonio.ts</span>
          <span className="font-mono text-[10px] tracking-wider text-muted uppercase">ts</span>
        </div>
        <div className="flex p-5 font-mono text-[13px] leading-7">
          <div aria-hidden className="mr-5 text-right text-muted/50 select-none">
            {Array.from({ length: linhas }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <pre className="min-w-0 flex-1 overflow-x-auto whitespace-pre" aria-label="Objeto TypeScript descrevendo Antonio">
            <code>
              {renderizados}
              <span
                aria-hidden
                className={`ml-px inline-block h-4 w-[2px] translate-y-[3px] bg-accent-2 ${completo ? "animate-blink" : ""}`}
              />
            </code>
          </pre>
        </div>
        <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10.5px] text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" /> main
          </span>
          <span>UTF-8 · TypeScript</span>
        </div>
      </div>
    </div>
  );
}

/** true quando a tela é larga o bastante para mostrar o editor (lg). */
function useDesktop() {
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desktop;
}

export default function Hero({ pronto }: { pronto: boolean }) {
  const desktop = useDesktop();
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.08 * i } }),
  };
  const estado = pronto ? "show" : "hidden";

  return (
    <section id="topo" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <m.p
              custom={0}
              variants={item}
              initial="hidden"
              animate={estado}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs text-muted "
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {perfil.disponibilidade}
            </m.p>

            <m.h1 custom={1} variants={item} initial="hidden" animate={estado} className="mt-8">
              <span className="block font-display text-lg font-medium tracking-tight text-fg">{perfil.nome}</span>
              <span className="mt-1 block font-mono text-sm text-muted">// {perfil.cargo}</span>
            </m.h1>

            <p
              className="mt-6 font-display text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
            >
              {perfil.headline.inicio} <span className="text-gradient">{perfil.headline.destaque}</span>
            </p>

            <m.p
              custom={3}
              variants={item}
              initial="hidden"
              animate={estado}
              className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              {perfil.resumo}
            </m.p>

            <m.div custom={4} variants={item} initial="hidden" animate={estado} className="mt-9 flex flex-wrap gap-3">
              <Botao href="#projetos">
                Ver projetos
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </Botao>
              <Botao href="#contato" variante="secundario">
                Entrar em contato
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Botao>
            </m.div>
          </div>

          {desktop && (
          <m.div
            initial={{ opacity: 0, y: 24, rotateX: 8 }}
            animate={pronto ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            style={{ transformPerspective: 1200 }}
          >
            <Editor ativo={pronto} />
          </m.div>
          )}
        </div>

        <m.dl
          custom={6}
          variants={item}
          initial="hidden"
          animate={estado}
          className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:mt-24 md:grid-cols-4"
        >
          {perfil.numeros.map((n) => (
            <div key={n.rotulo} className="bg-bg px-5 py-6 md:px-7">
              <dt className="sr-only">{n.rotulo}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold tracking-tight md:text-4xl">{n.valor}</span>
                <span className="mt-1.5 block font-mono text-xs text-muted">{n.rotulo}</span>
              </dd>
            </div>
          ))}
        </m.dl>
      </Container>
    </section>
  );
}
