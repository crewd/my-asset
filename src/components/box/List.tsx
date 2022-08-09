function List({
  data,
  cssStyle,
  nav,
}: {
  data: (string | number)[];
  cssStyle: string;
  nav?: React.MouseEventHandler;
}) {
  const styles = `shadow-xl flex justify-between sm:p-[15px] p-[10px] first:rounded-t-xl last:rounded-b-xl last:border-none border-b-2 text-center text-sm sm:text-regular cursor-pointer first:cursor-auto ${cssStyle}`;
  return (
    <div className={styles} onClick={nav}>
      {data.map((value) => {
        const style = `w-full ${
          value.toString().indexOf('%') < 0
            ? 'text-white'
            : value.toString().charAt(0) === '-'
            ? 'text-minus'
            : value.toString().length > 3
            ? 'text-plus'
            : 'text-white'
        }`;
        return (
          <p key={value} className={style}>
            {value}
          </p>
        );
      })}
    </div>
  );
}

List.defaultProps = {
  nav: () => {},
};

export default List;
