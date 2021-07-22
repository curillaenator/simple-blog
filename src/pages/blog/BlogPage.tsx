import { connect, ConnectedProps } from "react-redux";

import PostList from "../../components/postlist";

import type { FC } from "react";
import type { TState } from "../../redux/store";

type TBlog = ConnectedProps<typeof connector>;

const Blog: FC<TBlog> = ({ posts }) => {
  return (
    <div className="page">
      <PostList posts={posts} />
    </div>
  );
};

const mstp = (state: TState) => ({
  posts: state.main.posts,
});

const mdtp = {};

const connector = connect(mstp, mdtp);

export default connector(Blog);
