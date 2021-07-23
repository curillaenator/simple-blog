import styled from "styled-components";

import { Button } from "../../buttons/button/Button";

import type { FC } from "react";

import { colors } from "../../../utils/colors";
import { icons } from "../../../assets/icons/icons";

const CtaStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  .line {
    width: 100%;
    height: 2px;
    background-color: ${colors.backPrimary};
    border-radius: 2px;
  }

  .buttons {
    flex-shrink: 0;
  }
`;

interface ICta {
  active: boolean;
  handler: () => void;
}

const Cta: FC<ICta> = ({ active, handler }) => {
  return (
    <CtaStyled>
      <div className="line"></div>

      <div className="buttons">
        <Button
          title={active ? "Передумал" : "Добавить новый пост"}
          icon={active ? icons.back : icons.plus}
          active={active}
          handler={handler}
        />
      </div>

      <div className="line"></div>
    </CtaStyled>
  );
};

export default Cta;
