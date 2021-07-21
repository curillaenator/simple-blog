import { FC } from "react";
import styled from "styled-components";

import { User } from "./User";
import { Logo } from "./Logo";

import { colors } from "../../utils/colors";

import logo from "../../assets/images/logo.png";

import type { IUser } from "../../types/types";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  margin-bottom: 2rem;
  padding: 0 1rem;
  border-radius: 0 0 1rem 1rem;
  background-color: ${colors.backPrimary};
  background: radial-gradient(
    circle,
    rgba(95, 101, 115, 1) 0%,
    rgba(56, 60, 68, 1) 100%
  );
  box-shadow: 0 12px 16px ${colors.backPrimary50};

  @media (min-width: 768px) {
    height: 96px;
    padding: 0 2rem;
    border-radius: 0 0 2rem 2rem;
  }
`;

interface IHeader {
  user: IUser;
}

const Header: FC<IHeader> = ({ user }) => {
  return (
    <HeaderStyled>
      <Logo image={logo} />

      <User user={user} />
    </HeaderStyled>
  );
};

export default Header;
