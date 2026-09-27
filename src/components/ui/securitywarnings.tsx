import SecurityIcon from "../../../public/svgs/security-icon.svg"

const SecurityWarnings = () => {
    return (
        <div className="bg-white px-5 pt-5 pb-10 rounded-xl">
            <h1 className="text-[18px] font-[600]">Security warnings</h1>

            <div className="flex flex-col mdx4:flex-row mt-8">
                <div className=" flex-1 flex-shrink-0 p">
                    <div className="pr-12">
                        <div className="flex text-[#929292] text-[10px] items-center justify-between ">
                            <div className="border border-[#CEC8C8] rounded-md px-2 py-1 font-[600]">Scan Frequency: 1hour</div>
                            <p className="font-[600]">8:12 am</p>
                        </div>

                        <div className="h-[1px] w-full bg-[#E8E8E8] mt-6 mb-5 " />
                    </div>

                    <div className="text-[10px] flex flex-col gap-4">
                        <div className="flex gap-2">
                            <SecurityIcon className="text-[#4AB638] " />
                            <p>No malware detected by scan</p>
                        </div>
                        <div className="flex gap-2">
                            <SecurityIcon className="text-[#4AB638] " />
                            <p>No defacement detected</p>
                        </div>
                        <div className="flex gap-2">
                            <SecurityIcon className="text-[#EE5D50] " />
                            <p className="text-[#EE5D50]">SEO Spam Detected</p>
                        </div>
                    </div>
                </div>
                <div className="hidden mdx4:flex w-[1.3px] bg-[#E8E8E8] h-[8em] my-auto flex-shrink-0" />
                <div className="flex-1 flex-shrink-0 ">
                    <div className="mt-7 mdx4:mt-0 pl-0 mdx4:pl-5">
                        <h2 className="font-[600] text-[#333333]" >Target service</h2>

                        <div className="flex flex-col gap-4 mt-5">
                            {[0,3,3,3,].map(item => (
                                <div className="flex flex-col gap-1 text-[10px] text-[#333333] ">
                                    <div className="flex justify-between">
                                        <p className="text-[#333333] font-[600]">Firewalls</p>
                                        <p className="font-[700]">28 <span className="text-[#929292] font-[500]">of 64 scanned</span></p>
                                    </div>
                                    <div className="text-[#2B3674] items-center flex text-[14px] flex-shrink-0 flex-[0.8]">
                                        <div className="w-[100%] overflow-hidden bg-[#EFF4FB] h-[8px] rounded-lg ">
                                            <div className="w-[40%] rounded-lg h-full bg-[#B3387F]" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecurityWarnings