import Image from "next/image"
import { FC } from "react"

interface props {
    header: string,
    body: string,
    img: any,
    imgStyle?: string
}

const Item:FC<props> = ({header, body, img, imgStyle}) => {
    return (
        <div className="text-center px-6 mdx3:px-0">
            <h1 className="carousel-head text-[1.5em] font-bold">{header}</h1>
            <p className="carousel-body text-[0.9em] mt-[1em] font-thin mx-auto w-[100%] sm:w-[22em] mdx3:w-[22em]">{body}</p>

            <div className="carousel-img flex items-center justify-center pt-14 mdx3:pt-8 ">
                <Image src={img} height={50000} width={50000} alt="image1" className={`${imgStyle} w-[100%] sm:w-[65%] mdx3:w-[85%] `} />
            </div>
        </div>
    )
}

export default Item