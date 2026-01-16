import { motion } from "motion/react";
import React from 'react'

const VideoSection = () => {
    return (
        <div className="flex-1 relative overflow-hidden h-[50vh] sm:h-[60vh] lg:h-[calc(100vh-400px)] mx-4 sm:mx-6 lg:mx-10 mb-4 sm:mb-6 lg:mb-10 rounded-lg lg:rounded-xl">
            <motion.video
                src="/videos/clipchamp.mp4"
                className="absolute inset-0 w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500 ease-out"
                autoPlay
                loop
                muted
            />
        </div>
    )
}

export default VideoSection