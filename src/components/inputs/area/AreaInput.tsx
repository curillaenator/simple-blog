import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

import { colors } from "../../../utils/colors";

import type { FC } from "react";
import type { ITextInput } from "../../../types/types";

const InputStyled = styled.div`
  .label {
    margin-bottom: 0.5rem;
    padding: 0 1rem;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .input {
    padding: 1rem;
  }
`;

interface IAreaInput extends ITextInput {
  minRows?: number;
  maxRows?: number;
}

export const AreaInput: FC<IAreaInput> = ({
  name,
  value,
  label,
  placeholder = "Напишите что-нибудь",
  //   autoComplete = false,
  minRows = 3,
  maxRows = 12,
  onChange,
}) => {
  return (
    <InputStyled>
      <div className="label font_condensed">{label}</div>

      <TextareaAutosize
        className="input"
        name={name}
        minRows={minRows}
        maxRows={maxRows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputStyled>
  );
};
