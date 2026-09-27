import { useState } from "react";

const useImageUpload = () => {
    const [imageFile, setImageFile]= useState<any>()
    const [selectedImage, setSelectedImage] = useState<any>();
    const [fileIsTooLarge, setFileIsTooLarge] = useState(false);


    const handleFileSelection = (file: File) => {
        setFileIsTooLarge(false);
        console.error("the image raw file is", file);

        if (!file) return;
        const maxFileSizeInBytes = 1024 * 1024;

        if (file.size > maxFileSizeInBytes) {
            setFileIsTooLarge(true);
            return;
        }

        setImageFile(file)
        const reader = new FileReader();
        reader.onload = () => {
        const result = reader.result as string;
            setSelectedImage(result);
        };
        reader.readAsDataURL(file);
    }

    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageFile("")
        const file = e.target.files && e.target.files[0];
        if (file) {
            handleFileSelection(file);
        }
    };

    return {imageFile, selectedImage, fileIsTooLarge, handleSelectImage}
};

export default useImageUpload