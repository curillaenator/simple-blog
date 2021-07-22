import styled from "styled-components";

import { User } from "./User";
import { Logo } from "./Logo";
import { ButtonGhost } from "../buttons/buttonGhost/ButtonGhost";
import { Dropdown } from "../dropdown/Dropdown";

import { colors } from "../../utils/colors";
import { icons } from "../../assets/icons/icons";

import logo from "../../assets/images/logo.png";

import type { FC } from "react";
import type { IUser } from "../../types/types";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  margin-bottom: 1.5rem;
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
    margin-bottom: 2rem;
    padding: 0 2rem;
    border-radius: 0 0 2rem 2rem;
  }
`;

interface IHeader {
  user: IUser;
  signInWithGoogle: () => void;
  logOut: () => void;
}

const Header: FC<IHeader> = ({ user, signInWithGoogle, logOut }) => {
  const userMenu = [
    {
      id: "menu1",
      title: "Редактировать профиль",
      icon: icons.pencil,
      handler: () => {},
    },
    {
      id: "menu2",
      title: "Открыть мой чат",
      icon: icons.chat,
      handler: () => {},
    },
    {
      id: "menu3",
      title: "Моя барахолка",
      icon: icons.shop,
      handler: () => {},
    },
    {
      id: "menu4",
      title: "Выйти из аккаунта",
      icon: icons.logout,
      handler: logOut,
    },
  ];

  return (
    <HeaderStyled>
      <Logo image={logo} />

      {user.role === "guest" && (
        <ButtonGhost
          title="Вход"
          color={colors.fontWhite}
          handler={signInWithGoogle}
        />
      )}

      {user.role !== "guest" && (
        <Dropdown options={userMenu} mtop={4.2}>
          <User user={user} />
        </Dropdown>
      )}
    </HeaderStyled>
  );
};

export default Header;
