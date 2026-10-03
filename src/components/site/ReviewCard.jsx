import { Stars } from "../ui";
import { date } from "../../lib/format";

const capitalize = (text = "") => text.charAt(0).toUpperCase() + text.slice(1);

const ReviewCard = ({ review }) => (
  <article className="review-card">
    <Stars value={review.stars} />
    <h3>{capitalize(review.title)}</h3>
    <p>{capitalize(review.description)}</p>
    <footer>
      <strong>{review.username}</strong>
      <span>
        {review.location ? `${review.location} · ` : ""}
        {date(review.createdAt, { month: "long", year: "numeric" })}
      </span>
    </footer>
  </article>
);

export default ReviewCard;
