/**
 * ============================================================
 *  PERFIL — todo o conteúdo do site fica aqui.
 *  Edite este arquivo para atualizar textos, projetos e links
 *  sem precisar mexer nos componentes.
 * ============================================================
 */

export type IconeStack = "frontend" | "backend" | "deploy" | "design";
export type StatusProjeto = "concluido" | "andamento";
export type CanalId = "whatsapp" | "email" | "github" | "linkedin" | "instagram";

export interface ItemTrajetoria {
  titulo: string;
  local: string;
  periodo: string;
  detalhe?: string;
  tipo: "trabalho" | "formacao";
}

export interface GrupoStack {
  titulo: string;
  icone: IconeStack;
  itens: string[];
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
  usuario: "antonio-angelo",
  cargo: "Desenvolvedor Web Full Stack em formação",
  disponibilidade: "Disponível para projetos e estágio",
  headline: {
    inicio: "Construo interfaces e sistemas web",
    destaque: "rápidos e bem feitos.",
  },
  resumo:
    "Estudante de Análise e Desenvolvimento de Sistemas, com bagagem em design gráfico e atendimento. Uno código limpo, olhar de designer e foco total na experiência de quem usa.",
  foto: "/assets/MinhaFoto.png",
  /** Cidade exibida abaixo da foto. */
  cidade: "Itaporanga · PB",
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
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Vite",
    "Supabase",
    "PostgreSQL",
    "Git",
    "GitHub Actions",
    "Vercel",
    "Framer Motion",
    "HTML5",
    "CSS3",
    "Godot",
    "UI/UX",
  ],

  sobre: [
    "Estou no 5º período de Análise e Desenvolvimento de Sistemas na UNIFIP e atuo como estagiário de desenvolvimento web no Grupo Klér Carvalho, onde participo de todo o ciclo: interface, testes automatizados, integração contínua, documentação e publicação.",
    "Antes da programação, trabalhei 3 anos com design gráfico e 4 anos com atendimento ao público. Essa bagagem me ajuda a criar interfaces intuitivas e a entender o que o usuário realmente precisa.",
  ],

  trajetoria: [
    {
      titulo: "Estagiário de Desenvolvimento Web",
      local: "Grupo Klér Carvalho",
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
      icone: "frontend",
      itens: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "React Router", "Tailwind CSS", "Framer Motion", "Vite"],
    },
    {
      titulo: "Back-end & Dados",
      icone: "backend",
      itens: ["Supabase", "PostgreSQL", "SQL", "APIs REST", "Autenticação"],
    },
    {
      titulo: "Qualidade & Deploy",
      icone: "deploy",
      itens: ["Git", "GitHub", "GitHub Actions (CI)", "Testes automatizados", "Vercel", "Documentação técnica"],
    },
    {
      titulo: "Design & Outros",
      icone: "design",
      itens: ["UI/UX", "Design gráfico", "Identidade visual", "Acessibilidade"],
    },
  ] satisfies GrupoStack[],

  projetosDestaque: [
    {
      id: "kler-carvalho",
      titulo: "Sistema Grupo Klér Carvalho",
      categoria: "Projeto profissional",
      contexto: "Estágio",
      ano: "2026",
      status: "concluido",
      descricao:
        "Plataforma web do Grupo Klér Carvalho com site institucional e painel administrativo, desenvolvida durante o estágio. Participei do ciclo completo: interface, componentes, identidade visual, testes automatizados, integração contínua, documentação e publicação.",
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
        "Convites digitais interativos e responsivos, com animações, efeitos visuais, temas personalizados e confirmação de presença pelo WhatsApp. Exemplo: convite temático inspirado no universo de Harry Potter.",
      tecnologias: ["React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Canvas"],
      imagem: "/assets/Convites.png",
      formato: "retrato",
      cor: "#c9a45c",
      linkSite: "",
      linkCodigo: "",
      exibir: true,
    },
  ] satisfies ProjetoDestaque[],

  projetosAcademicos: [
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
      { id: "linkedin", rotulo: "LinkedIn", valor: "", href: "" },
      { id: "instagram", rotulo: "Instagram", valor: "", href: "" },
    ] satisfies Canal[],
  },

  rodape: {
    frase: { inicio: "Código limpo.", destaque: "Interfaces que funcionam." },
    ano: "2026",
    feitoCom: "Feito com React + TypeScript",
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
