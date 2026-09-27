import { FC, ReactNode } from "react"

interface props {
    children: ReactNode
    size?: string | number
    className?: string
}

const GradientCircle:FC<props> = ({children, size = 40, className}) => {
    return (
        <div style={{width: size, height: size}} className={`flex justify-center items-center bg-gradient-to-r from-[#6FA9E2] to-[#B3387F] rounded-full ${className}`}>
            {children}
        </div>
    )
}

export default GradientCircle