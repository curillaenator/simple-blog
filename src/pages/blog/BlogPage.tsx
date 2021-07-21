import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";

import Header from "../../components/headers";
import PostList from "../../components/postlist";
import { Loader } from "../../components/loader/Loader";

import type { TState } from "../../redux/store";

import { signInWithGoogle } from "../../redux/reducers/main";

import { icons } from "../../assets/icons/icons";

type TBlog = ConnectedProps<typeof connector>;

const Blog: FC<TBlog> = ({ initialized, posts, user, signInWithGoogle }) => {
  if (!initialized) {
    return <Loader icon={icons.loader} title="Загружаю..." fullscreen />;
  }

  return (
    <div className="page">
      <Header user={user} signInWithGoogle={signInWithGoogle} />
      <PostList posts={posts} />
    </div>
  );
};

const mstp = (state: TState) => ({
  initialized: state.main.initialized,
  posts: state.main.posts,
  user: state.main.user,
});

const mdtp = {
  signInWithGoogle,
};

const connector = connect(mstp, mdtp);

const BlogPage = connector(Blog);

export default BlogPage;
