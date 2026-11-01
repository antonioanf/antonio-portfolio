import { useEffect, useState } from "react";

/** Revela `texto` caractere a caractere. Com `ativo=false` mostra tudo de uma vez. */
export function useTypewriter(texto: string, { velocidade = 18, atraso = 0, ativo = true } = {}) {
  const [qtd, setQtd] = useState(ativo ? 0 : texto.length);

  useEffect(() => {
    if (!ativo) {
      setQtd(texto.length);
      return;
    }
    setQtd(0);
    let id: number;
    const inicio = window.setTimeout(() => {
      id = window.setInterval(() => {
        setQtd((q) => {
          if (q >= texto.length) {
            window.clearInterval(id);
            return q;
          }
          return q + 1;
        });
      }, velocidade);
    }, atraso);
    return () => {
      window.clearTimeout(inicio);
      window.clearInterval(id);
    };
  }, [texto, velocidade, atraso, ativo]);

  return { visivel: texto.slice(0, qtd), completo: qtd >= texto.length };
}
