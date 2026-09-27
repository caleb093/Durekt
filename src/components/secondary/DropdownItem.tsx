import { FC, ReactNode } from "react"

interface props {
    onClick: () => void,
    text: string | ReactNode
    className?: string
}

const DropdownItem:FC<props> = ({onClick, text, className}) => {
    return (
        <p onClick={onClick} className={` hover:bg-slate-100 cursor-pointer ${className ? className : "py-2 px-2"}`}>{text}</p>
    )
}

export default DropdownItem