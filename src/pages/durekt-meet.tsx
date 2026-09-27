import HomeLayout from "@/components/layouts/HomeLayout"
import meet from "../../public/images/homepage/google.png"
import ellipse from "../../public/images/Ellipse 2367.png"
import Image from "next/image"
import Button from "@/components/primary/Button"

const DurektMeet = () => {
    return (
        <HomeLayout>
            <div className="bg-white text-[#333333] flex flex-col relative">
                <div className="mx-auto text-center mt-14 mb-20 sm:mb-24">
                    <div className="h-[60px] w-[60px] mx-auto">
                        <Image src={meet} alt="meet" height={10000} width={10000} />
                    </div>
                    <h1 className="text-[35px] sm:text-[52px] font-[700] mt-0">Durekt for Google Meet</h1>
                    <p className="text-[15px] sm:text-[18px] text-[#5B5B5B] font-[500]">Integrate Durekt to Google Meet to boost sales performance..</p>
                    <div className="w-[130px] mx-auto mt-6">
                        <Button className="rounded-md" >Get Started</Button>
                    </div>
                </div>

                <div className="bg-[#C5E3E2] min-h-[17em] sm:min-h-[21.5em] p-3 relative">
                    <Image src={"/images/meet-bg.png"} height={500} width={500} className="mx-auto relative z-[2]" alt="alt-text" />

                    <Image src={ellipse} className="absolute top-0 left-0 h-[100px] w-[150px] mx-auto" alt="alt-text" />
                    <Image src={ellipse} className="absolute bottom-0 right-8 sm:right-24 rotate-[180deg] h-[50px] sm:h-[100px] w-[80px] sm:w-[150px] mx-auto" alt="alt-text" />
                </div>

                <div className="w-[90%] md:w-[40em] mx-auto text-center mt-[50px] sm:mt-[100px] mb-[50px]">
                    <h1 className="font-[700] text-[28px] sm:text-[30px] leading-[35px] mb-8 sm:mb-12 ">Improve sales experience via Google meet with Durekt</h1>
                    <p className="text-[#5B5B5B] text-[14.5px] sm:text-[16px] mb-6 sm:mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="text-[#5B5B5B] text-[14.5px] sm:text-[16px] mb-6 sm:mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p className="text-[#5B5B5B] text-[14.5px] sm:text-[16px] mb-6 sm:mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </HomeLayout>
    )
}

export default DurektMeet