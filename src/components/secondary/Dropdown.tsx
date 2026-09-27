import { FC, ReactNode } from "react"

interface props {
    children: ReactNode;
    isOpen: boolean;
    className?: string;
    ref?: React.RefObject<HTMLDivElement>
    // toggleDropdown: () => void
}

const Dropdown: FC<props> = ({children, ref, isOpen, className}) => {
    return (
        <div ref={ref} style={{transformOrigin: "right top"}} className={` ${isOpen ? "scale-1 pointer-events-auto" : " scale-0 pointer-events-none"} bg-white transition-all absolute top-7 border w-[150px] -left-24 text-[13px] flex flex-col text-[#333333] ${className}`}>
            {children}
        </div>
    )
}

export default Dropdown