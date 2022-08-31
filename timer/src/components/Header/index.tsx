import { NavLink } from "react-router-dom";
import { HeaderContainer } from "./styles";
import logo from "../../assets/logo-ignite.svg";
import { Scroll, Timer } from "phosphor-react";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <NavLink to="" title="timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
