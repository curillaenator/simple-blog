import { lazy, Suspense } from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";

import { Loader } from "../../components/loader/Loader";

import { getAuthoredPosts } from "../../redux/reducers/main";

import type { FC } from "react";
import type { TState } from "../../redux/store";

const Welcome = lazy(() => import("../../components/welcome"));
const PostList = lazy(() => import("../../components/postlist"));

const PageStyled = styled.div``;

type TBlog = ConnectedProps<typeof connector>;

const Blog: FC<TBlog> = ({ user, posts, getAuthoredPosts }) => {
  return (
    <PageStyled>
      {user.role === "guest" && (
        <Suspense fallback={<Loader />}>
          <Welcome />
        </Suspense>
      )}

      {user.role !== "guest" && (
        <Suspense fallback={<Loader />}>
          <section className="blog">
            <PostList posts={posts} getAuthoredPosts={getAuthoredPosts} />
          </section>
        </Suspense>
      )}
    </PageStyled>
  );
};

const mstp = (state: TState) => ({
  user: state.main.user,
  posts: state.main.posts,
});

const mdtp = { getAuthoredPosts };

const connector = connect(mstp, mdtp);

export default connector(Blog);
