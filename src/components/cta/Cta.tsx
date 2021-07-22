import styled from "styled-components";

import { Button } from "../buttons/button/Button";

import type { FC } from "react";

import { colors } from "../../utils/colors";
import { icons } from "../../assets/icons/icons";

const CtaStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  .line {
    width: 100%;
    height: 2px;
    background-color: ${colors.backPrimary};
  }

  .buttons {
    flex-shrink: 0;
  }
`;

const Cta: FC = () => {
  return (
    <CtaStyled>
      <div className="line"></div>

      <div className="buttons">
        <Button title="Добавить новый пост" icon={icons.plus} />
      </div>

      <div className="line"></div>
    </CtaStyled>
  );
};

export default Cta;
