const Box = ({ children, classname }: { children: React.ReactNode, classname: string }) => {
  const styles = `bg-secondary rounded-lg p-[10px] shadow-xl ${classname}`

  return (
    <div className={styles}>
      {children}
    </div>
  )
}

export default Box;