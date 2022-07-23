import classnames from "classnames";

const Box = ({ children, style }: { children: React.ReactNode, style: string }) => {
  const styles = `bg-secondary rounded-lg p-[10px] ${style}`

  return (
    <div className={styles}>
      {children}
    </div>
  )
}

export default Box;