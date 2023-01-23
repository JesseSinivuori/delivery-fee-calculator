import { SetStateAction } from "react";
import { styles } from "../style"


type OutputFieldProps = {
    form: string,
    htmlFor: string,
    output: string,
    errorMessage: SetStateAction<any>
}

export default function OutputField(props: OutputFieldProps) {

    const { form, htmlFor, output, errorMessage } = props;

    return (
        <output className={`${styles.p} mt-8`}
            form={form}
            htmlFor={htmlFor}
        >
            Delivery Price:{' '}
            <span className='drop-shadow-xl text-white font-semibold'
            >{output}€
            </span>
            {errorMessage}
        </output>
    )
}
