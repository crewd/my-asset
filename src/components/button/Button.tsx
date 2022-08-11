function Button({
  children,
  classname,
  clickEvent,
}: {
  children: React.ReactNode;
  classname?: string;
  clickEvent?: React.MouseEventHandler;
}) {
  const styles = `block bg-secondary shadow-xl m-auto mt-[18px] py-[8px] px-[48px] rounded-lg hover:bg-[#527099] transition-colors duration-300 ${classname}`;

  return (
    <button className={styles} type="button" onClick={clickEvent}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  classname: '',
  clickEvent: () => {},
};

export default Button;
