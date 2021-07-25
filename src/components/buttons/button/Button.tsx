import styled from "styled-components";

import type { FC, ReactNode } from "react";

import { colors } from "../../../utils/colors";

interface IButtonStyled {
  active: boolean;
  disabled: boolean;
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
  background-color: ${({ active, disabled }) =>
    active || disabled ? colors.backGrayLight : colors.backPrimary};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  .btnprimary {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ active, disabled }) => {
      switch (true) {
        case disabled:
          return colors.fontGray;
        case active:
          return colors.fontDark;
        default:
          return colors.fontWhite;
      }
    }};
  }

  & > svg {
    width: 18px;
    height: 18px;
    fill: ${({ active, disabled }) => {
      switch (true) {
        case disabled:
          return colors.fontGray;
        case active:
          return colors.fontDark;
        default:
          return colors.fontWhite;
      }
    }};
  }

  &:hover {
    background-color: ${({ active, disabled }) =>
      active || disabled ? colors.backGrayLight : colors.success};
  }

  &:active {
    background-color: ${({ disabled }) =>
      disabled ? colors.backGrayLight : colors.successDark};
  }
`;

interface IButton {
  title: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  handler?: () => void;
}

export const Button: FC<IButton> = ({
  title,
  icon,
  active = false,
  disabled = false,
  handler = () => {},
}) => {
  return (
    <ButtonStyled
      active={active}
      disabled={disabled}
      onClick={handler}
      role="button"
    >
      {icon && icon}
      <span className="btnprimary">{title}</span>
    </ButtonStyled>
  );
};
