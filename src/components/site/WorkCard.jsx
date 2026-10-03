import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { cdn } from "../../services/api";

const WorkCard = ({ post }) => {
  const cover = post.images?.[0];
  return (
    <Link to={`/trabajos/${post.slug}`} className="work-card">
      <div className="work-card__media">
        {cover ? <img src={cdn(cover.url, 800)} alt={cover.alt || post.title} loading="lazy" /> : <div className="work-card__placeholder" />}
        {post.images?.length > 1 && <span className="work-card__count">{post.images.length} fotos</span>}
      </div>
      <div className="work-card__body">
        <span className="eyebrow">{post.category}</span>
        <h3>{post.title}</h3>
        {post.location && (
          <span className="work-card__location">
            <MapPin aria-hidden="true" /> {post.location}
          </span>
        )}
      </div>
    </Link>
  );
};

export default WorkCard;
