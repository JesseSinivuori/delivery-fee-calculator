import { ReactNode } from "react"
import { styles } from "../style"


type BoxMainProps = {
  children: ReactNode
}

export default function BoxMain(props: BoxMainProps) {

  const { children } = props

  return (
    <div className={`${styles.borderMain} ${styles.wrapperMain} p-4`}>
      {children}
    </div>
  )
}
