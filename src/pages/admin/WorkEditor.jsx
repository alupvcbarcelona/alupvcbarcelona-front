import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Images, Save, Star, Trash2, X } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import Uploader from "../../components/admin/Uploader";
import MediaPicker from "../../components/admin/MediaPicker";
import { Badge, Button, Card, Input, Modal, PageLoader, Select, Switch, Textarea } from "../../components/ui";
import { api, cdn } from "../../services/api";
import { useSeo } from "../../hooks/useDocumentTitle";
import { toInputDate } from "../../lib/format";
import { WORK_CATEGORIES } from "../../config/site";
import { useApi } from "../../hooks/useApi";

const EMPTY = { title: "", category: "Ventanas", location: "", excerpt: "", content: "", images: [], published: true, featured: false, workDate: "" };

const WorkEditor = () => {
  const { id } = useParams();
  const isNew = !id || id === "nuevo";
  const navigate = useNavigate();
  const [post, setPost] = useState(isNew ? EMPTY : null);
  const [saving, setSaving] = useState(false);
  const [picker, setPicker] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteImages, setDeleteImages] = useState(false);
  useSeo(isNew ? "Nuevo trabajo" : "Editar trabajo");
  const servicesApi = useApi("/services/admin/all");

  useEffect(() => {
    if (!isNew) api(`/posts/admin/${id}`).then(({ data }) => setPost(data)).catch((e) => toast.error(e.message));
  }, [id, isNew]);

  if (!post) return <PageLoader />;

  const set = (name) => (e) => setPost((p) => ({ ...p, [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const setImages = (fn) => setPost((p) => ({ ...p, images: fn(p.images) }));
  const moveImage = (i, dir) =>
    setImages((imgs) => {
      const next = [...imgs];
      [next[i], next[i + dir]] = [next[i + dir], next[i]];
      return next;
    });

  const save = async (e) => {
    e?.preventDefault();
    if (!post.title.trim()) return toast.error("El título es obligatorio.");
    setSaving(true);
    try {
      const body = { ...post, workDate: post.workDate || undefined };
      const res = await api(isNew ? "/posts" : `/posts/${id}`, { method: isNew ? "POST" : "PUT", body });
      toast.success(res.message);
      if (isNew) navigate(`/admin/trabajos/${res.data._id}`, { replace: true });
      else setPost(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    try {
      const res = await api(`/posts/${id}?deleteImages=${deleteImages}`, { method: "DELETE" });
      toast.success(res.message);
      navigate("/admin/trabajos");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form className="stack" onSubmit={save}>
      <PageHeader
        back={<Link to="/admin/trabajos" className="back-link"><ArrowLeft /> Trabajos</Link>}
        title={isNew ? "Nuevo trabajo" : post.title}
        actions={
          <>
            {!isNew && post.published && <Button variant="ghost" icon={ExternalLink} href={`/trabajos/${post.slug}`} target="_blank">Ver</Button>}
            {!isNew && <Button variant="danger" icon={Trash2} onClick={() => setDeleteOpen(true)}>Eliminar</Button>}
            <Button type="submit" icon={Save} loading={saving}>Guardar</Button>
          </>
        }
      />

      <div className="admin-grid">
        <div className="col-8 stack">
          <Card title="Contenido">
            <div className="stack" style={{ gap: 16 }}>
              <Input label="Título *" value={post.title} onChange={set("title")} placeholder="Ej. Ventanas de PVC en un ático de Badalona" />
              <Textarea label="Resumen" rows={2} maxLength={300} value={post.excerpt} onChange={set("excerpt")} hint="Una o dos frases. Se muestra bajo el título." />
              <Textarea label="Descripción del trabajo" rows={8} value={post.content} onChange={set("content")} hint="Deja una línea en blanco entre párrafos." />
            </div>
          </Card>

          <Card title={`Fotos (${post.images.length})`} actions={<Button size="sm" variant="secondary" icon={Images} onClick={() => setPicker(true)}>Desde la biblioteca</Button>}>
            <div className="stack" style={{ gap: 16 }}>
              <Uploader onUploaded={(imgs) => setImages((current) => [...current, ...imgs])} />
              {post.images.length > 0 && (
                <div className="media-grid">
                  {post.images.map((img, i) => (
                    <div key={img.publicId || img.url} className="media-item">
                      <img src={cdn(img.url, 300)} alt={img.alt || ""} />
                      {i === 0 && <span className="media-item__cover"><Badge tone="accent" plain>Portada</Badge></span>}
                      <div className="media-item__actions">
                        {i > 0 && <Button size="sm" variant="secondary" icon={ChevronLeft} aria-label="Mover a la izquierda" onClick={() => moveImage(i, -1)} />}
                        {i < post.images.length - 1 && <Button size="sm" variant="secondary" icon={ChevronRight} aria-label="Mover a la derecha" onClick={() => moveImage(i, 1)} />}
                        {i > 0 && <Button size="sm" variant="secondary" icon={Star} aria-label="Usar como portada" onClick={() => setImages((imgs) => [img, ...imgs.filter((_, j) => j !== i)])} />}
                        <Button size="sm" variant="secondary" icon={X} aria-label="Quitar del trabajo" onClick={() => setImages((imgs) => imgs.filter((_, j) => j !== i))} />
                      </div>
                      <input className="input input--sm" style={{ border: 0, borderTop: "1px solid var(--line)", borderRadius: 0 }} placeholder="Descripción de la foto" value={img.alt || ""} onChange={(e) => setImages((imgs) => imgs.map((x, j) => (j === i ? { ...x, alt: e.target.value } : x)))} aria-label="Texto alternativo" />
                    </div>
                  ))}
                </div>
              )}
              <p className="small muted">Quitar una foto del trabajo no la borra de Cloudinary. Para borrarla definitivamente, ve a «Fotos».</p>
            </div>
          </Card>
        </div>

        <div className="col-4 stack">
          <Card title="Publicación">
            <div className="stack" style={{ gap: 16 }}>
              <Switch label="Publicado en la web" checked={post.published} onChange={set("published")} />
              <Switch label="Destacado en la página de inicio" checked={post.featured} onChange={set("featured")} />
            </div>
          </Card>
          <Card title="Detalles">
            <div className="stack" style={{ gap: 16 }}>
              <Select label="Categoría" value={post.category} onChange={set("category")} options={[...new Set([...(servicesApi.data?.data || []).map((s) => s.title), ...WORK_CATEGORIES, post.category].filter(Boolean))]} />
              <Input label="Ubicación" value={post.location || ""} onChange={set("location")} placeholder="Ej. El Masnou" />
              <Input label="Fecha del trabajo" type="date" value={toInputDate(post.workDate)} onChange={set("workDate")} />
            </div>
          </Card>
        </div>
      </div>

      <MediaPicker open={picker} onClose={() => setPicker(false)} exclude={post.images.map((i) => i.publicId)} onPick={(imgs) => setImages((current) => [...current, ...imgs])} />

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Eliminar trabajo"
        footer={<><Button variant="secondary" onClick={() => setDeleteOpen(false)}>Cancelar</Button><Button variant="danger" icon={Trash2} onClick={remove}>Eliminar</Button></>}
      >
        <p>Se eliminará «{post.title}» de la web.</p>
        <label className="check">
          <input type="checkbox" checked={deleteImages} onChange={(e) => setDeleteImages(e.target.checked)} />
          <span>Borrar también sus {post.images.length} fotos de Cloudinary (las que no use otro trabajo).</span>
        </label>
      </Modal>
    </form>
  );
};

export default WorkEditor;
