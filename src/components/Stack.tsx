import { perfil } from "../data/perfil";
import { techIcons } from "./techIcons";
import { Container, Reveal, SectionHeader } from "./ui";

export default function Stack() {
  return (
    <section id="stack" className="border-t border-border py-16 md:py-20">
      <Container>
        <SectionHeader numero="02" rotulo="Stack" titulo="Minha stack." />
        <div className="divide-y divide-border border-y border-border">
          {perfil.stack.map((g, i) => (
            <Reveal key={g.titulo} delay={i * 0.05} y={10}>
              <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 py-5 md:grid-cols-[160px_1fr_auto] md:py-6">
                <h3 className="font-mono text-xs tracking-widest text-muted uppercase">{g.titulo}</h3>
                <span aria-hidden className="font-mono text-[11px] text-muted/60 md:order-last">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ul className="col-span-2 grid grid-cols-3 gap-x-2 gap-y-4 min-[420px]:grid-cols-4 sm:grid-cols-5 md:col-span-1 md:flex md:flex-wrap md:gap-x-3">
                  {g.itens.map((it) => {
                    const Icone = techIcons[it.icone];
                    return (
                      <li key={it.nome} className="group flex flex-col items-center gap-2 md:w-[84px]">
                        <span className="grid size-14 place-items-center rounded-xl border border-border bg-surface text-fg/80 transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_22px_var(--glow)] md:size-15">
                          <Icone size={24} aria-hidden />
                        </span>
                        <span className="text-center font-mono text-[11px] leading-tight text-muted transition-colors group-hover:text-fg">
                          {it.nome}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
