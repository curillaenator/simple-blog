import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";

import Post from "../../components/post";

import type { TState } from "../../redux/store";

type TBlog = ConnectedProps<typeof connector>;

const Blog: FC<TBlog> = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

const mstp = (state: TState) => ({
  posts: state.main.posts,
});

const mdtp = {};

const connector = connect(mstp, mdtp);

const BlogPage = connector(Blog);

export default BlogPage;
