import { FC } from "react"

interface props {
    customStyle?: React.CSSProperties
}

const Loading:FC<props> = ({customStyle = {}}) => {

    const isObjectEmpty = Object.keys(customStyle).length === 0

    return (
        <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <div style={isObjectEmpty ? {} : customStyle}  className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            {/* {isObjectEmpty && <p style={{textAlign: 'center'}}>Loading..</p>    } */}
        </div>
    )
}

export default Loading