import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return createPortal(children, document.getElementById('modal'));
};

const Modal = ({
  children,
  cssStyle,
}: {
  children: React.ReactNode;
  cssStyle: string;
}) => {
  const styles = `absolute top-[50%] left-[50%] p-[20px] translate-x-[-50%] translate-y-[-50%] max-w-[600px] bg-secondary rounded-xl ${cssStyle}`;
  return (
    <ModalPortal>
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:content-none">
        <div className={styles}>{children}</div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
