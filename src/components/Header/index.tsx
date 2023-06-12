import { ReactNode } from "react";
import { HeaderContainer } from "./styles";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <HeaderContainer>{children}</HeaderContainer>;
};

export default Header;
