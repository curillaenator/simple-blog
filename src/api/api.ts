import type { IPosts } from "../types/types";

const fakePosts: IPosts[] = new Array(9).fill(0).map((_, i) => ({
  id: `postid${i}`,
  title: `post #${i}`,
  text: `This post is fake, and its' post #${i}`,
}));

export const api = {
  getPosts(): Promise<IPosts[]> {
    return new Promise((resolve) => resolve(fakePosts));
  },
};
