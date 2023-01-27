import { useEffect, useRef, useState } from "react";
import { styles } from "../style"


type DatePickerProps = {

}

export default function DatePicker(props: DatePickerProps) {

    const [showDays, setShowDays] = useState(false);
    const [showHours, setShowDate] = useState(false);



    const weekDays = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ]

    const hours = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 0
    ]

    const ref = useRef<any>(null);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (e.target.closest('.my-div')) {
                setIsVisible(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);

        };
    }, []);

    const toggleDiv = () => {
        setIsVisible((prev) => !prev);
    };

    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isVisible]);

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {

            setIsVisible(false);
        }
    };


    return (
        <div className={`p-2 ${styles.boxWidth} ${styles.flexCol}`}>
            <label htmlFor={''}>
                <p className={`${styles.p} indent-2 p`}>
                    {''}
                </p>
            </label>
            <div className={`flex justify-around relative `}>
                <button type='button'
                    className={`${styles.p} ${styles.inputBox} ${styles.inputOpacity}
                    ${styles.borderSecondary} px-6`}
                    onClick={() => setShowDays((prev) => !prev)}
                >
                    Day
                </button>
                {showDays &&
                    <div className={`${styles.p} ${styles.boxWidth} ${styles.inputBox} 
                    absolute p-2 z-[1000] bg-opacity-100 bg-sec 
                    
                    `}>
                        <ul className={`max-h-[310px] overflow-x-hidden`}>
                            {weekDays.map((day) => (
                                <li key={day} className={`rounded-xl text-center py-2
                                hover:bg-main hover:bg-opacity-0`}>
                                    <button type="button"
                                        className="w-full"
                                        onClick={() => setShowDays((prev) => !prev)}
                                    >
                                        {day}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                <button type='button'
                    className={`${styles.p} ${styles.inputBox} ${styles.inputOpacity}
                    ${styles.borderSecondary}
                     px-6`}
                    onClick={() => toggleDiv()}
                >
                    Time
                </button>
                {isVisible &&
                    <div ref={ref} className={`${styles.p} ${styles.boxWidth} ${styles.inputBox} 
                    absolute p-2 z-[1000] bg-opacity-100 bg-sec 
                    my-div ${isVisible ? 'block' : 'hidden'}
                    `}>
                        <ul className={`max-h-[310px] overflow-x-hidden`}>
                            {hours.map((hour) => (
                                <li key={hour} className={`rounded-xl text-center py-2
                                hover:bg-main hover:bg-opacity-0 overflow-hidden`}>
                                    <button type="button"
                                        className="w-full"
                                        onClick={() => toggleDiv()}
                                    >
                                        {hour}:00
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
            <p className={`${styles.p} p-1 text-xs text-center`}
            >
                { }
            </p>
        </div>
    )
}
