import { FC, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { Loader } from "../loader/Loader";
import Header from "../headers/Header";
import BlogPage from "../../pages/blog";
import ProfilePage from "../../pages/profile";

import {
  initializeApp,
  signInWithGoogle,
  logOut,
} from "../../redux/reducers/auth";

import { colors } from "../../utils/colors";

import type { TState } from "../../redux/store";

const AppContainer = styled.main`
  max-width: 1280px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 1rem;
  color: ${colors.fontDark};
  font-size: 15px;
`;

type TApp = ConnectedProps<typeof connector>;

const App: FC<TApp> = ({
  initialized,
  user,
  initializeApp,
  signInWithGoogle,
  logOut,
}) => {
  // console.log("render");

  useEffect(() => initializeApp(), [initializeApp]);

  if (!initialized) {
    return <Loader fullscreen />;
  }

  return (
    <AppContainer>
      <Header user={user} signInWithGoogle={signInWithGoogle} logOut={logOut} />

      <Switch>
        <Route exact path="/" render={() => <BlogPage />} />
        <Route path="/profile/:userid?" render={() => <ProfilePage />} />
      </Switch>
    </AppContainer>
  );
};

const mstp = (state: TState) => ({
  initialized: state.auth.initialized,
  user: state.auth.user,
});

const mdtp = {
  initializeApp,
  signInWithGoogle,
  logOut,
};

const connector = connect(mstp, mdtp);

export default connector(App);
