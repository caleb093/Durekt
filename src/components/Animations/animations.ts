import gsap from "gsap"

export const carouselDotAnimation = () => (
    gsap.timeline()
        .to(".active", {width: "1em", backgroundColor: "white"})
        .to(".notactive", {width: "0.375rem", backgroundColor: "#B0ADAD"}, "<")
)
