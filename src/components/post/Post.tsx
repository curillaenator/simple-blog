import { FC } from "react";
import type { IPosts } from "../../types/types";

interface IPostComp {
  post: IPosts;
}

const Post: FC<IPostComp> = ({ post }) => {
  return <div>{post.text}</div>;
};

export default Post;
