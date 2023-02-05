import { useEffect, useRef, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { styles } from "../style"

export type InputFieldProps = {
    placeholder?: string;
    type: string;
    text: string;
    errorMessage?: string;
    showErrorMessage?: boolean;
    id: string;
    onChange: any;
    value: string;
    defaultValue?: any;
    onKeyDown?: any;
    icon?: any;
    inputStyles?: string;
    textStyles?: string;
    showInfoMessage?: boolean;
    infoMessage?: string;
    textRows?: number;
}

export default function InputField(props: InputFieldProps) {

    const { placeholder, type, text, errorMessage, id, onChange, value,
        defaultValue, showErrorMessage, onKeyDown, icon, inputStyles, textStyles,
        infoMessage, showInfoMessage, textRows
    } = props;

    const [toggleInfo, setToggleInfo] = useState<boolean>(false)

    //opens the info message
    const handleClick = () => {
        if (!toggleInfo) {
            setToggleInfo((prev: boolean) => !prev)
        }
    }

    const infoRef = useRef<any>(null);

    //closes the info message when clicking outside of it
    const handleClickOutside = (event: any) => {
        if (infoRef.current && !infoRef.current.contains(event.target)) {
            if (toggleInfo) {
                const clickTimeOut = setTimeout(() => {
                    setToggleInfo((prev) => false);
                }, 100);
            }
        }
    };

    //adds event listener to close info message when clicking outside of it
    useEffect(() => {
        if (showInfoMessage) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [toggleInfo]);

    return (
        <div className={`p-4 ${styles.flexCol} flex-wrap 
        ${textRows === 1 && 'h-[100px]' || 'h-[130px]'} 
        `}>
            <div className={`flex-col 
            h-full ${styles.flexCenter}
            `}>
                <label htmlFor={id} className={`${styles.p} px-2 ${styles.boxWidth}
                ${textStyles} justify-between flex relative h-full`}>
                    <p className={`flex`}>
                        {text}
                    </p>
                    {showInfoMessage && <div>
                        <button type='button'
                            className={`opacity-50 hover:opacity-100`}
                            onClick={handleClick} >
                            {<BsInfoCircle />}
                        </button>
                        {toggleInfo &&
                            <div className={`${styles.boxWidth} absolute 
                                top-[26px] left-[22px] xl:left-[216px] p-2
                                xl:w-[280px] z-[1]  bg-tertiary rounded-xl`}>
                                <div className='absolute bg-primary-gradient inset-0
                                opacity-25 blur-2xl 
                                '></div>
                                <p className={`${styles.p}`}
                                    ref={infoRef}>
                                    {infoMessage}
                                </p>
                            </div>
                        }
                    </div>
                    }
                </label>
                <div className={`relative`}>
                    <input id={id} className={`${styles.p} ${styles.wrapperInputField}
                    ${styles.borderInputField} ${styles.boxWidth} ${inputStyles}
                    `}
                        placeholder={placeholder}
                        type={type}
                        onChange={onChange}
                        value={value}
                        defaultValue={defaultValue}
                        onKeyDown={onKeyDown}
                    >
                    </input>
                    {icon &&
                        <div className={`${styles.inputIcon}`}>
                            {icon}
                        </div>
                    }
                </div>
                {showErrorMessage &&
                    <div className="relative w-full">
                        <p className={`${styles.p} p-2 text-xs text-center 
                        absolute top-0 right-0 left-0 `}
                        >
                            {errorMessage}
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

