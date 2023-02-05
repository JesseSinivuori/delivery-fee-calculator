import { ReactNode } from "react"

type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {

    return (
        <div className="h-screen w-screen bg-primary overflow-auto
        font-poppins">
            <div className='absolute bg-primary-gradient inset-0
            opacity-25
            '></div>
            <div className="relative">
                {children}
            </div>
        </div>
    )
}
