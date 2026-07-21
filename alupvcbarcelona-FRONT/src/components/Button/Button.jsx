import "./Button.css";

const Button = ({
  children,
  icon,
  ariaLabel,
  bgColor = "var(--p-bg-secondary)",
  textColor = "var(--p-text-primary_2)",
  p,
  br,
  w = "auto",
  h = "auto",
  type = "button",
  onClick,
  className = "",
  style = {},
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`button ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding: p,
        borderRadius: br,
        width: w,
        height: h,
        ...style,
      }}
      {...props}
    >
      {icon && <span className="button__icon">{icon}</span>}

      {children && <span className="button__text">{children}</span>}
    </button>
  );
};

export default Button;