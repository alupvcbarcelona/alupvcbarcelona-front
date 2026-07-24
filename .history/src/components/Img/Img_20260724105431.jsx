import "./Img.css";

const Img = ({
  icon,
  w = 20,
  h = w,
  p = "0px",
  br = "0px",
  alt,
  title = null,
  action = () => {},
}) => {
  return (
    <img
      className="svg__icon"
      src={icon}
      width={w}
      height={h}
      style={{ padding: p, borderRadius: br }}
      alt={alt}
      title={title}
      onClick={action}
      loading="lazy"
    />
  );
};

export default Img;
