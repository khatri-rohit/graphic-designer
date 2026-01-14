// components/WorkSwiper.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function WorkSwiper({
    children,
    slidesPerView = 'auto'
}: {
    children: React.ReactNode[];
    slidesPerView?: number | 'auto';
}) {
    return (
        <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={16}
            grabCursor
            resistanceRatio={0.85}
            className="!overflow-visible"
        >
            {children.map((child, i) => (
                <SwiperSlide
                    key={i}
                    className="!w-auto"
                >
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
