

type ButtonProps = {
    onClick: any;
    styles: string;
    text: string;
    icon?: any;
}

export default function Button(props: ButtonProps) {

    const { onClick, styles, text, icon } = props;

    return (
        <button className={styles}
            type='button'
            onClick={onClick}
        >
            {icon}
            {text}
        </button>
    )
}
