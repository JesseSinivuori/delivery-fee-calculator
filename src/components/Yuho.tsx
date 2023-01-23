import { useEffect, useState } from "react";
import { yuho } from "../assets";
import { useStateContext } from "../context/StateContext";
import './Yuho.css';

type YuhoProps = {
    flyingYuho: boolean
    yuhoNormal: boolean
}

export default function Yuho(props: YuhoProps) {

    const { flyingYuho, yuhoNormal } = props;

    return (
        <div className="relative">
            <img src={yuho} className={`
                ${yuhoNormal && 'yuho-normal-bottom-right'}
                ${flyingYuho ? 'yuho-flying-top-left' : 'yuho-fyling-back-to-bottom-right'}
                fixed hidden xss:flex z-[0] 
                bottom-100 xss:bottom-0 ss:-bottom-3 md:-bottom-10 xl:-bottom-28
                -right-2 ss:-right-6 md:-right-10 xl:-right-24
                w-[100px] h-[100px] object-contain
                min-w-[50px] min-h-[50px]
                xs:w-[125px] xss:h-[125px] ss:w-[225px] ss:h-[225px]
                md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px]
                xl:w-[900px] xl:h-[900px]
                mr-0 xs:mr-0 ss:mr-0 sm:mr-8 lg:mr-0
                drop-shadow-xl rounded-full cursor-default
            `} >
            </img>
        </div>
    )
}
