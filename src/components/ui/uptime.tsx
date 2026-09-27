const Uptime = () => {
    return (
        <div className="p-4 bg-white rounded-xl">
            <div className="flex justify-between">
                <h1 className="text-[#333333] font-[600] text-[18px]">Uptime</h1>
                <div className="border border-[#CEC8C8] text-[#929292] text-[10px] px-2 rounded-md h-min py-[3px] flex items-center">
                    <p>Scan Frequency: 1hour</p>
                </div>
            </div>

            <div className="flex flex-col mdx4:flex-row mt-3">
                <div className="flex-[1.3] bg-white flex-shrink-0 pr-5">
                    <div className="flex justify-between text-[12px]">
                        <div>
                            <p className="text-[#929292]">Current Status</p>
                            <p className="text-[#4AB638] font-[600]">Up for 3 hours</p>
                        </div>
                        <div>
                            <p className="text-[#929292]">Total Uptime</p>
                            <p className="text-[#333333] font-[600]">96.2%</p>
                        </div>
                        <div>
                            <p className="text-[#929292]">Response Time</p>
                            <p className="text-[#333333] font-[600]">2.9s</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex-shrink-0 mdx4:border-l mt-7 mdx4:mt-0 mdx4:pl-5">
                    <h1 className="text-[18px] font-[600] text-[#333333] mb-3">History</h1>
                    <div className="grid grid-cols-3 text-[#929292] text-[10px]">
                        <p>Date</p>
                        <p  className="mx-auto">Up/Down</p>
                        <p className="ml-auto">Response</p>
                    </div>
                    <div className="flex flex-col gap-2 mt-3">
                        {[0,0,0,0].map(item => (
                            <div className="grid grid-cols-3  text-[10px] border-b pb-2">
                                <div>
                                    <p className="text-[#333333] font-[600]">Aug 22, 2024</p>
                                    <p className="text-[#929292]">10:00 AM</p>
                                </div>
                                <div className="mx-auto">
                                    <p className="text-[#4AB638]">100.0%</p>
                                    <p className="text-[#EA4335]">0.8%</p>
                                </div>
                                <div className="ml-auto">
                                    <p className="text-[#333333] font-[600]">2.9 s</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Uptime