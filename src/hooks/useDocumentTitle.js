import { useEffect } from "react";

const BASE = "AluPVC Barcelona";

// TÍTULO Y DESCRIPCIÓN DE CADA PÁGINA
export const useSeo = (title, description) => {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : `${BASE} · Ventanas, persianas y reformas en Barcelona y el Maresme`;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
};
