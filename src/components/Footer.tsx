import { ArrowUp } from "lucide-react";
import { canaisAtivos, navegacao, perfil } from "../data/perfil";
import { Container } from "./ui";

export default function Footer() {
  const redes = canaisAtivos.filter((c) => c.id !== "email" && c.id !== "whatsapp");

  return (
    <footer className="border-t border-border pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <p className="max-w-md font-display text-3xl leading-tight font-semibold tracking-tight md:text-4xl">
              {perfil.rodape.frase.inicio} <span className="text-muted">{perfil.rodape.frase.destaque}</span>
            </p>
            <a
              href="#topo"
              className="group mt-8 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" /> voltar ao topo
            </a>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="mb-4 font-mono text-xs tracking-widest text-muted uppercase">Navegação</h2>
            <ul className="space-y-2.5">
              {navegacao.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-sm transition-colors hover:text-accent-2">
                    {n.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-mono text-xs tracking-widest text-muted uppercase">Redes</h2>
            <ul className="space-y-2.5">
              {[...redes, ...canaisAtivos.filter((c) => c.id === "email" || c.id === "whatsapp")].map((c) => (
                <li key={c.id}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-sm transition-colors hover:text-accent-2"
                  >
                    {c.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {perfil.rodape.ano} {perfil.nome}
          </p>
        </div>
      </Container>
    </footer>
  );
}
