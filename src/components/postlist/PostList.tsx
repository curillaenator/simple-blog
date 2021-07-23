import { useEffect, useState, lazy, Suspense } from "react";
import styled from "styled-components";

import { Loader } from "../loader/Loader";
import Post from "./post";
import Cta from "./cta";

import type { FC } from "react";
import type { IPosts } from "../../types/types";

const PostForm = lazy(() => import("./postform"));

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
  const [postForm, setPostForm] = useState(false);

  useEffect(() => getAuthoredPosts(), [posts, getAuthoredPosts]);

  return (
    <PostListStyled>
      <div className="attention">
        <Cta active={postForm} handler={() => setPostForm((prev) => !prev)} />
      </div>

      {postForm && <PostForm />}

      {!postForm && (
        <div className="postlist">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </PostListStyled>
  );
};

export default PostList;
