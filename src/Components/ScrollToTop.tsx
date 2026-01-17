import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import React, { useEffect, useState } from 'react'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;

        setScrollProgress(progress);
        setIsVisible(scrollTop > 1270);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-10 md:bottom-15 right-4 md:right-15 flex items-center justify-center z-50"
                    initial={{
                        opacity: 0,
                        scale: 0.4,
                        y: 40,
                        rotate: -180
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        rotate: 0
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.4,
                        y: 40,
                        rotate: 180
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            background: 'radial-gradient(circle, rgba(255,113,113,0.4) 0%, transparent 70%)',
                            filter: 'blur(12px)',
                        }}
                    />

                    <svg
                        className="absolute -inset-1 w-16 h-16 md:w-[72px] md:h-[72px] -rotate-90"
                        viewBox="0 0 100 100"
                    >
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(255,113,113,0.1)"
                            strokeWidth="2"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: scrollProgress / 100 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            style={{
                                strokeDasharray: "283",
                                filter: "drop-shadow(0 0 8px rgba(255,113,113,0.6))"
                            }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ff7171" />
                                <stop offset="50%" stopColor="#ff8585" />
                                <stop offset="100%" stopColor="#ffa0a0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Main button */}
                    <motion.button
                        onClick={scrollToTop}
                        className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#ff7171] to-[#ff8585] text-white shadow-2xl overflow-hidden group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Animated background gradient */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#ff8585] to-[#ffa0a0] opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                        />

                        {/* Shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                                x: ['-100%', '200%']
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Arrow icon */}
                        <motion.div
                            animate={{
                                y: [0, -4, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <ArrowUp
                                className="relative z-10"
                                width="24"
                                height="24"
                                strokeWidth={2.5}
                            />
                        </motion.div>

                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/10" />
                    </motion.button>

                    {/* Floating particles */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#ff7171]/40 rounded-full pointer-events-none"
                            style={{
                                left: `${30 + i * 15}%`,
                                top: `${20 + i * 20}%`,
                            }}
                            animate={{
                                y: [-20, -40, -20],
                                opacity: [0, 0.8, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 2,
                                delay: i * 0.3,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;