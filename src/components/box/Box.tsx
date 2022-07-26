function Box({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname: string;
}) {
  const styles = `bg-secondary p-[10px] shadow-xl ${classname}`;

  return <div className={styles}>{children}</div>;
}

export default Box;
