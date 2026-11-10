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

function Editor() {
  const reduzir = useReducedMotion();
  const tokens = useMemo(montarTokens, []);
  // Trabalha com code points para não quebrar emojis no meio
  const chars = useMemo(() => tokens.map((tk) => Array.from(tk.t)), [tokens]);
  const total = chars.reduce((s, c) => s + c.length, 0);
  const plano = useMemo(() => "x".repeat(total), [total]);
  const { visivel, completo } = useTypewriter(plano, { velocidade: 13, atraso: 400, ativo: !reduzir });

  let restante = visivel.length;
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

export default function Hero() {
  const desktop = useDesktop();
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.08 * i } }),
  };

  return (
    <section id="topo" className="relative flex min-h-svh flex-col overflow-hidden pt-24 pb-8 md:pt-32 md:pb-12">
      <div aria-hidden className="bg-diagonal pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]"
      />

      {/* Ocupa a altura da tela: conteúdo centralizado e seta no rodapé do hero */}
      <Container className="flex flex-1 flex-col">
        <div className="my-auto grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            {/* Nome em destaque; o bloco tem a largura do nome para alinhar o cargo à direita */}
            <m.div custom={0} variants={item} initial="hidden" animate="show" className="mx-auto w-fit lg:mx-0">
              <h1 className="font-display text-[clamp(4rem,25.5vw,8rem)] leading-[0.86] font-bold tracking-[-0.055em] text-fg lg:text-[clamp(6rem,10.2vw,9.5rem)]">
                <span className="block">Antonio</span>
                <span className="block">
                  <span className="text-accent">A</span>ngelo
                </span>
              </h1>
              <p className="mt-4 flex items-center justify-end gap-3 text-right text-sm text-fg sm:text-base md:mt-5">
                <span aria-hidden className="h-px w-10 bg-accent sm:w-16" />
                <span className="whitespace-nowrap">
                  <span className="font-normal tracking-[0.3em] uppercase">Desenvolvedor</span>{" "}
                  <span className="-mr-[0.3em] font-bold tracking-[0.3em] text-accent uppercase">Web</span>
                </span>
              </p>
            </m.div>

            <m.p
              custom={2}
              variants={item}
              initial="hidden"
              animate="show"
              className="mx-auto mt-10 max-w-md text-center text-base text-balance text-muted md:text-lg lg:mx-0 lg:text-left"
            >
              Sites e sistemas modernos, <span className="text-accent-2">do design ao deploy.</span>
            </m.p>

            <m.div
              custom={4}
              variants={item}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
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
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
              style={{ transformPerspective: 1200 }}
            >
              <Editor />
            </m.div>
          )}
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <a
            href="#sobre"
            aria-label="Rolar para a seção Sobre"
            className="grid size-11 place-items-center rounded-full border border-border-strong text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowDown size={18} aria-hidden className="animate-bounce-soft motion-reduce:animate-none" />
          </a>
        </div>
      </Container>
    </section>
  );
}
