import { FC, ReactNode } from "react"

interface props {
    children: ReactNode,
    onClick?: () => void,
    className?: string,
    type?: "submit" | "reset" | "button" | undefined
    disabled?: boolean
    color?: string;
    id?: string
}

const Button:FC<props> = ({children, id, onClick, className, type, color, disabled}) => {
    return (
        <button id={id} disabled={disabled} type={type} onClick={onClick} className={`w-full disabled:cursor-not-allowed font-medium py-2 enabled:active:scale-[0.97] transition-transform rounded-lg text-white text-[0.9em] ${color ? color : "bg-[#B3387F]"} ${className} `}>
            {children}
        </button>
    )
}

export default Button