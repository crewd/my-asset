function List({
  data,
  nav,
}: {
  data: (string | number)[];
  nav?: React.MouseEventHandler;
}) {
  return (
    <div
      className="bg-secondary shadow-xl flex justify-between sm:p-[15px] p-[10px] first:rounded-t-xl last:rounded-b-xl last:border-none border-b-2 border-primary text-center text-sm sm:text-regular cursor-pointer first:cursor-auto"
      onClick={nav}
    >
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
