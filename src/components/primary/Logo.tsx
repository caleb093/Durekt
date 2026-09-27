import { FC } from "react"
import Durekt from "../../../public/svgs/Logo.svg"

interface props {
    classname?: string
}

const Logo:FC<props> = ({classname}) => {
    return (
        <Durekt className={`mx-auto ${classname ? classname : "w-[216px] h-[43px] scale-[0.8] sm:scale-1"}`} />
    )
}

export default Logo