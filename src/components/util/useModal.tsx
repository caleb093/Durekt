import { useState } from "react"

const useModal = () => {
    const [modalOpen, setModalOpen] = useState(false)
    
    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    return {modalOpen, closeModal, openModal}
}

export default useModal