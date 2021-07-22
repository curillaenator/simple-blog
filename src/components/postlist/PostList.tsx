import { useEffect } from "react";
import styled from "styled-components";

import { Post } from "./post/Post";
import Cta from "../cta";

import type { FC } from "react";
import type { IPosts } from "../../types/types";

const PostListStyled = styled.section`
  .attention {
  }

  .postlist {
  }
`;

interface IPostList {
  posts: IPosts[];
  getAuthoredPosts: () => void;
}

const PostList: FC<IPostList> = ({ posts, getAuthoredPosts }) => {
  useEffect(() => getAuthoredPosts(), [posts, getAuthoredPosts]);

  return (
    <PostListStyled>
      <div className="attention">
        <Cta />
      </div>

      <div className="postlist">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </PostListStyled>
  );
};

export default PostList;
