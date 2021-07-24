import { useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { TState, TDispatch } from "../redux/store";
// import type { MutableRefObject } from "react";

export const useAppDispatch = () => useDispatch<TDispatch>();

export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;

type TUseToggle = (initial: boolean) => [boolean, () => void];

export const useToggle: TUseToggle = (initial) => {
  const [value, setValue] = useState(initial);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
};

// type TUseElementHeight = (
//   toggler: boolean
// ) => [number, MutableRefObject<HTMLDivElement | null>];

// export const useElementHeight: TUseElementHeight = (toggler) => {
//   const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
//   const node = ref.current;
//   const nodeHeight = node ? node.scrollHeight : 0;

//   console.log(nodeHeight);

//   const [height, setHeight] = useState(0);

//   useEffect(() => {
//     if (!toggler) setHeight(0);
//     if (toggler && node) setHeight(nodeHeight);
//   }, [toggler, node, nodeHeight]);
//   return [height, ref];
// };
