import { buttonStyles, iconStyles, styles } from "../style"

export type InputFieldProps = {
    placeholder?: string;
    type: string;
    text: string;
    errorMessage: any;
    showErrorMessage: boolean;
    id: string;
    onChange: any;
    value?: any;
    defaultValue?: any;
    onKeyDown?: any;
    icon?: any;
}

export default function InputField(props: InputFieldProps) {

    const { placeholder, type, text, errorMessage, id, onChange, value,
        defaultValue, showErrorMessage, onKeyDown, icon } = props;


    return (
        <div className={`m-4 ${styles.boxWidth} ${styles.flexCol} relative`}>
            <label htmlFor={id}>
                <p className={`${styles.p} indent-2`}>
                    {text}
                </p>
            </label>
            <div className={`relative`}>
                <input id={id} className={`${styles.p} ${styles.inputBox}
                    ${styles.inputOpacity} ${styles.borderSecondary}
                    ${styles.boxWidth}`}
                    placeholder={placeholder}
                    type={type}
                    onChange={onChange}
                    value={value}
                    defaultValue={defaultValue}
                    onKeyDown={onKeyDown}
                >
                </input>
                {icon &&
                    <div className={`${iconStyles.inputIcon} 
                    
                    
                    `}>
                        {icon}
                    </div>
                }
            </div>
            <p className={`${styles.p} p-1 text-xs text-center`}
            >
                {showErrorMessage && errorMessage}
            </p>
        </div>
    )
}

