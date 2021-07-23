import { useEffect, useState } from "react";
import styled from "styled-components";

import Post from "./post";
import Cta from "./cta";
import PostForm from "./postform";

import type { FC } from "react";
import type { IPosts, INewPost } from "../../types/types";

const PostListStyled = styled.section`
  .attention {
    margin-bottom: 2rem;
  }

  .postform {
    margin-bottom: 2rem;
  }

  .postlist {
  }
`;

interface IPostList {
  posts: IPosts[];
  getAuthoredPosts: () => void;
  createAuthoredPost: (payload: INewPost) => void;
}

const PostList: FC<IPostList> = ({ posts, getAuthoredPosts }) => {
  const [postForm, setPostForm] = useState(false);

  useEffect(() => getAuthoredPosts(), [posts, getAuthoredPosts]);

  return (
    <PostListStyled>
      <div className="attention">
        <Cta active={postForm} handler={() => setPostForm((prev) => !prev)} />
      </div>

      {postForm && (
        <div className="postform">
          {" "}
          <PostForm />
        </div>
      )}

      <div className="postlist">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </PostListStyled>
  );
};

export default PostList;
