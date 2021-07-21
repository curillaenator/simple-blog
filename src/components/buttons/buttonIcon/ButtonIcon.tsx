import { FC, ReactNode } from "react";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

interface IButtonStyled {
  disabled: boolean;
  danger: boolean;
}

const ButtonStyled = styled.button<IButtonStyled>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  padding: 0 1rem;

  & > svg {
    width: 18px;
    height: 18px;
    transition: 0.08s linear;
    fill: ${({ disabled, danger }) => {
      switch (true) {
        case disabled:
          return colors.backPrimaryLight;
        case danger:
          return colors.danger;
        default:
          return colors.backPrimary;
      }
    }};
  }

  &:hover {
    & > svg {
      transform: scale(1.2);
    }
  }

  &:active {
    & > svg {
      transform: scale(1);
    }
  }
`;

interface IButtonIcon {
  icon: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  handler?: () => void;
}

export const ButtonIcon: FC<IButtonIcon> = ({
  icon,
  disabled = false,
  danger = false,
  handler = () => console.log("btn_icon"),
}) => {
  return (
    <ButtonStyled disabled={disabled} danger={danger} onClick={handler}>
      {icon}
    </ButtonStyled>
  );
};
