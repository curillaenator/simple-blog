import { FC, useEffect, useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

import { Loader } from "../loader/Loader";
import Post from "./post";
import Cta from "./cta";
import PostForm from "./postform";

import { getAuthoredPosts } from "../../redux/reducers/posts";

import { loaderTitleGenerator } from "../../utils/functions";

const PostListStyled = styled.section`
  .attention {
    margin-bottom: 2rem;
  }

  .postform {
    margin-bottom: 2rem;
  }

  .postlist {
    margin-bottom: 2rem;
  }
`;

const PostList: FC = () => {
  // console.log("render");
  const [postForm, setPostForm] = useState(false);

  const dispatch = useAppDispatch();
  const { posts, isPending } = useAppSelector((state) => state.posts);

  useEffect(() => dispatch(getAuthoredPosts()), [dispatch]);

  if (isPending) return <Loader title={loaderTitleGenerator()} />;

  return (
    <PostListStyled>
      <div className="attention">
        <Cta active={postForm} handler={() => setPostForm((prev) => !prev)} />
      </div>

      {postForm && (
        <div className="postform">
          <PostForm setPostForm={setPostForm} />
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
