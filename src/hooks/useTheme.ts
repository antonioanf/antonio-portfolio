import { useCallback, useEffect, useState } from "react";

export type Tema = "dark" | "light";

function lerTema(): Tema {
  try {
    return localStorage.getItem("tema") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function useTheme() {
  const [tema, setTema] = useState<Tema>(lerTema);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", tema === "dark");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", tema === "dark" ? "#050608" : "#ffffff");
    try {
      localStorage.setItem("tema", tema);
    } catch {
      /* localStorage indisponível (modo privado etc.) */
    }
  }, [tema]);

  const alternar = useCallback(() => setTema((t) => (t === "dark" ? "light" : "dark")), []);
  return { tema, alternar };
}
