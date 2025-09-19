'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import React, { useRef, useState } from 'react';

const SongCard = ({ title, artist, image, isPlaying, onClick }: { title: string, artist: string, image: string, isPlaying: boolean, onClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
    const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            className="flex flex-col h-full overflow-hidden relative rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl"
            style={{
                background: 'rgba(255, 255, 255, 0.01)',
                backdropFilter: 'blur(0px) saturate(120%)',
            }}
        >
            <CardHeader className="relative z-10">
                <div className="relative w-full aspect-square sm:aspect-auto h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                        src={image}
                        alt={`Cover for ${title}`}
                        fill
                        className="object-contain sm:object-cover"
                    />
                </div>
                <CardTitle className="text-xl font-bold text-primary">{title}</CardTitle>
                <CardDescription>{artist}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between relative z-10">
                <Button onClick={onClick} className="w-full">
                    {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
            </CardContent>
        </motion.div>
    );
};

export function SongsSection() {
    const [currentSong, setCurrentSong] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const songs = [
        {
            title: 'Better To Forget',
            artist: 'SXR3NE',
            image: '/better to forget.png',
            audioSrc: '/1.mp3'
        },
        {
            title: 'Love Pulse',
            artist: 'SXR3NE ft. VXNTUS',
            image: '/Love Pulse.webp',
            audioSrc: '/2.mp3'
        },
        {
            title: 'are you there?',
            artist: 'SXR3NE',
            image: '/are u there.png',
            audioSrc: '/3.mp3'
        },
        {
            title: 'MANSION',
            artist: 'VXNTUS, CYTRENA',
            image: '/MANSION.jpg',
            audioSrc: '/4.mp3'
        }
    ];

    const handlePlay = (audioSrc: string, title: string) => {
        if (currentSong === title) {
            audioRef.current?.pause();
            setCurrentSong(null);
        } else {
            if (audioRef.current) {
                audioRef.current.src = audioSrc;
                audioRef.current.play();
                setCurrentSong(title);
            }
        }
    };

    return (
        <section id="songs" className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl">
                        Our Songs
                    </h2>
                    <motion.p
                        className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Listen to our latest tracks and productions.
                    </motion.p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {songs.map((song, index) => (
                        <motion.div
                            key={song.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <SongCard
                                title={song.title}
                                artist={song.artist}
                                image={song.image}
                                isPlaying={currentSong === song.title}
                                onClick={() => handlePlay(song.audioSrc, song.title)}
                            />
                        </motion.div>
                    ))}
                </div>
                <audio ref={audioRef} onEnded={() => setCurrentSong(null)} />
            </div>
        </section>
    );
}
