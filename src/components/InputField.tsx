import { styles } from "../style"

export type InputFieldProps = {
    placeholder: string;
    type: string;
    text: string;
    errorMessage: any;
    id: string;
    onChange: any;
    value: any;
}

export default function InputField(props: InputFieldProps) {

    const { placeholder, type, text, errorMessage, id, onChange, value
    } = props;

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
                value={value}
                onChange={onChange}
            >
            </input>
            <p className={`${styles.p} p-1 text-xs text-center`}
            >
                {errorMessage}
            </p>
        </div>
    )
}

