import DashboardLayout from "@/components/layouts/DashboardLayout"
import Link from "next/link"
import ArrorwIcon from "../../../../public/svgs/arrow2-icon.svg"
import { useEffect } from "react"
import gsap from "gsap"
import { useRouter } from "next/router"

const TrainingTopic = () => {
    const routeTo = useRouter()
    useEffect(() => {
        gsap.timeline()
            .to(".topic-txt1", {color: "#5B5B5B", fontSize: "14px", fontWeight: "400", textDecoration: "underline"})
            .to(".topic-txt2", {x: 0, opacity: 1})
    },[])

    return (
        <DashboardLayout>
            <div className="text-[#333333]">
                <div className="flex  flex-col">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-0 text-[15px]">
                            <Link className=" cursor-pointer underline text-[#5B5B5B]" href={"/dashboard/trainings"}><p >Training</p></Link>
                            <div onClick={() => routeTo.back()} className="topic-txt1 cursor-pointer text-[20px] font-[600] flex items-center ">
                                <ArrorwIcon className="scale-[0.8]" />
                                <p className="  ">Personal Training</p>
                            </div>
                            {/* <ArrorwIcon className="scale-[0.8]" />
                            <p onClick={() => routeTo.back()} className="cursor-pointer underline text-[#5B5B5B]">Personal Training</p> */}
                            <div className="topic-txt2 flex items-center -translate-x-16 opacity-0">
                                <ArrorwIcon className="scale-[0.8]" />
                                <p className=" text-[#333333] font-[500] ">Topic</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center my-6">
                    <p className="text-[20px] font-[600]">Topic name</p>
                    <div className="flex gap-2 font-[700] text-[#B3387F] text-[15px] ">
                        <div className="border w-[8.5em] text-center py-1 px-3 border-[#B3387F] rounded-lg flex items-center gap-3 ">
                            <input type="checkbox" className="border border-[#B3387F] " />
                            Completed
                        </div>
                        <div className="border w-[8.5em] text-center py-1 px-3 border-[#B3387F] rounded-lg ">
                            Previous
                        </div>
                        <div className="border w-[8.5em] text-center py-1 px-3 border-[#B3387F] rounded-lg ">
                            Next
                        </div>

                    </div>
                </div>

                {/* Video Training */}
                <div className="bg-slate-400 h-[20em] ">
                </div>

                {/* Text Training */}
                {/* <div className="bg-white p-3 min-h-[70vh] overflow-auto">
                    <h1 className="font-[600]">Lorem Ipsum</h1>
                    <p className="text-[14px] mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore debitis neque quod quam odio unde non blanditiis iusto,
                         placeat ipsum quia. Earum necessitatibus perspiciatis nobis. Obcaecati ea quaerat iusto iure
                         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus odio nam corrupti magnam alias omnis
                         Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti fugit, vel qui sequi optio quisquam maiores obcaecati?
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora consequatur consequuntur quae, porro ab tenetur, non placeat 
                         facere qui sit modi odit quidem itaque reprehenderit ullam quam dicta asperiores repellendus. Sapiente cupiditate officia eius incidunt sequi, eveniet totam nemo rerum, est vitae quisquam? explicabo rerum accusamus itaque. Recusandae aperiam non placeat minus doloremque veniam est eaque adipisci beatae.
                         .</p>
                </div> */}
            </div>
        </DashboardLayout>
    )
}

export default TrainingTopic