import Img from "../Img/Img";
import logo from "../../../public/logo.png"
import "./AluPVCLogo.css";

const AluPVCLogo = () => {
  return (
    <div className="alupvc-logo">
      {/* <div className="logo-text">
        <h1>
          <span className="dark">Alu</span>
          <span className="blue">PVC</span>
        </h1>

        <div className="subtitle">
          <span></span>
          <p>BCN</p>
          <span></span>
        </div>
      </div> */}
      <Img icon={logo} w="1200px" />
    </div>
  );
};

export default AluPVCLogo;
