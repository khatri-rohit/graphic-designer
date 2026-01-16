import { motion } from "motion/react";
import Service from './Service';
import TextReveal from '@/utils/TextReveal';
import { creativeData } from './creativeFieldData';
import VideoSection from "../VideoSection";

const ServiceList = ["Brand Identity & Design", "Motion Graphics & Animation", "3D & Visual Effects (VFX)", "Video Post-Production"];

type Step = 'name' | 'statement1' | 'through' | 'statement3' | 'service' | 'statement2' | 'email' | 'completion' | 'complete';

interface Props {
    servicesRef: React.RefObject<HTMLElement | null>;
    currentStep: Step;
    nameInputRef: React.RefObject<HTMLInputElement | null>;
    emailInputRef: React.RefObject<HTMLInputElement | null>;
}

const CreativeFields = ({ currentStep, nameInputRef, emailInputRef, servicesRef }: Props) => {
    const goToContact = () => {
        if (currentStep === 'name' && nameInputRef.current) {
            nameInputRef.current.focus();
        } else if (currentStep === 'email' && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    };

    return (
        <motion.section className='bg-black' id="services" ref={servicesRef}>

            {/* Main Section */}
            <motion.main
                className='min-h-screen w-full flex flex-col text-white font-Glitz overflow-hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="w-full h-full">
                    {/* Header Section */}
                    <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-end p-4 sm:p-6 lg:p-10 pt-8 sm:pt-12 lg:pt-16">
                        {/* Title */}
                        <div className='mb-8 lg:mb-0'>
                            <TextReveal>
                                <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[15rem] tracking-wide text-start leading-none font-bold">
                                    What I Do
                                </h1>
                            </TextReveal>
                        </div>

                        {/* Subtitle */}
                        <div className='text-sm sm:text-base lg:text-lg flex flex-col sm:justify-start md:justify-end gap-y-2 lg:gap-y-4 text-start lg:py-16 max-w-xs lg:max-w-none lg:-mb-10 font-[SpaceGrotesk] font-semibold'>
                            <TextReveal>
                                <p>Design that feels right,</p>
                                <p>works hard and stands out.</p>
                            </TextReveal>
                        </div>
                    </div>

                    {/* Video Section */}
                    <VideoSection />

                    {/* Mobile-specific call to action */}
                    {/* <div className="block lg:hidden px-4 sm:px-6 pb-8">
                        <TextReveal>
                            <div className="text-center">
                                <p className="text-sm text-gray-400 mb-4">Tap video to play/pause</p>
                                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            </div>
                        </TextReveal>
                    </div> */}
                </div>
            </motion.main>

            {/* Services Section */}
            {creativeData.map((item) => (
                <Service key={item.id}
                    item={item}
                    ServiceList={ServiceList}
                    goToContact={goToContact} />
            ))}
        </motion.section>
    );
};

export default CreativeFields;