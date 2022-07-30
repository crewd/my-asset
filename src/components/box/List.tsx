import Box from './Box';

function List({ data }: { data: (string | number)[] }) {
  return (
    <Box classname="flex justify-between sm:p-[15px] p-[10px] first:rounded-t-xl last:rounded-b-xl last:border-none border-b-2 border-primary text-center text-sm sm:text-regular">
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
    </Box>
  );
}

export default List;
