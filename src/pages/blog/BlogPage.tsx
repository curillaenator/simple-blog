import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";

import Header from "../../components/header";
import PostList from "../../components/postlist";

import type { TState } from "../../redux/store";

import { signInWithGoogle } from "../../redux/reducers/main";

type TBlog = ConnectedProps<typeof connector>;

const Blog: FC<TBlog> = ({ posts, user, signInWithGoogle }) => {
  return (
    <div className="page">
      <Header user={user} signInWithGoogle={signInWithGoogle} />
      <PostList posts={posts} />;
    </div>
  );
};

const mstp = (state: TState) => ({
  posts: state.main.posts,
  user: state.main.user,
});

const mdtp = { signInWithGoogle };

const connector = connect(mstp, mdtp);

const BlogPage = connector(Blog);

export default BlogPage;
