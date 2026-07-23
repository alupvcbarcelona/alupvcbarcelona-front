import Img from "../Img/Img";
const logo = "/public/logo_2.png";
import "./AluPVCLogo.css";

const AluPVCLogo = () => {
  return (
    <div className="alupvc-logo fadeIn">
      <div className="logo-container">
        <svg
          viewBox="0 0 600 400"
          className="logo-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--p-bg-secondary)" />
              <stop offset="100%" stopColor="var(--p-bg-secondary)" />
            </linearGradient>
          </defs>

          {/* A izquierda */}
          <polygon
            className="a-left"
            points="70,290 170,70 220,70 120,290"
            fill="url(#grad)"
          />

          {/* A derecha */}
          <polygon
            className="a-right"
            points="220,70 320,290 270,290 170,90"
            fill="url(#grad)"
          />

          {/* P */}
          <path
            className="letter-p"
            d="
    M285 70
    H470
    C535 70 570 105 570 150
    C570 195 535 230 470 230
    H395
    L435 290
    H365
    L325 180
    H470
    C505 180 520 167 520 150
    C520 133 505 120 470 120
    H305
    Z"
            fill="url(#grad)"
          />

          {/* Línea izquierda */}
          <rect
            className="line-left"
            x="30"
            y="345"
            width="115"
            height="8"
            rx="4"
            fill="url(#grad)"
          />

          {/* Línea derecha */}
          <rect
            className="line-right"
            x="455"
            y="345"
            width="115"
            height="8"
            rx="4"
            fill="url(#grad)"
          />

          {/* BCN */}
          <text
            x="300"
            y="366"
            textAnchor="middle"
            className="logo-text logo-bcn"
          >
            BCN
          </text>
        </svg>
      </div>
    </div>
  );
};

export default AluPVCLogo;
