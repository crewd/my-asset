function Button({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname: string;
}) {
  const styles = `block bg-secondary shadow-xl m-auto mt-[18px] py-[8px] px-[48px] rounded-lg hover:bg-[#527099] transition-colors duration-300 ${classname}`;

  return (
    <button className={styles} type="button">
      {children}
    </button>
  );
}

export default Button;
