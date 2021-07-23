import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../../buttons/button/Button";
import { ImageInput } from "../../inputs/image/ImageInput";
import { TextInput } from "../../inputs/text/TextInput";
import { AreaInput } from "../../inputs/area/AreaInput";

import { colors } from "../../../utils/colors";
import { resizeImage } from "../../../utils/functions";

import type { FC } from "react";
import type { IPosts } from "../../../types/types";

const FormStyled = styled.form`
  padding: 1rem;
  border-radius: 2rem;
  background-color: ${colors.backGrayLight};
  overflow: hidden;

  .fields {
    margin-bottom: 2rem;

    .field {
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

interface IPostForm {
  inititalValues?: IPosts;
}

const PostForm: FC<IPostForm> = ({ inititalValues = {} }) => {
  const [headPhoto, setHeadPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [valid, setValid] = useState(true);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (headPhoto && title && text) {
      const payload = {
        headPhoto,
        title,
        text,
      };

      console.log(payload);
    }
  };

  const imageHandler = async (files: FileList) => {
    const image: File = await resizeImage(files[0]);
    //@ts-ignore
    setHeadPhoto(image);
  };

  const titleHandler = (str:string) => {
    str.trim();
  } 

  return (
    <FormStyled onSubmit={onSubmit}>
      <div className="fields">
        <div className="field">
          <ImageInput
            name="image"
            id="post_head_image"
            imageHandler={imageHandler}
          />
        </div>

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
        <Button title="Опубликовать" />
      </div>
    </FormStyled>
  );
};

export default PostForm;
