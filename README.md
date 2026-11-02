# Portfólio · Antonio Angelo

Site pessoal one-page feito com **Vite + React + TypeScript**, **Tailwind CSS v4**, **Framer Motion** e **lucide-react**.

## Rodando localmente

Requisitos: Node.js 20 ou superior.

```bash
npm install      # instala as dependências
npm run dev      # servidor de desenvolvimento em http://localhost:5173
npm run build    # gera a versão final em dist/
npm run preview  # testa a versão final localmente
```

## Editando o conteúdo: `src/data/perfil.ts`

**Todo o texto do site está em um único arquivo:** [`src/data/perfil.ts`](src/data/perfil.ts).
Não é preciso mexer nos componentes para atualizar o portfólio.

| O que mudar | Onde, dentro de `perfil` |
| --- | --- |
| Nome e cargo | `nome`, `cargo` |
| Frase principal do topo | `headline.inicio` e `headline.destaque` (a parte em gradiente) |
| Números do topo (5º período, 8+ projetos…) | `numeros` |
| Objeto do editor de código | `codigo` |
| Faixa de tecnologias | `marquee` |
| Textos da seção Sobre | `sobre` |
| Linha do tempo | `trajetoria` (`tipo: "trabalho"` ou `"formacao"`) |
| Cards da Stack | `stack` |
| Projetos em destaque | `projetosDestaque` |
| Projetos acadêmicos | `projetosAcademicos` |
| Etapas do processo | `processo` |
| Canais de contato | `contato.canais` |

### Projetos

Cada projeto tem estes campos:

- `exibir`: `true` mostra no site e `false` esconde (o projeto continua salvo no arquivo).
  Os projetos **ADS Website** e **TodoList** estão com `exibir: false`. Mude para `true` para reativá-los.
- `linkSite` / `linkCodigo`: os botões "Ver site" e "Código" só aparecem quando o link está preenchido.
- `status` (só nos destaques): `"concluido"` ou `"andamento"` (o segundo mostra o selo azul animado).
- `cor`: cor usada no mockup gerado quando a imagem não existe.

### Contatos (LinkedIn e Instagram)

Em `contato.canais`, LinkedIn e Instagram estão com `valor: ""` e `href: ""`, por isso não aparecem.
Preencha os dois campos e eles passam a aparecer no Contato e no rodapé:

```ts
{ id: "linkedin", rotulo: "LinkedIn", valor: "linkedin.com/in/seu-usuario", href: "https://linkedin.com/in/seu-usuario" },
```

### Currículo

Coloque o PDF em `public/` (ex.: `public/curriculo.pdf`) e defina `curriculo: "/curriculo.pdf"`.
O botão "Baixar currículo" aparece sozinho na seção Sobre.

## Trocando imagens

As imagens ficam em [`public/assets/`](public/assets/) e são referenciadas como `/assets/NomeDoArquivo.png`.

- Para trocar uma imagem, substitua o arquivo **mantendo o mesmo nome**, ou mude o campo `imagem` do projeto.
- **Atenção a maiúsculas/minúsculas:** na Vercel, `StoqNET.png` e `StoqNet.png` são arquivos diferentes.
- Formato ideal das capturas de tela: **16:10** (ex.: 1280×800).
- Se a imagem não existir, o site mostra um **mockup gerado automaticamente** com o título e a cor do projeto.
  Por isso `KlerCarvalho.png`, `CIDUP.png` e `Convites.png` aparecem como mockup até você adicionar as capturas reais.

Outros arquivos em `public/`: `favicon.svg`, `favicon.ico`, `icons/` (ícones do app), `og-image.png`
(imagem 1200×630 que aparece ao compartilhar o link), `manifest.json`, `robots.txt` e `sitemap.xml`.

## Publicando na Vercel

1. Envie o projeto para o GitHub (`git push`).
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project** e importe o repositório.
3. A Vercel detecta o Vite sozinha. Confira:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Clique em **Deploy**. Cada novo `git push` publica de novo automaticamente.

**Depois do primeiro deploy**, troque `https://antonio-angelo.vercel.app` pelo seu endereço real em
`index.html` (tags `canonical`, `og:url`, `og:image` e `twitter:image`), `public/robots.txt` e `public/sitemap.xml`.

## Estrutura

```
src/
├── data/perfil.ts              ← todo o conteúdo
├── hooks/                      ← useTheme (tema claro/escuro), useTypewriter
├── components/
│   ├── ui.tsx                  ← Container, Reveal, SectionHeader, GlowCard, Chip, Botao
│   ├── Navbar.tsx · Hero.tsx · Marquee.tsx
│   ├── Sobre.tsx · Stack.tsx · Processo.tsx · Contato.tsx · Footer.tsx
│   ├── Abaixo.tsx              ← agrupa as seções carregadas sob demanda
│   ├── icons.tsx               ← ícones de marcas (GitHub, LinkedIn…)
│   └── projetos/               ← Projetos, ProjetoDestaque, ProjetoCard, Mockup
├── index.css                   ← tema (cores em CSS variables) e efeitos
└── main.tsx · App.tsx
```

As cores dos dois temas estão no topo de `src/index.css` (`:root` = claro, `.dark` = escuro).

## Acessibilidade

- Plugin **VLibras** (carregado depois que a página abre, para não atrasar o site).
- Link "Pular para o conteúdo", foco visível, textos alternativos e contraste AA nos dois temas.
- Animações reduzidas automaticamente para quem usa `prefers-reduced-motion`.
