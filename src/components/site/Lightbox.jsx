import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cdn } from "../../services/api";

// VISOR DE FOTOS A PANTALLA COMPLETA (TECLADO: ← → ESC)
const Lightbox = ({ images, index, onClose, onChange }) => {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onChange]);

  if (index === null) return null;
  const image = images[index];

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="Foto ampliada">
      <button className="lightbox__close" onClick={onClose} aria-label="Cerrar"><X /></button>
      {images.length > 1 && (
        <>
          <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length); }} aria-label="Anterior"><ChevronLeft /></button>
          <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); onChange((index + 1) % images.length); }} aria-label="Siguiente"><ChevronRight /></button>
        </>
      )}
      <img src={cdn(image.url, 1800)} alt={image.alt || ""} onClick={(e) => e.stopPropagation()} />
      <span className="lightbox__counter">{index + 1} / {images.length}</span>
    </div>
  );
};

export default Lightbox;
