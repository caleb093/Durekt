import React, { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { gsap } from 'gsap';
import StarIcon from "../../../public/svgs/Star-icon.svg"
import Arrow from "../../../public/svgs/arrow2-icon.svg"

interface CarouselProps {
  items: {header?: string, body?: string, author?: string, position?: string}[];
  largeScreenItems?: number;
  smallScreenItems?: number;
  gap?: number;
  draggable?: boolean;
  CustomNavButton?: React.ComponentType<{ direction: 'prev' | 'next'; onClick: () => void }>;
  customItemStyle?: CSSProperties;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  largeScreenItems = 4,
  smallScreenItems = 1,
  gap = 10,
  draggable = false,
  CustomNavButton,
  customItemStyle,
}) => {
    const borderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numVisibleItems, setNumVisibleItems] = useState(largeScreenItems);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setNumVisibleItems(width < 1000 ? smallScreenItems : largeScreenItems);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [largeScreenItems, smallScreenItems]);

  // Total number of sections (pages of items)
  const totalSections = Math.ceil(items.length / numVisibleItems);

  // Update the active dot animation
  useEffect(() => {
    const currentSection = Math.min(Math.floor(currentIndex / numVisibleItems), totalSections - 1);
    
    gsap.to(dotRefs.current, {
      width: (i: number) => (i === currentSection ? '20px' : '10px'),
      borderRadius: (i: number) => (i === currentSection ? '10px' : '50%'),
    //   height: (i: number) => (i === currentSection ? '20px' : '10px'),
      duration: 0.5,
      ease: 'power1.out',
    });
  }, [currentIndex, numVisibleItems, totalSections]);
  
  const nextSlide = () => {
    if (currentIndex < items.length - numVisibleItems) {
      setCurrentIndex((prev) => Math.min(prev + numVisibleItems, items.length - numVisibleItems));
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - numVisibleItems, 0));
    }
  };
  
  // Animate the carousel scrolling
  useEffect(() => {
    gsap.to(carouselRef.current, {
      x: -(currentIndex * (100 / numVisibleItems)) + '%',
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, [currentIndex, numVisibleItems]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
            ref={carouselRef}
            style={{
                display: 'flex',
                gap: `${gap}px`,
                cursor: draggable ? 'grab' : 'default',
                transition: draggable ? 'none' : 'transform 0.5s ease',
                // height: "100%"
            }}
            onMouseDown={draggable ? () => {} : undefined} // Dragging can be implemented if needed
        >
        {items.map((item, index) => (
            <div
                key={index}
                ref={(el) => {
                    itemsRef.current[index] = el; // Just assign without returning
                }}
                style={{
                    flex: `0 0 calc(${100 / numVisibleItems}% - ${gap}px)`,
                    ...customItemStyle,
                }}
                // className='bg-red-600 '
            >
            <div className="relative bg-[#18181B] px-[1px] h-full py-[1px] rounded-xl overflow-hidden">
                <div 
                ref={borderRef} 
                className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-[#48D0FF] to-[#C32782]"
                style={{
                    background: 'linear-gradient(to right, #48D0FF, #C32782)',
                    transform: 'rotate(0deg)',
                    transition: 'all 0.5s ease-in-out',
                }}
                >
                </div>
                <div className="relative z-[4] flex flex-col bg-[#18181B] h-full px-6 py-8 rounded-xl">
                  <div className="flex gap-2">
                      <StarIcon className="h-[20px] w-[20px]"  />
                      <StarIcon className="h-[20px] w-[20px]"  />
                      <StarIcon className="h-[20px] w-[20px]"  />
                      <StarIcon className="h-[20px] w-[20px]"  />
                      <StarIcon  className="h-[20px] w-[20px]" />
                  </div>
                  <h1 className='mt-4'>{item?.header}</h1>
                  <p className="py-4 text-[14.5px]">{item?.body}</p>
                  <div className="mt-auto flex gap-2">
                      {/* <div className="w-[43px] bg-slate-600 rounded-full">
                      </div> */}
                      <div>
                      <p className="text-[#71717A] text-[14.5px] font-[600]">{item?.author}</p>
                      <p className="text-[12px] mt-1 ">{item?.position}</p>
                      </div>
                  </div>
                </div>
            </div>
            </div>
        ))}
        </div>

        <div className=' mx-auto mt-[4em] flex items-center justify-between w-[100%] sm:w-[15em] '>
            {/* Navigation buttons */}
            {CustomNavButton ? (
            <CustomNavButton direction="prev" onClick={prevSlide} />
            ) : (
            <button className='bg-[#FFFFFF4D] active:scale-[0.9] rounded-full transition-all' onClick={prevSlide} style={{ }}>
                <Arrow className="rotate-[180deg]" />
            </button>
            )}


            {/* Dot Indicators */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    // marginTop: '20px',
                }}
            >
                {Array.from({ length: totalSections }).map((_, i) => (
                    <div
                    key={i}
                    ref={(el) => {dotRefs.current[i] = el}}
                    style={{
                        width: i === Math.floor(currentIndex / numVisibleItems) ? '20px' : '10px',
                        height: '8px',
                        background: i === Math.floor(currentIndex / numVisibleItems) ? '#FFFFFF' : '#B0ADAD',
                        borderRadius: '50%',
                        margin: '0 5px',
                        transition: 'all 0.5s ease',
                    }}
                    />
                ))}
            </div>

            
            {CustomNavButton ? (
            <CustomNavButton direction="next" onClick={nextSlide} />
            ) : (
            <button className='bg-[#FFFFFF4D] active:scale-[0.9] rounded-full transition-all' onClick={nextSlide} style={{ }}>
                <Arrow />
            </button>
            )}
        </div>

    </div>
  );
};

export default Carousel;
