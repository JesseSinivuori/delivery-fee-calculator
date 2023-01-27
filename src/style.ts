
export const styles = {

    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",

    flexCol: 'flex flex-col',

    borderMain: 'border-[1px] border-white',
    borderSecondary: 'border-[1px] border-gray-100',

    backgroundMain: `rounded-xl focus-within:bg-opacity-20 hover:bg-opacity-20 ease-in-out duration-500 
    bg-sec backdrop-blur-[24px] bg-opacity-0`,
    backgroundSecondary: `rounded-xl focus-within:bg-opacity-100 hover:bg-opacity-100 ease-in-out duration-100 
    bg-sec backdrop-blur-[24px] bg-opacity-75`,

    inputBox: `rounded-xl outline-none overflow-hidden
    indent-1 caret-gray-200 p-1 placeholder-white `,
    inputOpacity: `bg-transparent opacity-30 enabled:focus:opacity-75 hover:opacity-75
    ease-in-out duration-100`,

    p: `text-gray-100 text-lg font-light`,
    h1: 'text-white text-3xl font-bold',

    boxWidth: 'w-[220px] min-w-[220px]',


}

export const buttonStyles = {

    blue: `hover:bg-opacity-25 bg-opacity-75 ${styles.boxWidth} ${styles.p}
    bg-blue-600 m-2 mt-8 rounded-xl p-2 ease-in-out duration-100 drop-shadow-xl`,
    icon: `hover:opacity-25 opacity-75 ${styles.p}
    bg-transparent m-2  rounded-xl p-2 ease-in-out duration-100 drop-shadow-xl
     `,

}

export const iconStyles = {

    inputIcon: `text-gray-200 bg-transparent px-2 rounded-xl
    text-[18px] font-light rounded-full opacity-50 hover:opacity-100
    absolute right-0 bottom-0 top-0 flex items-center text-center
    cursor-default z-[-1]
    `,



}