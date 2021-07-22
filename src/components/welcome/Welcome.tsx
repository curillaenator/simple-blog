import styled from "styled-components";

import type { FC } from "react";

import logoDark from "../../assets/images/logo_dark.png";

const WelcomeStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;

  .weltitle {
    text-align: center;
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 2rem;
  }

  .welimage {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;

    &-image {
      width: 100%;
      max-width: 410px;
      height: 100%;
      object-fit: contain;
    }
  }

  .weltext {
    text-align: center;
  }

  @media (min-width: 768px) {
    .weltitle {
      font-size: 3rem;
    }
  }
`;

const Welcome: FC = () => {
  return (
    <WelcomeStyled>
      <h1 className="weltitle">Это</h1>

      <div className="welimage">
        <img className="welimage-image" src={logoDark} alt="SimpleBlog" />
      </div>

      <p className="weltext">
        Войдите в свой аккаунт, чтобы начать использовать сервис,
      </p>

      <p className="weltext">
        нажав кнопку "Вход" в верхнем правом углу экрана
      </p>
    </WelcomeStyled>
  );
};

export default Welcome;
