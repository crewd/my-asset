import { createPortal } from 'react-dom';

export const ModalPortal = ({ children }: { children: React.ReactNode }) =>
  createPortal(children, document.getElementById('modal'));
