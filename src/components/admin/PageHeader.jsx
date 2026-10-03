const PageHeader = ({ title, description, actions, back }) => (
  <header className="page-header">
    <div>
      {back}
      <h1>{title}</h1>
      {description && <p className="muted small">{description}</p>}
    </div>
    {actions && <div className="page-header__actions">{actions}</div>}
  </header>
);

export default PageHeader;
