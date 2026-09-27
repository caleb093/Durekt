import HomeLayout from "@/components/layouts/HomeLayout"
import Button from "@/components/primary/Button"
import Search from "@/components/secondary/Search"
import Image from "next/image"
import ArrowIcon from "../../public/svgs/arrow2-icon.svg"
import { faqsData } from "@/components/secondary/FaqUI"
import { useState } from "react"

const FaqPage = () => {
    const [searchText, setSearchText] = useState("")
    const filteredData = faqsData.filter(item => item.question.toLowerCase().includes(searchText.toLocaleLowerCase()))

    return (
        <HomeLayout>
            <div className="bg-white px-[1em] sm:px-[3.5em] mdx5:px-[5em] pb-[3em] pt-[4em] mdx3:py-[5em] text-center">
                <h1 className="text-[35px] text-[#333333] sm:text-[52px] font-[700] mt-0 leading-[40px] sm:leading-[60px] mdx4:leading-[80px] mb-4 sm:mb-0">Frequently Asked Questions</h1>
                <p className="text-[15px] sm:text-[18px] text-[#5B5B5B] font-[500]">Discover how to use Durekt to boost sales performance..</p>

                <div className="flex w-[95%] sm:w-[35em] mx-auto mt-[4em] mb-[5em] ">
                    <div className="flex-[2]">
                        <Search containerClassName="rounded-none rounded-tl-[7px] rounded-bl-[7px] overflow-hidden border-[#D4D4D4]" showIcon={false} className=" w-full h-[2.3em] text-black rounded-tl-[7px] rounded-bl-[7px] bg-[#F4F1F1]" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    </div>
                    <Button className="flex-[0.5] rounded-none rounded-tr-[7px] rounded-br-[7px]">Search</Button>
                </div>

                <div className="grid sm:grid-cols-2 mdx4:grid-cols-3 gap-x-12 gap-y-8 sm:gap-y-10">
                    {filteredData?.map(item => (
                        <div className=" text-left">
                            <h2 className="text-[#333333] font-[700] text-[20px] sm:text-[24px] mb-3 sm:mb-5">{item?.question}</h2>
                            <p className="text-[#5B5B5B] font-[500] text-[15px]">{item?.answer}</p>
                        </div>
                    ))}
                </div>
                {/* <p className="text-[#C32781] font-[700] text-[18px] mt-[4em] flex items-center justify-center">See more questions <ArrowIcon className="scale-[0.9]" /></p> */}

                <div className="mt-[5em] sm:mt-[9em]">
                    <div className="flex gap-4 justify-center mb-[2em]">
                        <Image className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] rounded-full bg-slate-300" src={"/images/faq-img1.png"} alt="faq image" height={1000} width={1000} />
                        <Image className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] rounded-full bg-slate-300" src={"/images/faq-img4.png"} alt="faq image" height={1000} width={1000} />
                        <Image className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] rounded-full bg-slate-300" src={"/images/faq-img3.png"} alt="faq image" height={1000} width={1000} />
                        <Image className="h-[60px] sm:h-[80px] w-[60px] sm:w-[80px] rounded-full bg-slate-300" src={"/images/faq-img2.png"} alt="faq image" height={1000} width={1000} />
                    </div>
                    <h1 className="text-[#333333] text-[35px] sm:text-[45px] font-[700] mt-0">Got more questions?</h1>
                    <p className="text-[#5B5B5B]">Contact our Durekt Support Heroes. <br />They’ll provide you with all the information you need.</p>
                    <div className="w-[150px] mx-auto mt-[2.5em]">
                        <Button className="rounded-sm">Contact us</Button>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default FaqPage