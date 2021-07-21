import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { initializeApp } from "../../redux/reducers/main";

import BlogPage from "../../pages/blog/BlogPage";

import { colors } from "../../utils/colors";

const AppContainer = styled.main`
  max-width: 1280px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 1rem;
  color: ${colors.fontDark};
  font-size: 15px;
`;

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return (
    <AppContainer>
      <Switch>
        <Route exact path="/" render={() => <BlogPage />} />
      </Switch>
    </AppContainer>
  );
};

export default App;
