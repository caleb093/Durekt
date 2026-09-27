import Item from "./carousel/item"
import Ellipse from "../../../../public/svgs/Ellipse 2348.svg"
import { FC, useEffect, useState } from "react"
import NextBtn from "../../../../public/svgs/carousel_btn.svg"
import gsap from "gsap"
import { carouselDotAnimation } from "@/components/Animations/animations"
import itemImg1 from "../../../../public/images/onboarding_pages/manager_item1.png"
import itemImg2 from "../../../../public/images/onboarding_pages/manager_item2.png"
import itemImg3 from "../../../../public/images/onboarding_pages/manager_item3.png"
import itemImg4 from "../../../../public/images/onboarding_pages/manager_item4.png"
import itemImg5 from "../../../../public/images/onboarding_pages/manager_item5.png"
import ellipse1 from "../../../../public/images/onboarding_pages/Ellipse1.png"
import ellipse3 from "../../../../public/images/onboarding_pages/Ellipse3.png"
import Image from "next/image"
import { authAccountType } from "@/pages/onboarding"

interface props {
    accountType: authAccountType
}

const LeftContainer:FC<props> = ({accountType}) => {
    const [currentItem, setCurrentItem] = useState(1)
    
    const itemData = [
        {
            header: "Welcome to Your AI Sales Assistant",
            body: "Begin your journey to smarter sales Analysis. Get Ready to transform Your Sales Performance.",
            img: itemImg1
        },
        {
            header: "Seamless Integration",
            body: "Connect with Zoom, Google Meet, and Kixie to start Analyzing your Sales Calls",
            img: itemImg2
        },
        {
            header: "Smart Transcriptions",
            body: "Leverage NLP to Accurately Transcribe and Understand Every Sales Interaction",
            img: itemImg3
        },
        {
            header: "AI-Driven Performance Grading",
            body: "Receive Detailed Feedback and Grades Based on Proven Sales Techniques",
            img: itemImg4
        },
        {
            header: "Your Dashboard for success",
            body: "Access Insights, Track Progress, and Improve with Real-Time Data",
            img: itemImg5
        }
        // ...(accountType === "manager" ? [{
        //     header: "Your Dashboard for success",
        //     body: "Access Insights, Track Progress, and Improve with Real-Time Data",
        //     img: itemImg5
        // }] : [])
    ]

    useEffect(() => {
        carouselDotAnimation()
    },[])
    
    const carouselChange = (type: "next" | "prev") => {
        if (type === "next" && currentItem >= itemData.length) {
            return
        }
        if (type === "prev" && currentItem <= 1) {
            return
        }

        gsap.timeline({
            onUpdate: function() {
                if (this.progress() >= 0.45 && !this.halfwayReached) {
                    this.halfwayReached = true; // Ensure the function runs only once
                    type === "next" && setCurrentItem(prev => prev < itemData.length ? prev + 1 : prev)
                    type === "prev" && setCurrentItem(prev => prev > 1 ? prev - 1 : prev ) 
                }
            
            },
        })
            .to(".carousel-container", {opacity: 0})
            .to(".carousel-container", {opacity: 1})

    }

    const slideNext = () => {
        carouselChange("next")
        
        setTimeout(() => {
            carouselDotAnimation()
        }, 500)

    };

    const slidePrev = () => {
        carouselChange("prev")

        setTimeout(() => {
            carouselDotAnimation()
        }, 500)
    }

    const handleDirectChange = (item: number) => {
        setCurrentItem(item)
        setTimeout(() => {
            carouselDotAnimation()
        }, 200)
    }

    return (
        <div className="flex overflow-hidden mdx3:flex-1 h-screen flex-col relative items-center pt-[5em] mdx3:pt-10 bg-[#161529] text-white">
            <Image className="absolute top-0" src={ellipse1} alt="ellips" width={10000} height={10000} />
            <Image className="absolute bottom-0 rotate-[180deg]" src={ellipse1} alt="ellips" width={10000} height={10000} />
            <Image className="absolute top-0" src={ellipse3} alt="ellips" width={10000} height={10000} />
            <Image className="absolute bottom-0 rotate-[180deg] opacity-[0.3]" src={ellipse3} alt="ellips" width={10000} height={10000} />

            <div className="z-[2] left-container flex flex-col h-full">
                <div className=" carousel-container flex flex-[2] mdx2:flex-[3] w-full overflow-hidden justify-center">
                    {itemData.map((item, i) => {
                        if (i+1 == 2) return <>{currentItem === i+1 && <Item key={i} imgStyle="w-[100%] sm:w-[59%] mdx3:w-[73%]" header={item.header} body={item.body} img={item.img} />}</>
                        return <>{currentItem === i+1 && <Item key={i} header={item.header} body={item.body} img={item.img} />}</>
                    })}
                </div>
                <div className="carousel-nav flex mdx3:flex-1 pb-10 mdx3:pb-0 pt-5 w-full items-start justify-center">
                    <div className="flex gap-12 justify-center items-center pt-3">
                        <div onClick={slidePrev}>
                            <NextBtn />
                        </div>
                        <div className="flex items-center gap-3">
                            <div onClick={() => handleDirectChange(1)} className={`${currentItem === 1 ? "active" : "notactive"} bg-[#B0ADAD] h-1.5 w-1.5 rounded-full cursor-pointer`}></div>
                            <div onClick={() => handleDirectChange(2)} className={`${currentItem === 2 ? "active" : "notactive"} bg-[#B0ADAD] h-1.5 w-1.5 rounded-full cursor-pointer`}></div>
                            <div onClick={() => handleDirectChange(3)} className={`${currentItem === 3 ? "active" : "notactive"} bg-[#B0ADAD] h-1.5 w-1.5 rounded-full cursor-pointer`}></div>
                            <div onClick={() => handleDirectChange(4)} className={`${currentItem === 4 ? "active" : "notactive"} bg-[#B0ADAD] h-1.5 w-1.5 rounded-full cursor-pointer`}></div>
                            {/* {accountType === "manager" && <div onClick={() => handleDirectChange(5)} className={`${currentItem === 5 ? "active" : "notactive"} bg-[#B0ADAD] h-1.5 w-1.5 rounded-full cursor-pointer`}></div>} */}
                            <div onClick={() => handleDirectChange(5)} className={`${currentItem === 5 ? "active" : "notactive"} bg-[#B0ADAD] h-1.5 w-1.5 rounded-full cursor-pointer`}></div>
                        </div>
                        <div onClick={slideNext}>
                            <NextBtn className=" rotate-[180deg]" />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default LeftContainer