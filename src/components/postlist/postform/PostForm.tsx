import { useState, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../../../hooks/hooks";

import { Button } from "../../buttons/button/Button";
import { ImageInput } from "../../inputs/image/ImageInput";
import { TextInput } from "../../inputs/text/TextInput";
import { AreaInput } from "../../inputs/area/AreaInput";

import {
  createAuthoredPost,
  editAuthoredPost,
} from "../../../redux/reducers/posts";

import { icons } from "../../../assets/icons/icons";
import { colors } from "../../../utils/colors";
import { resizeImage, urlFromStringOrFile } from "../../../utils/functions";

import type { FC } from "react";
import type { IPosts, INewPost, IEditPost } from "../../../types/types";

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
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0 1rem;
  }
`;

interface IPostForm {
  edit?: boolean;
  inititalValues?: IPosts;
  closePostForm: () => void;
}

const PostForm: FC<IPostForm> = ({
  edit = false,
  inititalValues,
  closePostForm,
}) => {
  const dispatch = useAppDispatch();

  const [headPhoto, setHeadPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (inititalValues) {
      setTitle(inititalValues.title);
      setText(inititalValues.text.replace(/<br ?\/?>/g, "\n"));
      //@ts-ignore
      setHeadPhoto(inititalValues.headPhoto);
    }
  }, [inititalValues]);

  const [isFormUnfilled, setIsFormUnfilled] = useState(true);
  useEffect(() => {
    if (!headPhoto || !title || !text) return setIsFormUnfilled(true);
    if (headPhoto && title && text) return setIsFormUnfilled(false);
  }, [headPhoto, title, text]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (edit && inititalValues) {
      const editPostPayload: IEditPost = {
        id: inititalValues.id,
        headPhoto,
        title: title.trim(),
        text: text.trim().replace(/\n/g, "<br/>"),
        date: inititalValues.date,
      };

      dispatch(editAuthoredPost(editPostPayload));
    }

    if (!edit) {
      const newPostPayload: INewPost = {
        headPhoto,
        title: title.trim(),
        text: text.trim().replace(/\n/g, "<br/>"),
      };

      dispatch(createAuthoredPost(newPostPayload));
    }

    closePostForm();
  };

  const handleImageResize = async (files: FileList) => {
    if (!files.length) return;

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
              src={urlFromStringOrFile(headPhoto)}
              alt="HeadPhoto"
            />
          )}

          <div className="field">
            <ImageInput
              name="image"
              id="post_head_image"
              imageHandler={handleImageResize}
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
          title={edit ? "Сохранить" : "Опубликовать"}
          disabled={isFormUnfilled}
        />

        {edit && (
          <Button icon={icons.back} title="Отмена" handler={closePostForm} />
        )}
      </div>
    </FormStyled>
  );
};

export default PostForm;
