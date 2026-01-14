'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ChevronRight, Video } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import TextReveal from '@/utils/TextReveal';

/* ------------------------------------------------------------------ */
/* Navigation Model (RESTORED 1:1 FROM ORIGINAL)                        */
/* ------------------------------------------------------------------ */

type NavItem = {
    id: string;
    label: string;
    href: string;
    subItems?: NavItem[];
};

const navItems: NavItem[] = [
    {
        id: 'graphics',
        label: 'Graphic Design',
        href: '#graphics',
        subItems: [
            { id: 'posters', label: 'Posters', href: '#posters' },
            { id: 'banners', label: 'Banners', href: '#banners' },
            { id: 'brochures', label: 'Brochures', href: '#brochures' },
            { id: 'posts', label: 'Post Designs', href: '#posts' },
            { id: 'logos', label: 'Logo Designs', href: '#logos' },
            { id: 'brand-guidelines', label: 'Brand Guidelines', href: '#brand-guidelines' },
            { id: 'packaging', label: 'Packaging Designs', href: '#packaging' },
            { id: 'business-cards', label: 'Business Cards', href: '#business-cards' }
        ]
    },
    {
        id: 'videos',
        label: 'Video Projects',
        href: '#videos',
        subItems: [
            { id: 'promotional', label: 'Promotional Video', href: '#promotional' },
            { id: 'youtube', label: 'YouTube Video', href: '#youtube' },
            { id: 'campaigns', label: 'Campaign Ads', href: '#campaigns' }
        ]
    },
    {
        id: 'three-d',
        label: '3D Modeling',
        href: '#three-d',
        subItems: [
            { id: 'product-design', label: 'Product Design', href: '#product-design' },
            { id: 'product-viz', label: 'Product Visualization', href: '#product-viz' }
        ]
    }
];

/* ------------------------------------------------------------------ */
/* Motion Presets                                                      */
/* ------------------------------------------------------------------ */

const pageStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const cardPop = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

/* ------------------------------------------------------------------ */
/* Gallery Item                                                        */
/* ------------------------------------------------------------------ */

const GalleryItem = ({
    title,
    aspectRatio = '1/1'
}: {
    title: string;
    aspectRatio?: string;
}) => (
    <motion.div
        variants={cardPop}
        whileHover={{ scale: 1.04 }}
        className="group cursor-pointer overflow-hidden rounded-lg bg-gray-800/40 backdrop-blur-sm border border-gray-700"
    >
        <div className="relative w-full" style={{ aspectRatio }}>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-300 text-sm font-medium px-2 text-center group-hover:scale-105 transition-transform">
                    {title}
                </span>
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>
    </motion.div>
);

/* ------------------------------------------------------------------ */
/* Sidebar (RESTORED WITH SUBSECTIONS)                                 */
/* ------------------------------------------------------------------ */

function LeftSidebar({
    activeSection,
    onNavClick
}: {
    activeSection: string | null;
    onNavClick: (id: string, href: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const initial: Record<string, boolean> = {};
        navItems.forEach(n => (initial[n.id] = true));
        setExpanded(initial);
    }, []);

    useEffect(() => {
        if (!activeSection) return;
        navItems.forEach(parent => {
            if (parent.subItems?.some(s => s.id === activeSection)) {
                setExpanded(prev => ({ ...prev, [parent.id]: true }));
            }
        });
    }, [activeSection]);

    const handleClick = (
        e: React.MouseEvent,
        id: string,
        href: string,
        hasSub = false
    ) => {
        e.preventDefault();
        if (hasSub) {
            setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
            return;
        }
        onNavClick(id, href);
        setIsOpen(false);
    };

    return (
        <>
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 rounded-md text-white"
                onClick={() => setIsOpen(v => !v)}
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            <aside
                className={`fixed left-0 top-0 h-full w-72 bg-background border-r border-gray-800 z-40 transform transition-transform duration-300 font-Giltz
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            >
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-base font-semibold">Nitin — Designer</h2>
                </div>

                <nav className="px-4 py-4 space-y-2 overflow-y-auto">
                    {navItems.map(parent => (
                        <div key={parent.id}>
                            <button
                                onClick={(e) =>
                                    handleClick(e, parent.id, parent.href, Boolean(parent.subItems))
                                }
                                className={`flex w-full items-center justify-between px-3 py-2 rounded-md text-sm font-semibold
                ${activeSection === parent.id ? 'bg-cyan-700/10 text-cyan-300' : 'text-gray-300 hover:bg-white/5'}`}
                            >
                                {parent.label}
                                {parent.subItems && (
                                    <ChevronRight
                                        className={`w-4 h-4 transition-transform ${expanded[parent.id] ? 'rotate-90' : ''
                                            }`}
                                    />
                                )}
                            </button>

                            {parent.subItems && expanded[parent.id] && (
                                <div className="mt-1 pl-4 space-y-1">
                                    {parent.subItems.map(s => (
                                        <button
                                            key={s.id}
                                            onClick={(e) => handleClick(e, s.id, s.href)}
                                            className={`block w-full text-left px-2 py-1 text-sm rounded-md
                      ${activeSection === s.id ? 'text-cyan-300' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function WorkPage() {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const handleNavClick = (id: string, href: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
    };

    useEffect(() => {
        const ids = navItems.flatMap(n => [
            n.id,
            ...(n.subItems?.map(s => s.id) ?? [])
        ]);

        const elements = ids
            .map(id => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.45, rootMargin: '-20% 0px -40% 0px' }
        );

        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground font-Glitz">
            <LeftSidebar activeSection={activeSection} onNavClick={handleNavClick} />

            <main className="lg:ml-72 px-6 lg:px-12 py-20">
                <motion.div variants={pageStagger} initial="hidden" animate="visible">

                    {/* GRAPHIC DESIGN */}
                    <section id="graphics" className="mb-28">
                        <TextReveal>
                            <h1 className="text-4xl md:text-5xl font-extrabold mb-12">
                                Graphic Design
                            </h1>
                        </TextReveal>

                        {/* Posters — Swiper */}
                        <section id="posters" className="mb-20">
                            <h3 className="text-2xl mb-6">Posters</h3>
                            <Swiper slidesPerView="auto" spaceBetween={16} grabCursor>
                                {['Supra Induction', 'Bridgekriti', 'Ab-initio', 'Cherished Snaps', 'Junkyard Warz', 'Spectales']
                                    .map((t, i) => (
                                        <SwiperSlide key={i} className="!w-[260px]">
                                            <GalleryItem title={t} aspectRatio="3/4" />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </section>

                        {/* Banners — Swiper */}
                        <section id="banners" className="mb-20">
                            <h3 className="text-2xl mb-6">Banners</h3>
                            <Swiper slidesPerView="auto" spaceBetween={20} grabCursor>
                                {['Techsrijan 2023', 'Ab-initio', 'Aeromodeling', 'HMS 2022', 'Flash 2023', 'Robomania']
                                    .map((t, i) => (
                                        <SwiperSlide key={i} className="!w-[420px]">
                                            <GalleryItem title={t} aspectRatio="16/9" />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </section>

                        {/* Brochures */}
                        <section id="brochures" className="mb-20">
                            <h3 className="text-2xl mb-6">Brochures</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {['MS Hotel', 'Master Class', 'Cricket Flyer', 'Aeromodeling']
                                    .map((t, i) => (
                                        <GalleryItem key={i} title={t} aspectRatio="3/4" />
                                    ))}
                            </div>
                        </section>

                        {/* Posts */}
                        <section id="posts" className="mb-20">
                            <h3 className="text-2xl mb-6">Post Designs</h3>
                            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {Array.from({ length: 18 }).map((_, i) => (
                                    <GalleryItem key={i} title={`Post ${i + 1}`} />
                                ))}
                            </div>
                        </section>

                        {/* Logos */}
                        <section id="logos" className="mb-20">
                            <h3 className="text-2xl mb-6">Logo Designs</h3>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                                {['UT', 'CDC', 'PNB', 'Packin', 'GFX', 'GFX Eng', 'Visuvate', 'Legum']
                                    .map((t, i) => <GalleryItem key={i} title={t} />)}
                            </div>
                        </section>

                        {/* Brand Guidelines */}
                        <section id="brand-guidelines" className="mb-20">
                            <h3 className="text-2xl mb-6">Brand Guidelines</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <GalleryItem key={i} title={`Guideline ${i + 1}`} aspectRatio="16/9" />
                                ))}
                            </div>
                        </section>

                        {/* Packaging */}
                        <section id="packaging" className="mb-20">
                            <h3 className="text-2xl mb-6">Packaging Designs</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {['Serum', 'Perfume', 'Sample', 'Jam Bottle']
                                    .map((t, i) => <GalleryItem key={i} title={t} />)}
                            </div>
                        </section>

                        {/* Business Cards */}
                        <section id="business-cards" className="mb-20">
                            <h3 className="text-2xl mb-6">Business Cards</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <GalleryItem key={i} title={`Card ${i + 1}`} aspectRatio="16/9" />
                                ))}
                            </div>
                        </section>
                    </section>

                    {/* VIDEO PROJECTS */}
                    <section id="videos" className="mb-28">
                        <h2 className="text-4xl mb-12">Video Projects</h2>

                        <section id="promotional" className="mb-20">
                            <h3 className="text-2xl mb-6">Promotional Videos</h3>
                            <Swiper slidesPerView={1.1} spaceBetween={24} grabCursor>
                                {[1, 2, 3].map(i => (
                                    <SwiperSlide key={i} className="!w-[70vw]">
                                        <div className="aspect-video rounded-2xl bg-gray-800/30 border border-gray-700 flex items-center justify-center">
                                            <Video className="w-12 h-12 text-gray-300" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>

                        <section id="youtube" className="mb-20">
                            <h3 className="text-2xl mb-6">YouTube Videos</h3>
                            <Swiper slidesPerView={1.2} spaceBetween={24} grabCursor>
                                {[1, 2].map(i => (
                                    <SwiperSlide key={i} className="!w-[60vw]">
                                        <div className="aspect-video rounded-2xl bg-gray-800/30 border border-gray-700" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>

                        <section id="campaigns" className="mb-20">
                            <h3 className="text-2xl mb-6">Campaign Ads</h3>
                            <Swiper slidesPerView={1.3} spaceBetween={24} grabCursor>
                                {[1, 2, 3].map(i => (
                                    <SwiperSlide key={i} className="!w-[50vw]">
                                        <div className="aspect-video rounded-2xl bg-gray-800/30 border border-gray-700" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </section>
                    </section>

                    {/* 3D MODELING */}
                    <section id="three-d" className="mb-28">
                        <h2 className="text-4xl mb-12">3D Modeling</h2>

                        <section id="product-design" className="mb-16">
                            <h3 className="text-2xl mb-6">Product Design</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <GalleryItem key={i} title={`3D Product ${i + 1}`} />
                                ))}
                            </div>
                        </section>

                        <section id="product-viz">
                            <h3 className="text-2xl mb-6">Product Visualization</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <GalleryItem key={i} title={`3D Render ${i + 1}`} />
                                ))}
                            </div>
                        </section>
                    </section>
                </motion.div>
            </main>
        </div>
    );
}
