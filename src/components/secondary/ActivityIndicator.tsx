import { FC } from "react"

interface props {
    color?: string
}

const ActivityIndicator:FC<props> = ({color}) => {
    return (
        <div className="activity-indicator"><div style={{borderColor: color}}></div><div style={{borderColor: color}}></div><div></div><div></div></div>
    )
}

export default ActivityIndicator