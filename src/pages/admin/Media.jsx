import { useState } from "react";
import { toast } from "react-toastify";
import { CircleAlert, Copy, ExternalLink, Images, Trash2 } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import Uploader from "../../components/admin/Uploader";
import { Button, Card, Empty, PageLoader, Segmented } from "../../components/ui";
import { useSeo } from "../../hooks/useDocumentTitle";
import { useApi } from "../../hooks/useApi";
import { api, cdn } from "../../services/api";
import { date } from "../../lib/format";

const Media = () => {
  useSeo("Fotos");
  const [all, setAll] = useState(false);
  const first = useApi(`/media?all=${all}`);
  const [more, setMore] = useState({ all, images: [], cursor: undefined, loading: false });
  const [removed, setRemoved] = useState([]);

  // PRIMERA PÁGINA (useApi) + PÁGINAS SIGUIENTES ("Cargar más")
  const extra = more.all === all ? more : { images: [], cursor: undefined, loading: false };
  const images = [...(first.data?.data.images || []), ...extra.images].filter((i) => !removed.includes(i.publicId));
  const cursor = extra.cursor === undefined ? first.data?.data.nextCursor : extra.cursor;
  const loading = first.loading || extra.loading;
  const error = first.error;

  const loadMore = async () => {
    setMore({ ...extra, all, loading: true });
    try {
      const { data } = await api(`/media?all=${all}&cursor=${cursor}`);
      setMore({ all, images: [...extra.images, ...data.images], cursor: data.nextCursor, loading: false });
    } catch (err) {
      toast.error(err.message);
      setMore({ ...extra, all, loading: false });
    }
  };

  const reloadAll = () => {
    setMore({ all, images: [], cursor: undefined, loading: false });
    first.reload();
  };

  const remove = async (img) => {
    const warning = img.usedBy ? `\n\nAtención: se usa en el trabajo «${img.usedBy}» y se quitará de él.` : "";
    if (!window.confirm(`¿Borrar esta foto de Cloudinary definitivamente?${warning}`)) return;
    try {
      await api("/media", { method: "DELETE", body: { publicId: img.publicId } });
      setRemoved((list) => [...list, img.publicId]);
      toast.success("Foto eliminada de Cloudinary.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const copy = async (url) => {
    await navigator.clipboard.writeText(url);
    toast.success("Enlace copiado.");
  };

  return (
    <div className="stack">
      <PageHeader
        title="Fotos"
        description="Biblioteca de imágenes de la web, guardadas en Cloudinary."
        actions={<Segmented label="Carpeta" value={all} onChange={setAll} options={[{ value: false, label: "Carpeta de la web" }, { value: true, label: "Toda la cuenta" }]} />}
      />
      {error ? (
        <div className="notice"><CircleAlert aria-hidden="true" /><div><strong>No se pudo conectar con Cloudinary.</strong> {error.message}</div></div>
      ) : (
        <>
          <Card>
            <Uploader onUploaded={reloadAll} />
          </Card>
          {loading && !images.length ? (
            <PageLoader />
          ) : images.length ? (
            <>
              <div className="media-grid">
                {images.map((img) => (
                  <div key={img.publicId} className="media-item">
                    <a href={img.url} target="_blank" rel="noopener noreferrer"><img src={cdn(img.url, 300)} alt="" loading="lazy" /></a>
                    <div className="media-item__actions">
                      <Button size="sm" variant="secondary" icon={Copy} aria-label="Copiar enlace" onClick={() => copy(img.url)} />
                      <Button size="sm" variant="secondary" icon={ExternalLink} aria-label="Abrir" href={img.url} target="_blank" rel="noopener noreferrer" />
                      <Button size="sm" variant="danger" icon={Trash2} aria-label="Eliminar" onClick={() => remove(img)} />
                    </div>
                    <div className="media-item__meta">
                      <span title={img.usedBy || ""}>{img.usedBy || "Sin usar"}</span>
                      <span>{date(img.createdAt, { day: "2-digit", month: "short" })}</span>
                    </div>
                  </div>
                ))}
              </div>
              {cursor && <div><Button variant="secondary" onClick={loadMore} loading={loading}>Cargar más</Button></div>}
            </>
          ) : (
            <Empty icon={Images} title="Aún no hay fotos" />
          )}
        </>
      )}
    </div>
  );
};

export default Media;
