import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    return (
        <div className="h-[100svh] w-full bg-primary overflow-auto
        font-poppins">
            <div className='absolute bg-primary-gradient w-full h-full
            opacity-25
            '></div>
            <div className="relative">
                {children}
            </div>
        </div>
    )
}
