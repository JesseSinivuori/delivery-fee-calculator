import { useEffect, useState } from "react";
import { yuho } from "../assets";
import './Yuho.css';

type YuhoProps = {
    flyYuho: boolean; //if true yuho will do a flying animation
}

export default function Yuho(props: YuhoProps) {

    const { flyYuho } = props;

    //yuho animation states
    const [flyingYuho, setFlyingYuho] = useState(false);
    const [yuhoNormal, setYuhoNormal] = useState(true);

    useEffect(() => {
        //yuho goes flying for 8.5 seconds
        if (flyYuho && yuhoNormal) {
            setYuhoNormal((prevState: any) => false)
            setFlyingYuho((prevState: any) => true)
            const yuhoWillFlyBack = setTimeout(() => {
                setFlyingYuho((prevState: any) => false)
            }, 1000)
            const yuhoWillBeNormal = setTimeout(() => {
                setYuhoNormal((prevState: any) => true)
            }, 8500)
        }
    }, [flyYuho]);

    return (
        <div className="relative">
            <img src={yuho} className={`
                ${yuhoNormal && 'yuho-normal-bottom-left'}
                ${flyingYuho ? 'yuho-flying-top-left' : 'yuho-flying-back-to-bottom-right'}
                fixed hidden xs:flex z-[0] 
                bottom-0 xss:bottom-0 md:-bottom-10 lg:-bottom-20 xl:-bottom-32
                -right-3 ss:-right-6 sm:-right-8 md:-right-8 lg:-right-16 xl:-right-28
                min-w-[50px] min-h-[50px]
                xss:w-[125px] xss:h-[125px]
                ss:w-[200px] ss:h-[200px]
                sm:w-[260px] sm:h-[260px]
                md:w-[400px] md:h-[400px]
                lg:w-[600px] lg:h-[600px]
                xl:w-[900px] xl:h-[900px]
                drop-shadow-xl
            `} >
            </img>
        </div>
    )
}
