import { FC } from "react";
import styled from "styled-components";

const LogoStyled = styled.div`
  .image {
    border: none;
    height: 2rem;
  }

  @media (min-width: 768px) {
    .image {
      height: 3rem;
    }
  }
`;

interface ILogo {
  image: string;
}

export const Logo: FC<ILogo> = ({ image }) => {
  return (
    <LogoStyled>
      <img className="image" src={image} alt="Simple Blog" />
    </LogoStyled>
  );
};
