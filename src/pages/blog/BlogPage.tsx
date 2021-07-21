import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";

import Header from "../../components/header";
import PostList from "../../components/postlist";

import type { TState } from "../../redux/store";

type TBlog = ConnectedProps<typeof connector>;

const Blog: FC<TBlog> = ({ posts, user }) => {
  return (
    <div className="page">
      <Header user={user}/>
      <PostList posts={posts} />;
    </div>
  );
};

const mstp = (state: TState) => ({
  posts: state.main.posts,
  user: state.main.user,
});

const mdtp = {};

const connector = connect(mstp, mdtp);

const BlogPage = connector(Blog);

export default BlogPage;
