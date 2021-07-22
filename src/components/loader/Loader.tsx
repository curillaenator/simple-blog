import styled from "styled-components";

import { icons } from "../../assets/icons/icons";

import type { FC, ReactNode } from "react";

interface ILoaderStyled {
  fs: boolean;
}

const LoaderStyled = styled.div<ILoaderStyled>`
  position: ${({ fs }) => (fs ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ fs }) => (fs ? "100vw" : "100%")};
  height: ${({ fs }) => (fs ? "100vh" : "100%")};

  .content {
    display: flex;
    align-items: center;
    min-height: 1.2rem;
    gap: 0.25rem;

    & > svg {
      width: 2.5rem;
      height: 2.5rem;
    }

    &_title {
      font-size: 1.2rem;
      font-weight: 600;
    }
  }
`;

interface ILoader {
  title?: string;
  icon?: ReactNode;
  fullscreen?: boolean;
}

export const Loader: FC<ILoader> = ({
  title = "Загружаю...",
  icon = icons.loader,
  fullscreen = false,
}) => {
  return (
    <LoaderStyled fs={fullscreen}>
      <div className="content">
        {icon}
        <span className="content_title">{title}</span>
      </div>
    </LoaderStyled>
  );
};
