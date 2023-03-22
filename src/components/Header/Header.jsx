import "../../css/Header/Header.css";
import logo from "../../assets/img/see_logo.png";

function Header() {
  return (
    <div className="Header">
      <div className="Container-Logo">
        <img src={logo} className="Img-Logo" alt="logo"/>
      </div>    
    </div>
  );
}

export default Header;

