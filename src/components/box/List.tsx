import Box from './Box';

const List = ({ data }: { data: (string | number)[] }) => {
  return (
    <Box classname="flex justify-between sm:p-[15px] p-[10px] first:rounded-t-xl last:rounded-b-xl last:border-none border-b-2 border-primary text-center text-sm sm:text-regular">
      {data.map((data) => (
        <p key={data} className="w-full">
          {data}
        </p>
      ))}
    </Box>
  );
};

export default List;
