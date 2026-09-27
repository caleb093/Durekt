import HomeLayout from "@/components/layouts/HomeLayout"
import Button from "@/components/primary/Button"
import CheckIcon from "../../public/svgs/check-icon.svg"
import InfoIcon from "../../public/svgs/outline.svg"
import PricingUi from "@/components/secondary/PricingUI"
import FaqUI from "@/components/secondary/FaqUI"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"


const Pricing = ({priceData}: {priceData: {}}) => {
    const [dispalyMonthly, setDisplayMonthly] = useState(true)
    const backgroundOverlay = useRef(null)

    const animation = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        // Create the animation timeline only once
        animation.current = gsap.timeline({ paused: true })
            .fromTo(backgroundOverlay.current, { x: 0, ease: "power1" }, { x: "100%", ease: "power1" });
    }, []);

    const handleChangeSection = () => {
        console.log("Clicked")
        
        dispalyMonthly && animation.current?.restart()
        !dispalyMonthly && animation.current?.reverse()

        setDisplayMonthly(prev => !prev)
    }

    return (
        <HomeLayout>
            <div className="text-[#333333] bg-white py-[3em] sm:py-[4em]">
                <div className="w-[90%] mdx4:w-[50em] mx-auto text-center">
                    <h1 className="text-[35px] sm:text-[45px] font-[700] mt-0">Simple pricing that scales with you</h1>
                    <p className="text-[#5B5B5B] font-[500]">User friendly pricing plans for your business</p>

                    <div className="border flex flex-col-reverse sm:flex-row gap-2 sm:gap-0 p-[3px] w-full rounded-md mt-4">
                        <div onClick={handleChangeSection} className={`${dispalyMonthly ? "bg-[#B3387F]" : "bg-transparent"} sm:bg-transparent relative font-[700] text-[15px] rounded-md text-center flex-1 py-1 cursor-pointer`}>
                            <p className={`relative transition-all z-[2] ${dispalyMonthly ? "text-white" : "text-[#333333]"}`}>Monthly</p>
                            <div ref={backgroundOverlay} className="hidden sm:flex bg-[#B3387F] rounded-md w-full h-full absolute top-0"></div>
                        </div>
                        <div onClick={handleChangeSection} className={`${!dispalyMonthly ? "bg-[#B3387F]" : "bg-transparent"} py-1 sm:py-0 sm:bg-transparent rounded-md flex-1 font-[700] flex justify-center gap-2 sm:mt-0 items-center cursor-pointer`}>
                            <p className={`text-[15px] transition-all relative z-[2] ${!dispalyMonthly ? "text-white" : "text-[#333333]"} `}>YEARLY</p>
                            <span className="text-[12px] flex items-center px-4 bg-[#5F5FC9] text-white rounded-md relative z-[2]">SAVE UP TO 20%</span>
                        </div>
                    </div>
                </div>

                <div className="md px-[1em] sm:px-[4em] xl:px-[8em] text-white">
                    <PricingUi monthly={dispalyMonthly} />
                </div>

                <div className="mx-auto pt-[7em] p-[1em] sm:p-[4em]">
                    <h1 className="text-[35px] text-center sm:text-[45px] font-[700] mt-0">Frequently Asked Pricing Questions</h1>
                    
                    <div className="w-[100%] md:w-[40em] mx-auto mt-14 ">
                        <FaqUI className="bg-white border-t mt-[0px] py-3" detailsClassName=" text-[#333333] text-[14px]" />
                    </div>
                </div>

                <div className="text-center w-[95%] sm:w-[40em] mt-20 mx-auto">
                    <h1 className="text-[22px] font-[700] ">Want to improve Sales experience for your Team? </h1>
                    <p className="text-[18px] font-[600] text-[#5B5B5B]">Create an Account for Free now</p>
                    <div className="w-[150px] mx-auto mt-6">
                        <Button>Get Started</Button>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

// export default Pricing
export async function getServerSideProps() {
    try {
        const response = await fetch(`${process.env.BASE_URL}/subscription`);
        const data = await response.json();

        return {
            props: {
                priceData: data, // Pass the fetched data to the component as props
            },
        };
    } catch (error) {
        console.error("Error fetching subscription data:", error);

        return {
            props: {
                priceData: [], // Provide a fallback to prevent the page from breaking
            },
        };
    }
}

export default Pricing;