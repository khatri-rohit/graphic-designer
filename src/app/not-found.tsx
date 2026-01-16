/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useLottie } from "lottie-react";
import { Icon } from "@iconify/react";

import animationData from "../../public/animation/404-animation.json"
import MagneticEffect from "@/utils/MagneticEffect";

export default function NotFound() {
    const { View } = useLottie({
        animationData,
        loop: true,
        autoplay: true,
    });

    useEffect(() => {
        // Track 404 errors for SEO monitoring
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'page_view', {
                page_title: '404 - Page Not Found',
                page_location: window.location.href,
            });
        }
    }, []);

    const icon = [
        {
            icon: "icomoon-free:behance2",
            link: "https://www.behance.net/nitinkhatri/",
            label: "Behance Profile",
        },
        {
            icon: "uiw:linkedin",
            link: "https://www.linkedin.com/in/nitin-visualdesigner/",
            label: "LinkedIn Profile",
        },
        {
            icon: "simple-icons:instagram",
            link: "https://www.instagram.com/iam_niits/",
            label: "Instagram Profile",
        },
    ];


    return (
        <main className="bg-black text-white flex flex-col items-center justify-center min-h-screen px-6 font-SpaceGrotesk">
            {/* SEO-friendly meta tags for 404 */}
            <title>404 - Page Not Found | Nitin Khatri</title>

            <div className="text-center space-y-8">
                <div className="w-2/4 h-2/4 mx-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    {View}
                </div>

                <h1 className="text-6xl font-extrabold tracking-wide">404</h1>
                <p className="text-gray-400 text-lg max-w-md mx-auto">
                    This page drifted into the void.
                    But creativity never vanishes — explore more below:
                </p>

                <div className="flex items-center justify-center gap-6 pt-4">
                    {icon.map((iconItem, index) => (
                        <MagneticEffect key={index}>
                            <Link
                                href={iconItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={iconItem.label}
                            >
                                <Icon
                                    className="text-white cursor-pointer hover:text-[#e7436f] transition-colors duration-300"
                                    icon={iconItem.icon}
                                    width="36"
                                    height="36"
                                />
                            </Link>
                        </MagneticEffect>
                    ))}
                </div>
            </div>
        </main>
    );
}
