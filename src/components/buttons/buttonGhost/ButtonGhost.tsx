import { FC, ReactNode } from "react";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

interface IStyledButton {
  color: string;
}

const StyledButton = styled.button<IStyledButton>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  min-height: 40px;
  padding: 0 1rem;

  .title {
    font-size: 1.05rem;
    color: ${({ color }) => color};
    transition: 0.08s linear;
  }

  & > svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    .title {
      transform: scale(1.2);
    }
  }

  &:active {
    .title {
      transform: scale(1);
    }
  }
`;

interface IButtonGhost {
  title: string;
  icon?: ReactNode;
  color?: string;
  handler?: () => void;
}

export const ButtonGhost: FC<IButtonGhost> = ({
  title,
  icon,
  color = colors.fontDark,
  handler = () => console.log("btn_ghost"),
}) => {
  return (
    <StyledButton color={color} onClick={handler}>
      {icon && icon}
      <span className="title">{title}</span>
    </StyledButton>
  );
};
