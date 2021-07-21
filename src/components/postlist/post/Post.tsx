import { FC } from "react";
import type { IPosts } from "../../../types/types";
import Gallery from "react-photo-gallery";
import styled from "styled-components";

import { ButtonIcon } from "../../buttons/buttonIcon/ButtonIcon";
// import { Gallery } from "../gallery/Gallery";

import { colors } from "../../../utils/colors";
import { icons } from "../../../assets/icons/icons";

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

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 0.5rem;

    &_title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    &_buttons {
      display: flex;
      align-items: center;
    }
  }

  .body {
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

  .gallery {
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

  .legs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;

    &_date {
      font-size: 0.75rem;
      color: ${colors.fontGray};
    }

    &_buttons {
      display: flex;
      align-items: center;
    }
  }
`;

interface IPostComp {
  post: IPosts;
}

export const Post: FC<IPostComp> = ({ post }) => {
  return (
    <PostStyled>
      <img
        className="image"
        src={post.headPhoto}
        alt={post.title}
        draggable={false}
      />

      <div className="head">
        <h3 className="head_title font_condensed">{post.title}</h3>

        <div className="head_buttons">
          <ButtonIcon icon={icons.trash} danger />

          <ButtonIcon icon={icons.pencil} />
        </div>
      </div>

      <div className="body">
        <p>{post.text}</p>
      </div>

      <div className="gallery">
        <Gallery photos={post.photos} />
      </div>

      <div className="legs">
        <div className="legs_date">{post.date}</div>

        <div className="legs_buttons">
          <ButtonIcon icon={icons.like} />
        </div>
      </div>
    </PostStyled>
  );
};
