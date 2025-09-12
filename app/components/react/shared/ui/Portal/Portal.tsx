import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children?: ReactNode;
  element: string;
}

export const Portal = (props: PortalProps) => {
    const {
        children,
        element,
    } = props;

    let elemetDom = document.getElementById(element);
    if (!elemetDom) {
        elemetDom = document.body;
    }

    return createPortal(children, elemetDom);
};
