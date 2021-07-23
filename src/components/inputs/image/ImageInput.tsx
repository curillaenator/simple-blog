import styled from "styled-components";

import { icons } from "../../../assets/icons/icons";
import { colors } from "../../../utils/colors";

import type { FC } from "react";

const InputStyled = styled.div`
  .input_show {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 40px;
    padding: 0 1rem;
    background-color: ${colors.backGrayLight};
    border-radius: 1rem;
    transition: 0.08 linear;
    cursor: pointer;

    &_title {
      user-select: none;
    }

    & > svg {
      transition: 0.08 linear;
      fill: ${colors.backPrimary};
    }
  }

  &:hover {
    .input_show {
      color: ${colors.success};

      & > svg {
        fill: ${colors.success};
      }
    }
  }

  &:active {
    .input_show {
      color: ${colors.successDark};

      & > svg {
        fill: ${colors.successDark};
      }
    }
  }

  .input_hide {
    display: none;
  }
`;

interface IImageInput {
  name: string;
  id: string;
  imageHandler: (files: FileList) => void;
}

export const ImageInput: FC<IImageInput> = ({ name, id, imageHandler }) => {
  return (
    <InputStyled>
      <label className="input_show" htmlFor={id}>
        {icons.image}
        <span className="input_show_title">Заглавное фото поста</span>
      </label>

      <input
        name={name}
        id={id}
        className="input_hide"
        type="file"
        onChange={({ target }) => imageHandler(target.files!)}
      />
    </InputStyled>
  );
};
