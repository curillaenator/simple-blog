import styled from "styled-components";

import type { FC, ReactNode } from "react";

import { colors } from "../../../utils/colors";

const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  min-height: 3.5rem;
  padding: 0 1.5rem;
  border-radius: 1.2rem;
  background-color: ${colors.backPrimary};
  transition: 0.08s linear;

  .btnprimary {
    font-size: 1rem;
    font-weight: 600;
    color: ${colors.fontWhite};
  }

  & > svg {
    width: 18px;
    height: 18px;
    fill: ${colors.fontWhite};
  }

  &:hover {
    background-color: ${colors.backPrimaryLight};
  }

  &:active {
    background-color: ${colors.backPrimary};
  }
`;

interface IButton {
  title?: string;
  icon?: ReactNode;
  handler?: () => void;
}

export const Button: FC<IButton> = ({
  title = "Кнопка",
  icon,
  handler = () => console.log("btn_prim"),
}) => {
  return (
    <ButtonStyled onClick={handler} role="button">
      {icon && icon}
      <span className="btnprimary">{title}</span>
    </ButtonStyled>
  );
};
