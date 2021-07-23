import styled from "styled-components";

import type { FC, ReactNode } from "react";

import { colors } from "../../../utils/colors";

interface IButtonStyled {
  active: boolean;
}

const ButtonStyled = styled.button<IButtonStyled>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 3.5rem;
  padding: 0 1.5rem;
  border-radius: 1.2rem;
  transition: 0.08s linear;
  background-color: ${({ active }) =>
    active ? colors.backGrayLight : colors.backPrimary};

  .btnprimary {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ active }) => (active ? colors.fontDark : colors.fontWhite)};
  }

  & > svg {
    width: 18px;
    height: 18px;
    fill: ${({ active }) => (active ? colors.fontDark : colors.fontWhite)};
  }

  &:hover {
    background-color: ${({ active }) =>
      active ? colors.backGrayLight : colors.success};
  }

  &:active {
    background-color: ${colors.successDark};
  }
`;

interface IButton {
  title?: string;
  icon?: ReactNode;
  active?: boolean;
  handler?: () => void;
}

export const Button: FC<IButton> = ({
  title = "Кнопка",
  icon,
  active = false,
  handler = () => console.log("btn_prim"),
}) => {
  return (
    <ButtonStyled active={active} onClick={handler} role="button">
      {icon && icon}
      <span className="btnprimary">{title}</span>
    </ButtonStyled>
  );
};
