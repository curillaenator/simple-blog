import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import BlogPage from "../../pages/blog/BlogPage";

import { initializeApp } from "../../redux/reducers/main";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4">
      <Switch>
        <Route exact path="/" render={() => <BlogPage />} />
      </Switch>
    </div>
  );
};

export default App;
