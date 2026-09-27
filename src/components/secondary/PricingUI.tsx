import Button from "../primary/Button"
import CheckIcon from "../../../public/svgs/check-icon.svg"
import InfoIcon from "../../../public/svgs/outline.svg"
import { FC } from "react"
import { BASE_URL } from "../../../api-feature/apiSlice"
import axios from "axios"
import toast from "react-hot-toast"

interface props {
    monthly: boolean
}

const priceData = [
    {
        type: "Individual",
        price: 100,
        description:  "For sole founders or individual sales professionals",
    },
    {
        type: "Business",
        price: 80,
        description: "For growing companies and sales teams",
    }
]

const PricingUi:FC<props> = ({monthly}) => {
    // NOT WORKING YET
    const func = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/subscription`)
            const data = response.data

            console.log(data)
        } catch(error) {
            console.error(error)
        }
    }

    func()

    return (
        <div className="grid mdx3:grid-cols-2 mdx5:flex gap-[1em] sm:gap-[2%] mt-[3em] sm:mt-[7em]">
        {/* <div className="flex"> */}
            {priceData.map((item, index) => (
            <div
                className="p-[1.5px] flex-1 rounded-md"
                style={index + 1 == 2 ? {
                    background: 'linear-gradient(to right, #48D0FF, #C32782)',
                    transform: 'rotate(0deg)',
                    transition: 'all 0.5s ease-in-out',
                } : {

                }}
            >
                <div className="bg-[#18181B] flex flex-col h-full rounded-md text-left pt-8 pb-10 px-5">
                    <div className="w-[80%] mb-4">
                        <h2 className="text-[18px]">{item?.type}</h2>
                        <h1><span className="text-[40px]">${monthly ? item?.price : item.price - (item?.price * (20/100))}</span><span className="text-[#71717A] pl-2">/{monthly ? "month" : "yearly"}</span></h1>
                        <p className="text-[#A1A1AA] pt-2">{item?.description}</p>
                    </div>
                    <div className="h-[1px] bg-[#27272A] my-3 mt-auto" />
                    {/* <div className="flex flex-col gap-5">
                        {[1,2,3,4,5].map((item, index) => ( 
                            <div className="flex text-[13px] sm:text-[14px] items-center gap-2">
                                <CheckIcon />
                                <p className="text-slate-300">Full Access to Landingfolio</p>
                                <InfoIcon />
                            </div>
                        ))}
                    </div> */}
                    <Button onClick={() => toast.error("work in progress")} className={`${index + 1 == 2 ? "bg-[#B3387F]" : "bg-transparent border rounded-md border-gradient "} mt-8  py-3 rounded-sm`}>FULL ACCESS</Button>
                </div>
            </div>))}
        </div>
    )
}

export default PricingUi