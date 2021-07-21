import { FC } from "react";
import type { IPosts } from "../../types/types";
import styled from "styled-components";

import { colors } from "../../utils/colors";

const PostStyled = styled.div`
  border-radius: 1rem;
  background-color: ${colors.backGrayLight};
  overflow: hidden;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  .image {
    width: 100%;
    height: 10rem;
    margin-bottom: 1rem;
    border: none;
    object-fit: cover;
  }

  .title {
    margin-bottom: 1rem;
    padding: 0 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .content {
    padding: 0 0.5rem;
  }
`;

interface IPostComp {
  post: IPosts;
}

export const Post: FC<IPostComp> = ({ post }) => {
  return (
    <PostStyled>
      <img className="image" src={post.headPhoto} alt={post.title} />

      <h3 className="title">{post.title}</h3>

      <p className="content">{post.text}</p>
    </PostStyled>
  );
};
