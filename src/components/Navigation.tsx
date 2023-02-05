import { IoSettingsOutline } from "react-icons/io5"
import { buttonStyles, styles } from "../style"
import { Button } from "."
import { useState } from "react"

type NavigationProps = {

}

export default function Settings(props: NavigationProps) {

    const [toggleSettings, setToggleSettings] = useState(false)

    const handleClick = (e: any) => {
        setToggleSettings((prev: boolean) => !prev)
    }

    return (
        <nav className={`${styles.flexCenter} p-4`}>
            <Button onClick={handleClick}
                buttonStyles={`${buttonStyles.icon} 
                `}
                text={''}
                icon={<IoSettingsOutline className='w-[34px] h-[34px]' />} />
        </nav>
    )
}
