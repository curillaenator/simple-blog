import styled from "styled-components";

import { colors } from "../../utils/colors";

import type { IUser } from "../../types/types";
import type { FC } from "react";

interface IUserStyled {
  size: number;
}

const UserStyled = styled.div<IUserStyled>`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  .name {
    display: none;
    font-size: ${({ size }) => size / 1.67}rem;
    font-weight: 600;
    color: ${colors.fontWhite};
    user-select: none;
  }

  .avatar {
    width: ${({ size }) => 1.2 * size}rem;
    height: ${({ size }) => 1.2 * size}rem;
    border-radius: 50%;
    border: 2px solid ${colors.backWhite};
    object-fit: cover;
    transition: 0.08s linear;
  }

  &:hover {
    .avatar {
      transform: scale(1.08);
    }
  }

  &:active {
    .avatar {
      transform: scale(1);
    }
  }

  @media (min-width: 768px) {
    .name {
      display: block;
    }

    .avatar {
      width: ${({ size }) => 1.67 * size}rem;
      height: ${({ size }) => 1.67 * size}rem;
    }
  }
`;

interface IUserComp {
  user: IUser;
  size?: number;
}

export const User: FC<IUserComp> = ({ user, size = 2 }) => {
  return (
    <UserStyled size={size}>
      <span className="name">{user.username}</span>

      <img
        className="avatar"
        src={user.avatar}
        alt={user.username}
        draggable={false}
      />
    </UserStyled>
  );
};
