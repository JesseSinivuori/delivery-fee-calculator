import { useState } from "react";
import { styles } from "../style"

type ButtonProps = {
    onClick: any;
    buttonStyles: string;
    text: string;
    icon?: any;
    messageText?: string;
    messageStyles?: string;
    showMessage?: boolean;
}

export default function Button(props: ButtonProps) {

    const { onClick, buttonStyles, text, icon, showMessage, messageText, messageStyles
    } = props;

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        onClick();

        //if showMessage = true, show a message under the button for 1 second when button is clicked
        if (showMessage) {
            setIsClicked((prev) => true);
            const timeout = setTimeout(() => {
                setIsClicked((prev) => false);
            }, 1000);
        }
    }

    return (
        <div className={`relative`}>
            <button className={`${buttonStyles}`}
                type='button'
                onClick={handleClick}
            >
                {icon}
                {text}
            </button>
            <p className={`${styles.p} text-center text-sm
            absolute right-0 left-0 bottom-[-26px]
            ease-in-out duration-500 z-[-1]
            ${isClicked && 'opacity-100 translate-y-0' ||
                'opacity-0 translate-y-[-20px]'}
        `}>
                {messageText}
            </p>
        </div>
    )
}
