import toast from "react-hot-toast";
import { usePostSendSalesrepMessageMutation } from "../../../api-feature/apiSlice";
import Button from "../primary/Button";
import Input from "../primary/input";
import Modal from "../primary/Modal"
import { FC, useCallback, useState } from "react"
import ActivityIndicator from "../secondary/ActivityIndicator";

interface props {
    modalOpen: boolean;
    closeModal: () => void;
    userId: number
}

const MessageModal:FC<props> = ({ modalOpen, closeModal, userId}) => {
    const [sendMessage] = usePostSendSalesrepMessageMutation()
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value
        setMessage(value)
    }, [])
    
    const submitMessage = async () => {
        try {
            setLoading(true)

            await sendMessage({userId: userId, content: message}).unwrap()
                .then(fulfilled => {
                    toast.success("Message sent")
                    setMessage("")
                    closeModal()
                })
                .catch(rejected => {
                    toast.error("error occured")
                })
        } catch(error) {
            toast.error("error occured")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            isOpen={modalOpen}
            onClose={loading ? () => {} : closeModal}
        >
            <div className="pt-7 pb-12 px-14">
                <p className="text-center text-[24px] text-[#333333] font-[500] pb-8">Write Message</p>
                <Input 
                    className="mb-[8px]"
                    value={message}
                    onChange={handleOnChange}
                    label={<label className="text-[#333333] font-medium text-[0.9em]">Module</label>} 
                    placeholder="type message"
                    type="text"
                    name="module"
                />
                <Button onClick={submitMessage} disabled={loading || !message} className="h-[2.68em]">
                    {loading ? <ActivityIndicator /> : "Send"}
                </Button>
            </div>
        </Modal>
    )
}

export default MessageModal