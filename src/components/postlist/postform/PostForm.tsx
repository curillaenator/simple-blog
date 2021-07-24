import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../redux/hooks/hooks";

import { Button } from "../../buttons/button/Button";
import { ImageInput } from "../../inputs/image/ImageInput";
import { TextInput } from "../../inputs/text/TextInput";
import { AreaInput } from "../../inputs/area/AreaInput";

import { createAuthoredPost } from "../../../redux/reducers/posts";

import { icons } from "../../../assets/icons/icons";
import { colors } from "../../../utils/colors";
import { resizeImage } from "../../../utils/functions";

import type { FC } from "react";
import type { IPosts } from "../../../types/types";

interface IImageHeadStyled {
  image: boolean;
}

const ImageHeadStyled = styled.div<IImageHeadStyled>`
  position: relative;
  display: flex;
  align-items: flex-end;
  height: ${({ image }) => (image ? "10rem" : "unset")};
  margin-bottom: 1rem;
  padding-top: ${({ image }) => (image ? "0" : "1rem")};
  padding-bottom: ${({ image }) => (image ? "1rem" : "0")};

  .headimage {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .field {
    z-index: 10;
  }
`;

const FormStyled = styled.form`
  border-radius: 2rem;
  background-color: ${colors.backGrayLight};
  overflow: hidden;

  .fields {
    margin-bottom: 2rem;

    .field {
      margin-bottom: 1rem;
      padding: 0 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .buttons {
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
`;

interface IPostForm {
  inititalValues?: IPosts;
  setPostForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostForm: FC<IPostForm> = ({ inititalValues = {}, setPostForm }) => {
  const dispatch = useAppDispatch();

  const [headPhoto, setHeadPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [isNotComplete, setIsNotComplete] = useState(true);

  useEffect(() => {
    if (!headPhoto || !title || !text) return setIsNotComplete(true);

    if (headPhoto && title && text) return setIsNotComplete(false);
  }, [headPhoto, title, text]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      headPhoto,
      title: title.trim(),
      text: text.trim().replace(/\n/g, "<br/>"),
    };

    dispatch(createAuthoredPost(payload));
    setPostForm(false);
  };

  const imageHandler = async (files: FileList) => {
    const image: File = await resizeImage(files[0]);
    //@ts-ignore
    setHeadPhoto(image);
  };

  return (
    <FormStyled onSubmit={onSubmit}>
      <div className="fields">
        <ImageHeadStyled image={!!headPhoto}>
          {!!headPhoto && (
            <img
              className="headimage"
              src={URL.createObjectURL(headPhoto)}
              alt="HeadPhoto"
            />
          )}

          <div className="field">
            <ImageInput
              name="image"
              id="post_head_image"
              imageHandler={imageHandler}
            />
          </div>
        </ImageHeadStyled>

        <div className="field">
          <TextInput
            name="title"
            label="Заголовок:"
            value={title}
            onChange={(str: string) => setTitle(str)}
          />
        </div>

        <div className="field">
          <AreaInput
            name="content"
            label="Чем Вы хотите поделиться:"
            value={text}
            onChange={(str: string) => setText(str)}
          />
        </div>
      </div>

      <div className="buttons">
        <Button
          icon={icons.success}
          title="Опубликовать"
          disabled={isNotComplete}
        />
      </div>
    </FormStyled>
  );
};

export default PostForm;
