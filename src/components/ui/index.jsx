import { useEffect, useId } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

// ----------------------
// BUTTON (button, <Link to> o <a href>)
// ----------------------
export const Button = ({ variant = "primary", size, block, icon: Icon, iconRight: IconRight, to, href, className = "", children, loading, ...props }) => {
  const classes = ["btn", `btn--${variant}`, size && `btn--${size}`, block && "btn--block", !children && "btn--icon", className].filter(Boolean).join(" ");
  const content = (
    <>
      {loading ? <span className="spinner" style={{ width: 16, height: 16, borderTopColor: "currentColor" }} /> : Icon && <Icon aria-hidden="true" />}
      {children}
      {IconRight && <IconRight aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={classes} {...props}>{content}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{content}</a>;
  return (
    <button type="button" className={classes} disabled={loading || props.disabled} {...props}>
      {content}
    </button>
  );
};

// ----------------------
// FIELDS
// ----------------------
export const Field = ({ label, hint, error, children, className = "", id }) => (
  <div className={`field ${className}`}>
    {label && <label className="field__label" htmlFor={id}>{label}</label>}
    {children}
    {error ? <span className="field__error">{error}</span> : hint && <span className="field__hint">{hint}</span>}
  </div>
);

export const Input = ({ label, hint, error, className, ...props }) => {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} className={className} id={id}>
      <input id={id} className="input" aria-invalid={Boolean(error)} {...props} />
    </Field>
  );
};

export const Textarea = ({ label, hint, error, className, ...props }) => {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} className={className} id={id}>
      <textarea id={id} className="textarea" aria-invalid={Boolean(error)} {...props} />
    </Field>
  );
};

export const Select = ({ label, hint, error, className, options = [], children, ...props }) => {
  const id = useId();
  return (
    <Field label={label} hint={hint} error={error} className={className} id={id}>
      <select id={id} className="select" {...props}>
        {children ||
          options.map((o) => {
            const value = typeof o === "object" ? o.value : o;
            return (
              <option key={value} value={value}>
                {typeof o === "object" ? o.label : o}
              </option>
            );
          })}
      </select>
    </Field>
  );
};

export const Switch = ({ label, ...props }) => (
  <label className="switch">
    <input type="checkbox" role="switch" {...props} />
    {label}
  </label>
);

// ----------------------
// FEEDBACK
// ----------------------
export const Badge = ({ tone, plain, children }) => (
  <span className={`badge ${tone ? `badge--${tone}` : ""} ${plain ? "badge--plain" : ""}`}>{children}</span>
);

export const Spinner = ({ size }) => <span className={`spinner ${size === "lg" ? "spinner--lg" : ""}`} role="status" aria-label="Cargando" />;

export const PageLoader = () => (
  <div className="page-loader">
    <Spinner size="lg" />
  </div>
);

export const Empty = ({ icon: Icon, title, children, action }) => (
  <div className="empty">
    {Icon && <Icon aria-hidden="true" />}
    {title && <p className="empty__title">{title}</p>}
    {children && <p className="small">{children}</p>}
    {action && <div style={{ marginTop: 12 }}>{action}</div>}
  </div>
);

export const Card = ({ title, actions, children, className = "", bodyClass = "card__body", ...props }) => (
  <section className={`card ${className}`} {...props}>
    {(title || actions) && (
      <header className="card__header">
        {typeof title === "string" ? <h2 className="card__title">{title}</h2> : title}
        {actions && <div style={{ display: "flex", gap: 8, alignItems: "center" }}>{actions}</div>}
      </header>
    )}
    <div className={bodyClass}>{children}</div>
  </section>
);

// ----------------------
// MODAL
// ----------------------
export const Modal = ({ open, onClose, title, children, footer, size }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={`modal__dialog ${size === "lg" ? "modal__dialog--lg" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
        <header className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <Button variant="ghost" size="sm" icon={X} onClick={onClose} aria-label="Cerrar" />
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>
  );
};

// ----------------------
// SEGMENTED CONTROL
// ----------------------
export const Segmented = ({ value, onChange, options, label }) => (
  <div className="segmented" role="group" aria-label={label}>
    {options.map((o) => (
      <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
        {o.label}
      </button>
    ))}
  </div>
);

// ----------------------
// STARS
// ----------------------
export const Stars = ({ value = 0, size = 16 }) => (
  <span className="stars" aria-label={`${value} de 5 estrellas`} style={{ "--size": `${size}px` }}>
    {[1, 2, 3, 4, 5].map((n) => (
      <svg key={n} viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className={n <= Math.round(value) ? "is-on" : ""}>
        <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
      </svg>
    ))}
  </span>
);
