import { ReactNode } from "react"


type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="w-screen h-screen overflow-auto bg-main
        font-poppins inset-0 p-4">
            {children}
        </div>
    )
}
