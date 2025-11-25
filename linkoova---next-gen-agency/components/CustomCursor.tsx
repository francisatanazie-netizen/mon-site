
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Pointer - Gold Arrow Head */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 22L12 18L22 22L12 2Z"
            fill="#D1A954"
            stroke="black"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* Trailing Physics Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#D1A954] z-[9998] pointer-events-none"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.2,
          borderColor: isHovering ? '#D1A954' : '#D1A954',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      />
      
      {/* Hover Glow */}
      {isHovering && (
          <motion.div 
             className="fixed top-0 left-0 w-20 h-20 bg-[#D1A954]/20 rounded-full blur-xl z-[9997] pointer-events-none"
             animate={{
                x: mousePosition.x - 40,
                y: mousePosition.y - 40,
             }}
          />
      )}
    </>
  );
};

export default CustomCursor;
