import Box from './Box';

const List = ({ data }: { data: (string | number)[] }) => {
  return (
    <Box classname="flex justify-between sm:p-[15px] p-[10px] first:rounded-t-xl last:rounded-b-xl last:border-none border-b-2 border-primary text-center text-sm sm:text-regular">
      {data.map((data) => {
        const style = `w-full ${
          data.toString().indexOf('%') < 0
            ? 'text-white'
            : data.toString().charAt(0) === '-'
            ? 'text-minus'
            : data.toString().length > 3
            ? 'text-plus'
            : 'text-white'
        }`;
        return (
          <p key={data} className={style}>
            {data}
          </p>
        );
      })}
    </Box>
  );
};

export default List;
