import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { ImagePlus } from "lucide-react";
import { uploadImage } from "../../services/api";

const MAX_MB = 15;

// ----------------------
// ARRASTRAR O SELECCIONAR FOTOS -> SUBIDA DIRECTA A CLOUDINARY
// ----------------------
const Uploader = ({ onUploaded, multiple = true, label = "Arrastra fotos aquí o haz clic para seleccionarlas" }) => {
  const input = useRef(null);
  const [over, setOver] = useState(false);
  const [queue, setQueue] = useState([]);

  const handle = async (files) => {
    const list = [...files].filter((f) => {
      if (!f.type.startsWith("image/")) return toast.error(`${f.name} no es una imagen.`) && false;
      if (f.size > MAX_MB * 1024 * 1024) return toast.error(`${f.name} supera ${MAX_MB} MB.`) && false;
      return true;
    });
    if (!list.length) return;
    setQueue(list.map((f) => ({ name: f.name, progress: 0 })));

    const uploaded = [];
    for (const [i, file] of list.entries()) {
      try {
        const image = await uploadImage(file, (progress) => setQueue((q) => q.map((item, j) => (j === i ? { ...item, progress } : item))));
        uploaded.push({ ...image, alt: "" });
      } catch (error) {
        toast.error(`${file.name}: ${error.message}`);
      }
    }
    setQueue([]);
    if (uploaded.length) {
      toast.success(uploaded.length === 1 ? "Foto subida." : `${uploaded.length} fotos subidas.`);
      onUploaded(uploaded);
    }
  };

  return (
    <div className="stack" style={{ gap: 12 }}>
      <div
        className={`dropzone ${over ? "is-over" : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => input.current.click()}
        onKeyDown={(e) => e.key === "Enter" && input.current.click()}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files); }}
      >
        <ImagePlus aria-hidden="true" />
        <span>{label}</span>
        <span className="small">JPG, PNG, WEBP o HEIC · máx. {MAX_MB} MB</span>
        <input ref={input} type="file" accept="image/*" multiple={multiple} hidden onChange={(e) => { handle(e.target.files); e.target.value = ""; }} />
      </div>
      {queue.map((item) => (
        <div key={item.name} className="upload-progress">
          <span>{item.name} · {item.progress}%</span>
          <div className="progress"><span style={{ width: `${item.progress}%` }} /></div>
        </div>
      ))}
    </div>
  );
};

export default Uploader;
