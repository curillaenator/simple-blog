import { AnyAction } from "@reduxjs/toolkit";
import { useReducer, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { ButtonGhost } from "../buttons/buttonGhost/ButtonGhost";

import { icons } from "../../assets/icons/icons";

import type { FC, ReactNode } from "react";
import type {
  IDropOption,
  TReducer,
  TAction,
  TEventHandler,
} from "../../types/types";

import { colors } from "../../utils/colors";

// STATE

const SET_DROPDOWN_OPEN = "dropdown/SET_DROPDOWN_OPEN";
const SET_DROPDOWN_LIST = "dropdown/SET_DROPDOWN_LIST";

interface IInitialState {
  open: boolean;
  list: IDropOption[];
}

const initialState: IInitialState = {
  open: false,
  list: [],
};

const reducer: TReducer<IInitialState, AnyAction> = (state, action) => {
  switch (action.type) {
    case SET_DROPDOWN_OPEN:
      return { ...state, open: action.payload };

    case SET_DROPDOWN_LIST:
      return { ...state, list: action.payload };

    default:
      return state;
  }
};

const setOpen: TAction<boolean> = (payload) => ({
  type: SET_DROPDOWN_OPEN,
  payload,
});

const setList: TAction<IDropOption[]> = (payload) => ({
  type: SET_DROPDOWN_LIST,
  payload,
});

// COMPONENT

interface IDropdownStyled {
  open: boolean;
  multiselect: boolean;
  mtop: number;
}

const DropdownStyled = styled.div<IDropdownStyled>`
  position: relative;

  .ddtitle {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 40px;
    padding: 0 1rem;
    border-radius: 0.5rem;
    background-color: ${colors.backWhite};
    cursor: pointer;

    &_label {
    }

    & > svg {
      transform: rotate(${({ open }) => (open ? "180deg" : "0")});
    }
  }

  .ddoptions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    top: ${({ mtop }) => mtop}rem;
    right: 0;
    z-index: ${({ open }) => (open ? "10" : "-10")};
    border-radius: 0.5rem;
    background-color: ${colors.backWhite};
    overflow: hidden;
    opacity: ${({ open }) => (open ? "1" : "0")};
    transform: translateY(${({ open }) => (open ? "0" : "2rem")});
    transition: 0.12s ease-in;
    box-shadow: 0px 19px 38px rgba(33, 38, 44, 0.15),
      0px 15px 12px rgba(33, 38, 44, 0.11);
  }
`;

interface IDropdown {
  title?: string;
  options: IDropOption[];
  multiselect?: boolean;
  mtop?: number; // rems from top to list
  children?: ReactNode;
}

export const Dropdown: FC<IDropdown> = ({
  title,
  options,
  multiselect = false,
  mtop = 3,
  children,
}) => {
  const ref = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { open, list } = state;

  // set options to local state to work with
  useEffect(() => dispatch(setList(options)), [options]);

  // close dropdown on outside list click
  const handleClose: TEventHandler<any> = useCallback(
    (event) => {
      //@ts-ignore
      if (open && ref.current && !ref.current.contains(event.target)) {
        dispatch(setOpen(false));
      }
    },
    [open]
  );

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => document.removeEventListener("click", handleClose);
  }, [open, handleClose]);

  const handleOptionHandler = (handler: () => void) => {
    handler();
    dispatch(setOpen(false));
  };

  return (
    <DropdownStyled open={open} mtop={mtop} multiselect={multiselect}>
      {children && (
        <div
          className="ddchildren"
          onClick={() => !open && dispatch(setOpen(true))}
        >
          {children}
        </div>
      )}

      {!children && (
        <div
          className="ddtitle"
          onClick={() => !open && dispatch(setOpen(true))}
        >
          <span className="ddtitle_label">{title}</span>
          {icons.arrow}
        </div>
      )}

      {/* @ts-ignore */}
      <div className="ddoptions" ref={ref}>
        {list.map((opt) => (
          <ButtonGhost
            danger={opt.danger}
            title={opt.title}
            icon={opt.icon}
            key={opt.id}
            handler={() => handleOptionHandler(opt.handler)}
          />
        ))}
      </div>
    </DropdownStyled>
  );
};
