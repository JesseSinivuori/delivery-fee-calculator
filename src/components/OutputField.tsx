import { styles } from "../style"


type OutputFieldProps = {
    text: string,
    form: string,
    htmlFor: string,
    output: string,
    errorMessage?: string,
    showErrorMessage?: boolean,
}

export default function OutputField(props: OutputFieldProps) {

    const { form, htmlFor, output, errorMessage, showErrorMessage, text } = props;

    return (
        <output className={`${styles.p} m-4 flex flex-col justify-center
        items-center `}
            form={form}
            htmlFor={htmlFor}
        >
            {text}
            <span className={`drop-shadow-xl text-white text-[24px] font-semibold
                mx-4 mt-4`}
            >{output}€
            </span>
            {showErrorMessage && errorMessage}
        </output>
    )
}
