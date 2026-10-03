const SectionHeader = ({ eyebrow, title, children, align = "left", action }) => (
  <div className={`section-header section-header--${align}`}>
    <div>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {children && <p className="lead">{children}</p>}
    </div>
    {action}
  </div>
);

export default SectionHeader;
