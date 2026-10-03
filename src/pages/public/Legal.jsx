import { useLocation } from "react-router-dom";
import { Button } from "../../components/ui";
import { useCompany } from "../../context/CompanyContext";
import { useSeo } from "../../hooks/useDocumentTitle";
import { openCookieSettings } from "../../lib/consent";
import { COOKIE_TABLE, COOKIES, LEGAL, PRIVACY, UPDATED } from "./legal-content";

const PAGES = {
  "/aviso-legal": LEGAL,
  "/politicas-privacidad": PRIVACY,
  "/politicas-cookies": COOKIES,
};

const Body = ({ text }) => {
  const blocks = [];
  let list = [];
  text.split("\n").forEach((line) => {
    if (line.startsWith("- ")) list.push(line.slice(2));
    else {
      if (list.length) blocks.push({ list }), (list = []);
      if (line.trim()) blocks.push({ p: line });
    }
  });
  if (list.length) blocks.push({ list });
  return blocks.map((b, i) =>
    b.list ? (
      <ul key={i}>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>
    ) : (
      <p key={i}>{b.p}</p>
    ),
  );
};

const Legal = () => {
  const { pathname } = useLocation();
  const company = useCompany();
  const content = (PAGES[pathname] || LEGAL)(company);
  useSeo(content.title, content.intro);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Información legal</span>
          <h1>{content.title}</h1>
          <p className="lead">{content.intro}</p>
          <p className="legal__updated" style={{ marginTop: 12 }}>Última actualización: {UPDATED}</p>
        </div>
      </section>
      <div className="container">
        <article className="legal">
          {content.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              {s.table ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr><th>Nombre</th><th>Tipo</th><th>Finalidad</th><th>Duración</th><th>Titular</th></tr>
                    </thead>
                    <tbody>
                      {COOKIE_TABLE.map((c) => (
                        <tr key={c.name}><td><code>{c.name}</code></td><td>{c.type}</td><td>{c.purpose}</td><td>{c.duration}</td><td>{c.owner}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Body text={s.body} />
              )}
            </section>
          ))}
          {pathname === "/politicas-cookies" && (
            <div style={{ marginTop: 32 }}>
              <Button onClick={openCookieSettings}>Configurar cookies</Button>
            </div>
          )}
        </article>
      </div>
    </>
  );
};

export default Legal;
