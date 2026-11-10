/**
 * ============================================================
 *  PERFIL — todo o conteúdo do site fica aqui.
 *  Edite este arquivo para atualizar textos, projetos e links
 *  sem precisar mexer nos componentes.
 * ============================================================
 */

/** Chaves do mapa de ícones em src/components/techIcons.tsx. */
export type TechIcone =
  | "react" | "typescript" | "javascript" | "tailwind" | "vite" | "supabase" | "postgresql"
  | "git" | "github" | "githubactions" | "vercel" | "framer" | "html" | "css" | "godot" | "figma"
  | "reactrouter" | "sql" | "api" | "auth" | "testes" | "docs" | "uiux" | "design" | "identidade"
  | "acessibilidade";

export interface Tech {
  nome: string;
  icone: TechIcone;
}
export type StatusProjeto = "concluido" | "andamento";
export type CanalId = "whatsapp" | "email" | "github" | "linkedin" | "instagram";

export interface ItemTrajetoria {
  titulo: string;
  local?: string;
  periodo: string;
  detalhe?: string;
  tipo: "trabalho" | "formacao";
}

export interface GrupoStack {
  titulo: string;
  itens: Tech[];
}

export interface Projeto {
  id: string;
  titulo: string;
  descricao: string;
  /** Caminho a partir de /public. Se o arquivo não existir, um mockup é gerado. */
  imagem: string;
  tecnologias: string[];
  /** "retrato" para capturas de celular (em pé): a tela aparece inteira e centralizada. */
  formato?: "paisagem" | "retrato";
  /** Cor de destaque usada no mockup gerado (quando a imagem falha). */
  cor: string;
  linkSite?: string;
  /** Texto do botão do site. Padrão: "Ver site". */
  rotuloLink?: string;
  /**
   * Vários links de demonstração. Se existir, substitui o botão único de linkSite.
   * Com `imagem`, as capturas aparecem lado a lado (em pé) no mockup do card.
   */
  exemplos?: { rotulo: string; href: string; imagem?: string }[];
  linkCodigo?: string;
  /** false = fica guardado aqui, mas não aparece no site. */
  exibir: boolean;
}

export interface ProjetoDestaque extends Projeto {
  categoria: string;
  contexto: string;
  ano: string;
  status: StatusProjeto;
  destaques?: string[];
}

export interface Canal {
  id: CanalId;
  rotulo: string;
  /** Texto exibido. Deixe vazio ("") para esconder o canal. */
  valor: string;
  href: string;
}

const GITHUB_URL = "https://github.com/antoniofilho27032006anf";

export const perfil = {
  nome: "Antonio Angelo",
  iniciais: "AA",
  cargo: "Desenvolvedor Web Full Stack em formação",
  headline: {
    inicio: "Desenvolvimento de Sites e Sistemas",
    destaque: "Funcionais, Modernos e Eficientes.",
  },
  resumo:
    "Desenvolvo sites, sistemas e aplicações web modernos, responsivos e eficientes, criando soluções digitais intuitivas que atendem às necessidades reais de cada projeto — da ideia inicial à publicação.",
  /** Caminho do PDF em /public (ex.: "/curriculo.pdf"). Vazio = botão escondido. */
  curriculo: "",

  numeros: [
    { valor: "5º", rotulo: "período em ADS" },
    { valor: "8+", rotulo: "projetos" },
    { valor: "3 anos", rotulo: "em design gráfico" },
    { valor: "4 anos", rotulo: "em atendimento" },
  ],

  /** Objeto exibido no editor de código do hero. */
  codigo: {
    cargo: "Dev Full Stack",
    stack: ["React", "TypeScript", "Supabase"],
    formacao: "ADS · UNIFIP",
    status: "aprendendo todo dia 🚀",
  },

  marquee: [
    { nome: "React", icone: "react" },
    { nome: "TypeScript", icone: "typescript" },
    { nome: "JavaScript", icone: "javascript" },
    { nome: "Tailwind CSS", icone: "tailwind" },
    { nome: "Vite", icone: "vite" },
    { nome: "Supabase", icone: "supabase" },
    { nome: "PostgreSQL", icone: "postgresql" },
    { nome: "Git", icone: "git" },
    { nome: "GitHub", icone: "github" },
    { nome: "GitHub Actions", icone: "githubactions" },
    { nome: "Vercel", icone: "vercel" },
    { nome: "Framer Motion", icone: "framer" },
    { nome: "HTML5", icone: "html" },
    { nome: "CSS3", icone: "css" },
    { nome: "Godot", icone: "godot" },
    { nome: "Figma", icone: "figma" },
  ] satisfies Tech[],

  sobre: [
    "Estudante de Análise e Desenvolvimento de Sistemas na UNIFIP e estagiário de desenvolvimento web Full Stack. Participo de todo o ciclo dos projetos, da interface à publicação.",
    "Antes do código, trabalhei com design gráfico e atendimento ao público. Essa bagagem me ajuda a criar interfaces intuitivas, pensadas para quem vai usar.",
  ],

  trajetoria: [
    {
      titulo: "Estagiário em Desenvolvimento Web Full Stack",
      periodo: "2026",
      tipo: "trabalho",
    },
    {
      titulo: "Análise e Desenvolvimento de Sistemas",
      local: "UNIFIP, Patos-PB",
      periodo: "2024–2026",
      detalhe: "5º período",
      tipo: "formacao",
    },
    {
      titulo: "Designer Gráfico",
      local: "Interfaces, identidades visuais e peças digitais",
      periodo: "3 anos",
      tipo: "trabalho",
    },
    {
      titulo: "Atendimento ao Público",
      local: "Suporte humanizado e foco na satisfação do usuário",
      periodo: "4 anos",
      tipo: "trabalho",
    },
    {
      titulo: "Técnico em Administração",
      local: "EECIT Monsenhor José Sinfronio de Assis Filho",
      periodo: "2021–2023",
      tipo: "formacao",
    },
  ] satisfies ItemTrajetoria[],

  stack: [
    {
      titulo: "Front-end",
      itens: [
        { nome: "HTML5", icone: "html" },
        { nome: "CSS3", icone: "css" },
        { nome: "JavaScript", icone: "javascript" },
        { nome: "TypeScript", icone: "typescript" },
        { nome: "React", icone: "react" },
        { nome: "React Router", icone: "reactrouter" },
        { nome: "Tailwind CSS", icone: "tailwind" },
        { nome: "Framer Motion", icone: "framer" },
        { nome: "Vite", icone: "vite" },
      ],
    },
    {
      titulo: "Back-end & Dados",
      itens: [
        { nome: "Supabase", icone: "supabase" },
        { nome: "PostgreSQL", icone: "postgresql" },
        { nome: "SQL", icone: "sql" },
        { nome: "APIs REST", icone: "api" },
        { nome: "Autenticação", icone: "auth" },
      ],
    },
    {
      titulo: "Qualidade & Deploy",
      itens: [
        { nome: "Git", icone: "git" },
        { nome: "GitHub", icone: "github" },
        { nome: "GitHub Actions", icone: "githubactions" },
        { nome: "Testes automatizados", icone: "testes" },
        { nome: "Vercel", icone: "vercel" },
        { nome: "Documentação técnica", icone: "docs" },
      ],
    },
    {
      titulo: "Design & Outros",
      itens: [
        { nome: "UI/UX", icone: "uiux" },
        { nome: "Design gráfico", icone: "design" },
        { nome: "Identidade visual", icone: "identidade" },
        { nome: "Acessibilidade", icone: "acessibilidade" },
      ],
    },
  ] satisfies GrupoStack[],

  projetosDestaque: [
    {
      id: "kler-carvalho",
      titulo: "Sistema Grupo Klér Carvalho",
      categoria: "Projeto profissional",
      contexto: "Freelance",
      ano: "2026",
      status: "concluido",
      descricao:
        "Plataforma web do Grupo Klér Carvalho com site institucional e painel administrativo, desenvolvida como projeto freelance. Participei do ciclo completo: interface, componentes, identidade visual, testes automatizados, integração contínua, documentação e publicação.",
      destaques: ["Interface responsiva", "Testes automatizados", "CI com GitHub Actions", "Deploy contínuo"],
      tecnologias: ["React", "TypeScript", "Vite", "React Router", "Lucide React"],
      imagem: "/assets/KlerCarvalho.png",
      cor: "#3b82f6",
      linkSite: "",
      linkCodigo: "",
      exibir: true,
    },
    {
      id: "cidup",
      titulo: "CIDUP",
      categoria: "Sistema web",
      contexto: "Em equipe",
      ano: "2026",
      status: "andamento",
      descricao:
        "Projeto acadêmico desenvolvido com foco no registro, gerenciamento e acompanhamento de denúncias urbanas, buscando facilitar a comunicação entre cidadãos e órgãos responsáveis pela resolução de problemas na cidade. A plataforma permite centralizar informações sobre ocorrências urbanas, contribuindo para a identificação de problemas, a participação cidadã e a melhoria da gestão dos espaços públicos.",
      tecnologias: ["React", "TypeScript", "Supabase", "PostgreSQL"],
      imagem: "/assets/CIDUP.png",
      cor: "#0ea5e9",
      linkSite: "",
      linkCodigo: "",
      exibir: true,
    },
    {
      id: "convites",
      titulo: "Convites Interativos",
      categoria: "Projeto criativo",
      contexto: "Freelance",
      ano: "2026",
      status: "concluido",
      descricao:
        "Convites digitais interativos e responsivos, com animações, efeitos visuais, temas personalizados e confirmação de presença pelo WhatsApp. Exemplos: convite temático inspirado em Harry Potter e convite de aniversário infantil com tema de borboletas.",
      tecnologias: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Canvas"],
      imagem: "/assets/Convites.png",
      formato: "retrato",
      cor: "#c9a45c",
      linkSite: "https://convite-magia.vercel.app/",
      exemplos: [
        { rotulo: "Tema Harry Potter", href: "https://convite-magia.vercel.app/", imagem: "/assets/Convites.png" },
        { rotulo: "Tema Borboletas", href: "https://convite-borboleta.vercel.app/", imagem: "/assets/ConviteBorboleta.png" },
      ],
      linkCodigo: "",
      exibir: true,
    },
  ] satisfies ProjetoDestaque[],

  projetosAcademicos: [
    {
      id: "cidup-academico",
      titulo: "CIDUP",
      descricao: "Plataforma para registrar e acompanhar denúncias urbanas, aproximando cidadãos dos órgãos responsáveis.",
      imagem: "/assets/CIDUP.png",
      tecnologias: ["React", "TypeScript", "Supabase", "PostgreSQL"],
      cor: "#0ea5e9",
      linkCodigo: "https://github.com/otavio2019/cidup",
      exibir: true,
    },
    {
      id: "stoqnet",
      titulo: "StoqNET",
      descricao: "Sistema de gerenciamento de estoque para controle de produtos e organização empresarial.",
      imagem: "/assets/StoqNET.png",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "#0ea5e9",
      linkCodigo: GITHUB_URL,
      exibir: true,
    },
    {
      id: "barbearia",
      titulo: "Barbearia UNIFIP",
      descricao: "Plataforma de agendamento com seleção de data, horário e observações personalizadas.",
      imagem: "/assets/BarbeariaUnifip.png",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "#60a5fa",
      linkCodigo: GITHUB_URL,
      exibir: true,
    },
    {
      id: "receitahub",
      titulo: "ReceitaHub",
      descricao: "Portal para pesquisar e divulgar receitas, conectando entusiastas da gastronomia.",
      imagem: "/assets/ReceitaHUB.png",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "#6366f1",
      linkCodigo: GITHUB_URL,
      exibir: true,
    },
    {
      id: "godot",
      titulo: "Godot Game",
      descricao: "Jogo 2D de plataforma feito na Godot Engine, com mecânicas e desafios interativos.",
      imagem: "/assets/Godot.png",
      tecnologias: ["Godot", "GDScript"],
      cor: "#478cbf",
      linkCodigo: GITHUB_URL,
      exibir: true,
    },
    {
      id: "ads-website",
      titulo: "ADS Website",
      descricao:
        "Site institucional do curso de Análise e Desenvolvimento de Sistemas, apresentando a estrutura e os objetivos do curso.",
      imagem: "/assets/SiteADS.png",
      tecnologias: ["HTML", "CSS"],
      cor: "#3b82f6",
      linkCodigo: GITHUB_URL,
      exibir: false,
    },
    {
      id: "todolist",
      titulo: "TodoList",
      descricao: "Aplicação para organizar tarefas diárias: adicionar, concluir e remover atividades de forma simples.",
      imagem: "/assets/TodoList.png",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      cor: "#14b8a6",
      linkCodigo: GITHUB_URL,
      exibir: false,
    },
  ] satisfies Projeto[],

  processo: [
    { titulo: "Entendimento", texto: "Conversa para entender o objetivo, o público e o que o projeto precisa resolver." },
    { titulo: "Design", texto: "Estrutura, fluxo e visual da interface antes da primeira linha de código." },
    { titulo: "Desenvolvimento", texto: "Código limpo, componentizado, responsivo e testado." },
    { titulo: "Deploy", texto: "Publicação, ajustes finais e acompanhamento depois de ir ao ar." },
  ],

  contato: {
    titulo: "Tem um projeto em mente?",
    destaque: "Vamos conversar.",
    email: "antonioangelo2703@gmail.com",
    canais: [
      { id: "whatsapp", rotulo: "WhatsApp", valor: "(83) 99806-2018", href: "https://wa.me/5583998062018" },
      { id: "email", rotulo: "E-mail", valor: "antonioangelo2703@gmail.com", href: "mailto:antonioangelo2703@gmail.com" },
      { id: "github", rotulo: "GitHub", valor: "github.com/antonioanf", href: GITHUB_URL },
      // Preencha valor e href para exibir:
      { id: "linkedin", rotulo: "LinkedIn", valor: "linkedin.com/in/antonioanf", href: "https://www.linkedin.com/in/antonioanf" },
      { id: "instagram", rotulo: "Instagram", valor: "", href: "" },
    ] satisfies Canal[],
  },

  rodape: {
    frase: { inicio: "Código limpo.", destaque: "Interfaces que funcionam." },
    ano: "2026",
  },
};

export const navegacao = [
  { id: "sobre", rotulo: "Sobre" },
  { id: "stack", rotulo: "Stack" },
  { id: "projetos", rotulo: "Projetos" },
  { id: "processo", rotulo: "Processo" },
  { id: "contato", rotulo: "Contato" },
] as const;

/** Canais com valor preenchido (os vazios ficam escondidos). */
export const canaisAtivos = perfil.contato.canais.filter((c) => c.valor && c.href);
