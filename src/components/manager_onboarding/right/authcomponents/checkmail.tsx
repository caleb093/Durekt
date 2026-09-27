import Button from "@/components/primary/Button"
import Key from "../../../../../public/svgs/key_icon.svg"
import React, { useState, useRef, FC, ChangeEvent, useLayoutEffect, useEffect } from "react"
import { sectionType } from "../rightContainer"
import Logo from "@/components/primary/Logo"
import { useGetOTPMutation, useVerifyOTPMutation} from "../../../../../api-feature/apiSlice"
import { useRouter } from "next/router"
import toast from "react-hot-toast"
import ArrowLeft from "../../../../../public/svgs/arrow-left.svg"

interface props {
    changeSection: (newSection: sectionType) => void
}

const CheckMail:FC<props> = React.memo(({changeSection}) => {
    const router = useRouter()
    const numberSequence = [0, 1, 2, 3,4,5]
    const [timeLeft, setTimeLeft] = useState(10); // Start from 10 seconds
    const [countdownComplete, setCountdownComplete] = useState(false); // To track when countdown is done
    const [isCountdownActive, setIsCountdownActive] = useState(false); // Track if countdown is active
    const [verifyOTP] = useVerifyOTPMutation()
    const [getOTP] = useGetOTPMutation()
    const [userInput, setUserInput] = useState<{ [key: string]: string }>({
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
    })
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const allFieldsFilled = Object.values(userInput).every(value => value !== "");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        // Only update the state if the current input is empty and the new value is a single digit
        if (userInput[`value${index + 1}`] === "" && value.length === 1) {
            setUserInput(prevState => ({
                ...prevState,
                [`value${index + 1}`]: value,
            }));

            // Shift focus to the next input field if the current one is filled
            if (index < numberSequence.length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const { key } = e;

        if (key === 'Backspace') {
            if (userInput[`value${index + 1}`] !== "") {
                // Clear the current input field immediately
                setUserInput(prevState => ({
                    ...prevState,
                    [`value${index + 1}`]: "",
                }));
            } else if (index > 0) {
                // If the current field is already empty, move to the previous field and clear it
                inputRefs.current[index - 1]?.focus();
                setUserInput(prevState => ({
                    ...prevState,
                    [`value${index}`]: "",
                }));
            }
        }
    };


    const startCountdown = () => {
        if (isCountdownActive) return; // Prevent starting if countdown is already active

        setCountdownComplete(false); // Reset state before starting
        setIsCountdownActive(true); // Set countdown to active
        setTimeLeft(10); // Reset the time to 10 seconds

        let time = 10; // Starting time

        const timer = setInterval(() => {
        time--; // Decrease time
        setTimeLeft(time);

        if (time === 0) {
            clearInterval(timer); // Stop the countdown when it reaches 0
            setCountdownComplete(true); // Set the state when the countdown finishes
            setIsCountdownActive(false); // Set countdown to inactive
        }
        }, 1000); // Countdown by 1 second intervals
    };

    const handleGetOTP = (click?: boolean) => {
        click && startCountdown()
        try {
            getOTP({}).unwrap()
                .then(fulfilled => (
                    click && toast.success("OTP SENT")
                ))
                .catch(rejected => {
                    toast.error("Error generating code")
                    console.error(rejected)
                })
        } catch(error) {
            toast.error("Error generating code")
            console.error(error)
        }
    }

    const handleVerifyOTP = () => {
        let code = ""
        Object.values(userInput).map(value => {code = code + value})
        console.log(code)
        try {
            verifyOTP({code: code}).unwrap()
                .then(fulfilled => (
                    console.log(fulfilled),
                    toast.success("Code Verified"),
                    router.push("/company-setup")
                ))
                .catch(rejected => {
                    toast.error("Error occured")
                    console.error(rejected)
                })
        } catch(error) {
            toast.error("Error occured")
            console.error(error)
        }
    }
    
    useEffect(() => {
        handleGetOTP()
    },[])


    return (
        <>
            <Logo />
            <Key className="mx-auto mt-4" />
            <h1 className="text-[1.5em] sm:text-[2em]  mt-1 font-medium text-[#333333]">Check your email</h1>
            <p className="text-[0.9em] mb-8 text-[#5B5B5B] pt-2 font-normal">Enter the 6 digit code sent to *********@gmail.com</p>

            <div className="flex gap-4 justify-center mb-10">
                {numberSequence.map((item, i) => (
                    <input 
                        // @ts-ignore
                        ref={el => inputRefs.current[i] = el} // Attach refs to the input fields
                        autoFocus={i === 0}
                        value={userInput[`value${i + 1}`]} // Bind the input value to state
                        onChange={(e) => handleInputChange(e, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        type="number" 
                        className="border-b border-b-[#5272EA] font-medium text-[1.5em] sm:text-[2em] text-[#5272EA] h-[2em] w-[13%] sm:w-[2em] text-center"
                        max={10}
                    />
                ))}
            </div>
            
            <Button disabled={!allFieldsFilled} className="disabled:cursor-not-allowed" onClick={handleVerifyOTP}>
                Verify
            </Button>

            <p className="mt-8 text-[0.9em] text-[#475467]">Didn't receive the email? <button disabled={isCountdownActive} onClick={() => handleGetOTP(true)} className="text-[#5272EA] disabled:cursor-not-allowed disabled:text-slate-700 font-medium cursor-pointer ">Click to resend {!countdownComplete && `(${timeLeft})`}</button></p>
            <p onClick={() => changeSection("signin")} className="flex justify-center items-center gap-2 cursor-pointer text-[0.9em] text-[#475467] font-medium mt-6"><ArrowLeft /> Back to Sign in</p>
        </>
    )
})

export default CheckMail
