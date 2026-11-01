import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { lazy, Suspense, useState } from "react";
import Hero from "./components/Hero";
import Intro, { introJaVista } from "./components/Intro";
import Marquee from "./components/Marquee";
import Navbar from "./components/Navbar";
import { useTheme } from "./hooks/useTheme";

// Seções abaixo da dobra: carregadas em seguida, sem pesar na abertura.
const Abaixo = lazy(() => import("./components/Abaixo"));
const Footer = lazy(() => import("./components/Abaixo").then((m) => ({ default: m.Footer })));

export default function App() {
  const { tema, alternar } = useTheme();
  const [mostrarIntro] = useState(() => !introJaVista());
  const [pronto, setPronto] = useState(!mostrarIntro);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
      {mostrarIntro && !pronto && <Intro onFim={() => setPronto(true)} />}
      <a
        href="#conteudo"
        className="sr-only z-[200] rounded-full bg-accent px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <Navbar tema={tema} alternarTema={alternar} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero pronto={pronto} />
        <Marquee />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Abaixo />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </MotionConfig>
    </LazyMotion>
  );
}
