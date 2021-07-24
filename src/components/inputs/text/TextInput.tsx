import styled from "styled-components";

// import { colors } from "../../../utils/colors";

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
    
    height: 56px;
  }
`;

export const TextInput: FC<ITextInput> = ({
  name,
  value,
  label,
  placeholder = "Напишите что-нибудь",
  autoComplete = false,
  onChange,
}) => {
  return (
    <InputStyled>
      <div className="label font_condensed">{label}</div>

      <input
        type="text"
        className="input"
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete ? "on" : "off"}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputStyled>
  );
};
