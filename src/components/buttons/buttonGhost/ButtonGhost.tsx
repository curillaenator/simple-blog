import { FC, ReactNode } from "react";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

interface IStyledButton {
  color: string;
  danger: boolean;
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
    transition: 0.08s linear;
    white-space: nowrap;
    color: ${({ color, danger }) => {
      switch (true) {
        case danger:
          return colors.danger;
        default:
          return color;
      }
    }};
  }

  & > svg {
    width: 18px;
    height: 18px;
    transition: 0.08s linear;
    fill: ${({ color, danger }) => {
      switch (true) {
        case danger:
          return colors.danger;
        default:
          return color;
      }
    }};
  }

  &:hover {
    .title {
      color: ${colors.success};
    }

    & > svg {
      fill: ${colors.success};
    }
  }

  &:active {
    .title {
      color: ${colors.successDark};
    }

    & > svg {
      fill: ${colors.successDark};
    }
  }
`;

interface IButtonGhost {
  title: string;
  icon?: ReactNode;
  color?: string;
  danger?: boolean;
  handler?: () => void;
}

export const ButtonGhost: FC<IButtonGhost> = ({
  title,
  icon,
  color = colors.fontDark,
  danger = false,
  handler = () => console.log("btn_ghost"),
}) => {
  return (
    <StyledButton color={color} onClick={handler} danger={danger}>
      {icon && icon}
      <span className="title">{title}</span>
    </StyledButton>
  );
};
