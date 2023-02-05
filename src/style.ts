
export const styles = {

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-start items-start",

  flexCol: 'flex flex-col',

  borderMain: 'border-[1px] border-white hover:border-transparent',
  borderInputField: 'border-[1px] border-gray-100',

  wrapperMain: `border-opacity-25 rounded-xl focus-within:bg-opacity-20
  hover:bg-opacity-30 ease-in-out duration-500 bg-secondary backdrop-blur-[24px]
  bg-opacity-0`,

  wrapperInputField: `rounded-xl bg-transparent opacity-30 enabled:focus:opacity-75
  hover:opacity-75 ease-in-out duration-100 outline-none overflow-hidden
  indent-1 caret-gray-200 p-1 placeholder-white`,

  p: `text-gray-100 text-lg font-light`,
  h1: 'text-white text-3xl font-semibold',

  boxWidth: 'xss:w-[220px] xss:min-w-[220px] w-[180px] min-w-[180px]',

  inputIcon: `text-gray-200 bg-transparent px-2 rounded-xl
  text-[18px] font-light rounded-full opacity-50 focus-within:opacity-100
  absolute right-0 bottom-0 top-0 flex items-center z-[-10]`,

}

export const buttonStyles = {

  blue: `hover:bg-opacity-50 bg-opacity-100 ${styles.boxWidth} ${styles.p}
  bg-tertiary rounded-xl p-2 ease-in-out duration-100 drop-shadow-xl
  border-transparent border-[1px] hover:border-white hover:border-opacity-75`,

  white: `bg-transparent ${styles.boxWidth} ${styles.p}
  rounded-xl p-2 ease-in-out duration-100 drop-shadow-xl
  ${styles.borderInputField} border-opacity-25 hover:border-opacity-75`,

  icon: `hover:opacity-25 opacity-75 ${styles.p}
  bg-transparent m-4  rounded-xl p-2 ease-in-out duration-100 drop-shadow-xl`,

}
