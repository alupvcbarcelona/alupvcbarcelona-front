import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

// ----------------------
// GRÁFICOS SVG LIGEROS
// Paleta validada (--chart-1 / --chart-2), líneas de 2px, rejilla tenue, tooltip al pasar el ratón
// ----------------------
const niceMax = (value) => {
  if (value <= 0) return 4;
  const pow = 10 ** Math.floor(Math.log10(value));
  const n = value / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
};

const Tooltip = ({ x, y, width, children }) => {
  const left = Math.min(Math.max(x, 70), width - 70);
  return (
    <div className="chart-tooltip" style={{ left, top: y }}>
      {children}
    </div>
  );
};

// ÁREA / LÍNEA (UNA SERIE)
export const AreaChart = ({ data, x, y, label = "Visitas", height = 220, format = (v) => v, formatX = (v) => v }) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(null); // { i, width }
  const W = 640;
  const H = height;
  const pad = { top: 12, right: 8, bottom: 26, left: 36 };
  const max = niceMax(Math.max(...data.map((d) => d[y]), 0));
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const px = (i) => pad.left + (data.length <= 1 ? innerW / 2 : (i / (data.length - 1)) * innerW);
  const py = (v) => pad.top + innerH - (v / max) * innerH;

  const line = data.map((d, i) => `${i ? "L" : "M"}${px(i)},${py(d[y])}`).join(" ");
  const area = `${line} L${px(data.length - 1)},${pad.top + innerH} L${px(0)},${pad.top + innerH} Z`;
  const ticks = [0, max / 2, max];
  const every = Math.ceil(data.length / 6);

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((relX - pad.left) / innerW) * (data.length - 1));
    setHover({ i: Math.max(0, Math.min(data.length - 1, i)), width: rect.width });
  };
  const h = hover?.i ?? null;

  return (
    <div className="chart" ref={ref} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={label} style={{ height }}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={W - pad.right} y1={py(t)} y2={py(t)} className="chart-grid" />
            <text x={pad.left - 8} y={py(t) + 4} textAnchor="end" className="chart-axis">{format(t)}</text>
          </g>
        ))}
        {data.map((d, i) => i % every === 0 && (
          <text key={d[x]} x={px(i)} y={H - 6} textAnchor="middle" className="chart-axis">{formatX(d[x])}</text>
        ))}
        <path d={area} fill="var(--chart-1)" opacity="0.1" />
        <path d={line} fill="none" stroke="var(--chart-1)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {h !== null && (
          <>
            <line x1={px(h)} x2={px(h)} y1={pad.top} y2={pad.top + innerH} stroke="var(--line-strong)" vectorEffect="non-scaling-stroke" />
            <circle cx={px(h)} cy={py(data[h][y])} r="4" fill="var(--chart-1)" stroke="#fff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
      {h !== null && (
        <Tooltip x={(px(h) / W) * hover.width} y={8} width={hover.width}>
          <span>{formatX(data[h][x], true)}</span>
          <strong>{format(data[h][y])} {label.toLowerCase()}</strong>
        </Tooltip>
      )}
    </div>
  );
};

// BARRAS AGRUPADAS (HASTA 2 SERIES, CON LEYENDA)
export const BarChart = ({ data, x, series, height = 220, format = (v) => v, formatX = (v) => v }) => {
  const [hover, setHover] = useState(null); // { i, width }
  const W = 640;
  const H = height;
  const pad = { top: 12, right: 8, bottom: 26, left: 52 };
  const max = niceMax(Math.max(...data.flatMap((d) => series.map((s) => d[s.key])), 0));
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const band = innerW / data.length;
  const barW = Math.min(18, (band - 8) / series.length - 2);
  const py = (v) => pad.top + innerH - (v / max) * innerH;
  const colors = ["var(--chart-1)", "var(--chart-2)"];

  return (
    <div className="chart" onMouseLeave={() => setHover(null)}>
      <div className="chart-legend">
        {series.map((s, i) => (
          <span key={s.key}><i style={{ background: colors[i] }} />{s.label}</span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={series.map((s) => s.label).join(" y ")} style={{ height }}>
        {[0, max / 2, max].map((t) => (
          <g key={t}>
            <line x1={pad.left} x2={W - pad.right} y1={py(t)} y2={py(t)} className="chart-grid" />
            <text x={pad.left - 8} y={py(t) + 4} textAnchor="end" className="chart-axis">{format(t, true)}</text>
          </g>
        ))}
        {data.map((d, i) => {
          const cx = pad.left + band * i + band / 2;
          const groupW = series.length * (barW + 2) - 2;
          return (
            <g key={d[x]} onMouseEnter={(e) => setHover({ i, width: e.currentTarget.ownerSVGElement.getBoundingClientRect().width })}>
              <rect x={pad.left + band * i} y={pad.top} width={band} height={innerH} fill={hover?.i === i ? "var(--bg-soft)" : "transparent"} />
              {series.map((s, si) => {
                const h = Math.max(0, pad.top + innerH - py(d[s.key]));
                const bx = cx - groupW / 2 + si * (barW + 2);
                return h > 0 ? (
                  <path key={s.key} fill={colors[si]} d={`M${bx},${pad.top + innerH} V${pad.top + innerH - h + Math.min(4, h)} Q${bx},${pad.top + innerH - h} ${bx + Math.min(4, barW / 2)},${pad.top + innerH - h} H${bx + barW - Math.min(4, barW / 2)} Q${bx + barW},${pad.top + innerH - h} ${bx + barW},${pad.top + innerH - h + Math.min(4, h)} V${pad.top + innerH} Z`} />
                ) : null;
              })}
              <text x={cx} y={H - 6} textAnchor="middle" className="chart-axis">{formatX(d[x])}</text>
            </g>
          );
        })}
      </svg>
      {hover && (
        <Tooltip x={((pad.left + band * hover.i + band / 2) / W) * hover.width} y={28} width={hover.width}>
          <span>{formatX(data[hover.i][x], true)}</span>
          {series.map((s, i) => (
            <strong key={s.key}><i style={{ background: colors[i] }} />{s.label}: {format(data[hover.i][s.key])}</strong>
          ))}
        </Tooltip>
      )}
    </div>
  );
};

// RANKING EN BARRAS HORIZONTALES (UNA SERIE)
export const BarList = ({ items, valueKey = "views", label = (i) => i.name, format = (v) => v, empty = "Sin datos" }) => {
  const max = useMemo(() => Math.max(...items.map((i) => i[valueKey]), 1), [items, valueKey]);
  if (!items.length) return <p className="muted small" style={{ padding: "12px 0" }}>{empty}</p>;
  return (
    <ul className="bar-list">
      {items.map((item, i) => (
        <li key={i} title={`${label(item)}: ${format(item[valueKey])}`}>
          <span className="bar-list__bar" style={{ width: `${(item[valueKey] / max) * 100}%` }} />
          <span className="bar-list__label">{label(item)}</span>
          <span className="bar-list__value num">{format(item[valueKey])}</span>
        </li>
      ))}
    </ul>
  );
};

// TARJETA DE MÉTRICA
export const Stat = ({ label, value, hint, change, icon: Icon, to }) => {
  const content = (
    <>
      <div className="stat__top">
        <span className="stat__label">{label}</span>
        {Icon && <Icon aria-hidden="true" />}
      </div>
      <strong className="stat__value num">{value}</strong>
      <span className="stat__hint">
        {change !== undefined && change !== null && (
          <span className={change > 0 ? "is-up" : change < 0 ? "is-down" : ""}>
            {change > 0 ? "▲" : change < 0 ? "▼" : "–"} {Math.abs(change)}%{" "}
          </span>
        )}
        {hint}
      </span>
    </>
  );
  return to ? <Link to={to} className="stat stat--link">{content}</Link> : <div className="stat">{content}</div>;
};
