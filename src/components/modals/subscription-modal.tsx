import { FC, useContext, useState } from "react";
import { ApiType } from "../../../api-feature/types"
import Button from "../primary/Button"
import Modal from "../primary/Modal"
import toast from "react-hot-toast";
import CheckIcon from "../../../public/svgs/check-icon.svg"
import { usePostMakePaymentMutation } from "../../../api-feature/apiSlice";
import useLoading from "../util/useLoading";
import { appContext } from "../contexts/appContext";
import { subscriptionType } from "../../../api-feature/subscription/subscription-type";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
    subscriptionData: subscriptionType[];
}

interface makePaymentApiType extends ApiType {
    data: {data: string, success: boolean}
}

const SubscriptionModal:FC<props> = ({subscriptionData, modalOpen, closeModal}) => {
    const {loading, startLoading, stopLoading} = useLoading()
    const [makePayment] = usePostMakePaymentMutation()
    const {userProfile} = useContext(appContext)

    const handleMakePayment = async (id: number) => {
        const toastId = toast.loading("loading")
        try {
            startLoading()
            await makePayment({planId: id, success_url: "https://project-prototype-five.vercel.app/dashboard/settings", cancel_url: "https://project-prototype-five.vercel.app/dashboard/settings"}).unwrap()
                .then(fulfilled => {
                    // @ts-ignore
                    window.open(fulfilled?.data, "_self")
                })
                .catch(rejected => {
                    toast.error(rejected?.data?.message ?? "Error occured")
                })
        } catch (error) {
            console.error("rejected")
            toast.error("Error occured")
        } finally {
            toast.dismiss(toastId)
            stopLoading()
        }
    }

    const isSubscribed = userProfile?.current_subscription?.subscriptionPlan?.name

    return (
        <Modal isOpen={modalOpen} onClose={loading ? () => {} : closeModal} containerClassname={"w-[85%] max-h-[80vh] overflow-scroll px-8 pb-7 rounded-xl bg-white"}>
            <h1 className="text-center font-[700] text-[18px] mt-12 mb-5">Subscription Plans</h1>
            <div className="grid mdx3:grid-cols-2 mdx5:flex gap-[1em] sm:gap-[2%] ">
                {/* <div className="flex"> */}
                {subscriptionData?.map((item, index) => {
                    const isCurrentSubscription = item?.name === userProfile?.current_subscription?.subscriptionPlan?.name

                    return (
                        <div
                            className="p-[1.5px] flex-1 rounded-md text-white"
                            style={isCurrentSubscription ? {
                                background: 'linear-gradient(to right, #48D0FF, #C32782)',
                                transform: 'rotate(0deg)',
                                transition: 'all 0.5s ease-in-out',
                            } : {

                            }}
                        >
                            <div className="bg-[#18181B] flex flex-col h-full rounded-md text-left pt-8 pb-10 px-5">
                                <div className="w-[80%] mb-4">
                                    <h2 className="text-[18px]">{item?.name}</h2>
                                    <h1><span className="text-[40px]">${item.price}</span><span className="text-[#71717A] pl-2">/{item?.billingCycle}</span></h1>
                                    <p className="text-[#A1A1AA] pt-2">Max Team: {item?.maxTeam}</p>
                                    <p className="text-[#A1A1AA] pt-2">Max Agents: {item?.maxAgents}</p>
                                </div>
                                <div className="h-[1px] bg-[#27272A] my-3 mt-auto" />
                                <div className="flex flex-col gap-5">
                                    {item?.features.map((item, index) => ( 
                                        <div key={index} className="flex text-[13px] sm:text-[14px] items-center gap-2">
                                            <CheckIcon />
                                            <p className="text-slate-300">{item}</p>
                                            {/* <InfoIcon /> */}
                                        </div>
                                    ))}
                                </div>
                                <Button disabled={loading || isCurrentSubscription}  onClick={() => handleMakePayment(item.id)} className={`${isCurrentSubscription ? "bg-[#B3387F]" : "bg-transparent border rounded-md border-gradient "} mt-8  py-3 rounded-sm`}>{isCurrentSubscription ? "CURRENT PLAN" : isSubscribed ? item?.name : "GET ACCESS"}</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

export default SubscriptionModal