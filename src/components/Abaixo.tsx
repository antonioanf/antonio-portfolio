import { useEffect } from "react";
import Contato from "./Contato";
import Processo from "./Processo";
import Projetos from "./projetos/Projetos";
import Sobre from "./Sobre";
import Stack from "./Stack";

export { default as Footer } from "./Footer";

export default function Abaixo() {
  useEffect(() => {
    // Avisa a navbar que as seções existem e respeita links do tipo /#projetos
    window.dispatchEvent(new Event("secoes-prontas"));
    const alvo = window.location.hash && document.querySelector(window.location.hash);
    if (alvo) alvo.scrollIntoView();
  }, []);

  return (
    <>
      <Sobre />
      <Stack />
      <Projetos />
      <Processo />
      <Contato />
    </>
  );
}
