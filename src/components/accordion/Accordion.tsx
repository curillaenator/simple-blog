import styled from "styled-components";

import type { FC, ReactNode } from "react";

interface IAccordionStyled {
  open: boolean;
}

const AccordionStyled = styled.div<IAccordionStyled>`
  overflow: hidden;
  height: ${({ open }) => (open ? "fit-content" : "0px")};
  transition: 0.12s ease-in-out;
`;

interface IAccordion {
  open: boolean;
  children: ReactNode;
}

const Accordion: FC<IAccordion> = ({ open, children }) => {
  return <AccordionStyled open={open}>{children}</AccordionStyled>;
};

export default Accordion;
