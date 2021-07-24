import parse from "html-react-parser";
import styled from "styled-components";

import { useAppDispatch } from "../../../hooks/hooks";

import { ButtonIcon } from "../../buttons/buttonIcon/ButtonIcon";
import { Dropdown } from "../../dropdown/Dropdown";

import { removeAuthoredPost } from "../../../redux/reducers/posts";

import { colors } from "../../../utils/colors";
import { icons } from "../../../assets/icons/icons";
import { timestampToDate } from "../../../utils/functions";

import type { FC } from "react";
import type { IPosts, IDropOption } from "../../../types/types";

const PostStyled = styled.div`
  border-radius: 2rem;
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
    padding: 0 1rem;

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
    padding: 0 1rem;
  }

  .legs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

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

const Post: FC<IPostComp> = ({ post }) => {
  const dispatch = useAppDispatch();

  const removePostOptions: IDropOption[] = [
    {
      id: "optionCancel",
      danger: false,
      icon: icons.back,
      title: "Отмена",
      handler: () => {},
    },
    {
      id: "optionDelete",
      danger: true,
      icon: icons.trash,
      title: "Удалить",
      handler: () => dispatch(removeAuthoredPost(post)),
    },
  ];

  return (
    <PostStyled>
      <img
        className="image"
        //@ts-ignore
        src={post.headPhoto}
        alt={post.title}
        draggable={false}
      />

      <div className="head">
        <h3 className="head_title font_condensed">{post.title}</h3>

        <div className="head_buttons">
          <Dropdown options={removePostOptions}>
            <ButtonIcon icon={icons.trash} danger />
          </Dropdown>

          {/* <ButtonIcon icon={icons.pencil} /> */}
        </div>
      </div>

      <div className="body">
        <p>{parse(post.text)}</p>
      </div>

      <div className="gallery"></div>

      <div className="legs">
        <div className="legs_date">{timestampToDate(post.date)}</div>

        {/* <div className="legs_buttons">
          <ButtonIcon icon={icons.like} />
        </div> */}
      </div>
    </PostStyled>
  );
};

export default Post;
