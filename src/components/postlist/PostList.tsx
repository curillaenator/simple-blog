import { FC } from "react";
import styled from "styled-components";

import { Post } from "./post/Post";

import type { IPosts } from "../../types/types";

const PostListStyled = styled.section``;


interface IPostList {
  posts: IPosts[];
}

const PostList: FC<IPostList> = ({ posts }) => {
  return (
    <PostListStyled>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </PostListStyled>
  );
};

export default PostList;
