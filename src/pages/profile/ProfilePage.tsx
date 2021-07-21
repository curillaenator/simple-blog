import { FC } from "react";
import styled from "styled-components";

import { Loader } from "../../components/loader/Loader";

import { icons } from "../../assets/icons/icons";

const PageStyled = styled.div``;

const ProfilePage: FC = () => {
  return (
    <PageStyled>
      <Loader icon={icons.loader} title="Загружаю" />
    </PageStyled>
  );
};

export default ProfilePage;
