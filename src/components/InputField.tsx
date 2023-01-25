import { useStateContext } from "../context/StateContext";
import { styles } from "../style"

export type InputFieldProps = {
    placeholder: string;
    type: string;
    text: string;
    errorMessage: any;
    showErrorMessage: boolean;
    id: string;
    onChange: any;
    defaultValue: any;
}

export default function InputField(props: InputFieldProps) {

    const { placeholder, type, text, errorMessage, id, onChange, defaultValue,
        showErrorMessage } = props;


    return (
        <div className={`p-2 ${styles.boxWidth} ${styles.section}`}>
            <label htmlFor={id}>
                <p className={`${styles.p} indent-2`}>
                    {text}
                </p>
            </label>
            <input id={id} className={`${styles.p} ${styles.inputBox}
            ${styles.inputOpacity} ${styles.border}`}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                defaultValue={defaultValue}
            >
            </input>
            <p className={`${styles.p} p-1 text-xs text-center`}
            >
                {showErrorMessage && errorMessage}
            </p>
        </div>
    )
}

